import { takeLatest, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import AWS from 'aws-sdk/global';
import AWSMqtt from 'aws-mqtt';
import config from '../../config';
import store from '../../index';

AWS.config.region = config.aws.region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: config.aws.cognito.identityPoolId
});

let client;

function* initConnToMessBroker() {
  // create iot topic
  const userId = yield select(selectors.getUserId);

  client = AWSMqtt.connect({
    WebSocket: window.WebSocket,
    region: AWS.config.region,
    credentials: AWS.config.credentials,
    endpoint: config.aws.iot.endpoint,
    clientId: userId
  });

  // subsctibe to topic
  const sessionId = yield select(selectors.getSessionId);

  client.on('connect', () => client.subscribe(sessionId));

  client.on('message', (topic, message) => {
    const messageObj = JSON.parse(message);
    if(messageObj.command === 'JOINING'){
      store.dispatch(actions.userJoining(topic, messageObj.senderId));
    } else if(messageObj.command === 'SDP_ANSWER') {
      store.dispatch(actions.sdpAnswer(
        topic,
        messageObj.senderId,
        messageObj.recipientId,
        messageObj.sdpAnswer));
    }
  });
};

function* createOffer({ senderId }) {
  const pc = new RTCPeerConnection(null);
  let dc;
  pc.oniceconnectionstatechange = function(e) {
    console.log('state change:', pc.iceConnectionState);
  };

  dc = pc.createDataChannel("chat");

  pc.createOffer().then(function(e) {
    pc.setLocalDescription(e)
  });

  dc.onopen = function(){
    console.log('connected!');
  };

  dc.onmessage = function(e) {
    if (e.data) {
      //addMSG(e.data, "other");
    }
  };

  const sessionId = yield select(selectors.getSessionId);
  const userId = yield select(selectors.getUserId);

  pc.onicecandidate = function(e) {
    if (e.candidate) return;
    console.log("publishing offer");
    console.log("sessionId", sessionId);

    const offer = {
      "command": "OFFER",
      "senderId": userId,
      "recipientId": senderId,
      "offer": JSON.stringify(pc.localDescription)
    }

    client.publish(sessionId, JSON.stringify(offer));
  }

}

function* createSaga() {
  yield takeLatest(actions.INIT_CONN_TO_MESS_BROKER, initConnToMessBroker);
  yield takeLatest(actions.USER_JOINING, createOffer);
  //yield takeLatest(actions.SDP_ANSWER, createConnection);
};

export default createSaga;
