import { takeLatest, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import AWS from 'aws-sdk/global';
import AWSMqtt from 'aws-mqtt';
import config from '../../config';
import store from '../../index';
import ChatCreator from './create';
import JoinChat from './join';

AWS.config.region = config.aws.region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: config.aws.cognito.identityPoolId
});

let mqttClient;
let chatCreator = null;
let joinChat = null;

function* initConnToMessBroker() {
  // create iot topic
  const userId = yield select(selectors.getUserId);

  mqttClient = AWSMqtt.connect({
    WebSocket: window.WebSocket,
    region: AWS.config.region,
    credentials: AWS.config.credentials,
    endpoint: config.aws.iot.endpoint,
    clientId: userId
  });

  // publish user joining

  const sessionId = yield select(selectors.getSessionId);

  mqttClient.on('connect', () => {
    // send joining message to all
    const joining = {
      "command": "JOINING",
      "senderId": userId,
      "recipientId": "all"
    }
    mqttClient.publish(sessionId, JSON.stringify(joining));

  // subsctibe to topic
    mqttClient.subscribe(sessionId);
  });

  mqttClient.on('message', (topic, message) => {
    const messageObj = JSON.parse(message);

    if((messageObj.recipientId !== 'all' && messageObj.recipientId !== userId) ||
  messageObj.senderId === userId){
      return;
    }

    if(messageObj.command === 'JOINING'){
      store.dispatch(actions.userJoining(topic, messageObj.senderId));
    } else if(messageObj.command === 'SDP_ANSWER') {
      store.dispatch(actions.sdpAnswer(
        topic,
        messageObj.senderId,
        messageObj.recipientId,
        messageObj.sdpAnswer));
    } else if (messageObj.command === 'OFFER') {
      store.dispatch(actions.respondToOffer(
        topic,
        messageObj.senderId,
        messageObj.recipientId,
        messageObj.offer));
    }
  });
};

function receivedMessageCallback(value){
  store.dispatch(actions.newMessageReceived(value));
}

function createOffer({ senderId }) {
  const offerCallback = function(senderId, offerSDP){
    console.log('inside offer callback');
    const sessionId = selectors.getSessionId(store.getState());
    const userId = selectors.getUserId(store.getState());

    const offer = {
      "command": "OFFER",
      "senderId": userId,
      "recipientId": senderId,
      "offer": offerSDP
    }
    console.log('offer:', offer);
    console.log('sessionId:', sessionId);
    mqttClient.publish(sessionId, JSON.stringify(offer));
  };

  console.log('inside createOffer');
  chatCreator = new ChatCreator();
  chatCreator.initCreator(senderId, offerCallback, receivedMessageCallback);
}

function createConnection(action) {
  chatCreator.start(action.sdpAnswer);
}

function answerCallback(senderId, answerDesc){
  const sessionId = selectors.getSessionId(store.getState());
  const userId = selectors.getUserId(store.getState());

  const answer = {
    "command": "SDP_ANSWER",
    "senderId": userId,
    "recipientId": senderId,
    "sdpAnswer": answerDesc
  }

  mqttClient.publish(sessionId, JSON.stringify(answer));
}

function respondToOffer({ senderId, offer }) {
  joinChat = new JoinChat();
  joinChat.initJoiner(senderId, answerCallback, receivedMessageCallback);
  joinChat.createAnswerSDP(offer);
}

function sendMessage(action){
  if(chatCreator !== null){
    chatCreator.sendMSG(action.text);
  } else if(joinChat != null){
    joinChat.sendMSG(action.text);
  }
}

function* joinSaga() {
  yield takeLatest(actions.INIT_CONN_TO_MESS_BROKER, initConnToMessBroker);
  yield takeLatest(actions.USER_JOINING, createOffer);
  yield takeLatest(actions.SDP_ANSWER, createConnection);
  yield takeLatest(actions.RESPOND_TO_OFFER, respondToOffer);
  yield takeLatest(actions.SEND_MESSAGE, sendMessage);
};

export default joinSaga;
