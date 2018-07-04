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

let mqttClient;
let pc;

function* initConnToMessBroker() {
  console.log('initConnToMessBroker');
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

  // subsctibe to topic
  const sessionId = yield select(selectors.getSessionId);
  console.log('sessionId');

  mqttClient.on('connect', () => {
    // send joining message to all
    const joining = {
      "command": "JOINING",
      "senderId": userId,
      "recipientId": "all"
    }
    mqttClient.publish(sessionId, JSON.stringify(joining));

    // publish to topic
    mqttClient.subscribe(sessionId);
  });

  mqttClient.on('message', (topic, message) => {
    const messageObj = JSON.parse(message);

    if(messageObj.recipientId !== 'all' && messageObj.recipientId !== userId){
      console.log('ignoring');
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

function* createOffer({ senderId }) {
  pc = new RTCPeerConnection(null);
  pc.oniceconnectionstatechange = function(e) {
    console.log('state change:', pc.iceConnectionState);
  };

  const dc = pc.createDataChannel("chat");

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
    const offer = {
      "command": "OFFER",
      "senderId": userId,
      "recipientId": senderId,
      "offer": JSON.stringify(pc.localDescription)
    }

    mqttClient.publish(sessionId, JSON.stringify(offer));
  }

}

function createConnection(action) {
  var answerDesc = new RTCSessionDescription(JSON.parse(action.sdpAnswer));
  pc.setRemoteDescription(answerDesc);
}

function* respondToOffer({ senderId, offer }) {

  console.log('respondToOffer');

  var sdpConstraints = { optional: [{RtpDataChannels: true}]  };
  pc = new RTCPeerConnection(null);
  var dc;

  pc.ondatachannel  = function(e) {
    dc = e.channel;
    dc.onopen    = function()  {
      //$("textarea").attr("disabled",true);addMSG("CONNECTED!", "info");
      console.log('ondatachannel connected');
    };
    dc.onmessage = function(e) {
      console.log('ondatachannel onmessage');
      //if (e.data)addMSG(e.data, "other");
    }
  };

  pc.onicecandidate = function(e) {
    console.log('respondToOffer - onicecandidate');

  };

  const sessionId = yield select(selectors.getSessionId);
  const userId = yield select(selectors.getUserId);

  console.log('sessionId, userId:', sessionId, ' ',  userId);

  pc.setRemoteDescription(JSON.parse(offer));
  pc.createAnswer(function (answerDesc) {
    pc.setLocalDescription(answerDesc);

    const answer = {
      "command": "SDP_ANSWER",
      "senderId": userId,
      "recipientId": senderId,
      "sdpAnswer": JSON.stringify(pc.localDescription)
    }

    mqttClient.publish(sessionId, JSON.stringify(answer));

  }, function () {console.warn("Couldn't create offer")},sdpConstraints);

}

function* joinSaga() {
  yield takeLatest(actions.INIT_CONN_TO_MESS_BROKER, initConnToMessBroker);
  yield takeLatest(actions.USER_JOINING, createOffer);
  yield takeLatest(actions.SDP_ANSWER, createConnection);
  yield takeLatest(actions.RESPOND_TO_OFFER, respondToOffer);
};

export default joinSaga;
