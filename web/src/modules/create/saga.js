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

function* initConnToMessBroker() {
  // create iot topic
  const client = AWSMqtt.connect({
    WebSocket: window.WebSocket,
    region: AWS.config.region,
    credentials: AWS.config.credentials,
    endpoint: config.aws.iot.endpoint,
    clientId: 'mqtt-client-' + (Math.floor((Math.random() * 100000) + 1))
  });

  // subsctibe to topic
  const sessionId = yield select(selectors.getSessionId);

  client.on('connect', () => client.subscribe(sessionId));

  client.on('message', (topic, message) => {
    store.dispatch(actions.messageRecieved(topic, message));
  });
};

function* logMessage({topic, message}){
  yield console.log(`${topic} => ${message}`);
}

function* createSaga() {
  yield takeLatest(actions.INIT_CONN_TO_MESS_BROKER, initConnToMessBroker);
  yield takeLatest(actions.MESSAGE_RECEIVED, logMessage);
};

export default createSaga;
