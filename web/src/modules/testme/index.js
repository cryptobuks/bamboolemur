import React, { Component } from 'react';
import AWS from 'aws-sdk/global';
import AWSMqtt from 'aws-mqtt';
import $ from 'jquery';
import config from '../../config';
AWS.config.region = config.aws.region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: config.aws.cognito.identityPoolId
});

class TestMe extends Component {

  componentDidMount(){
    const client = AWSMqtt.connect({
      WebSocket: window.WebSocket,
      region: AWS.config.region,
      credentials: AWS.config.credentials,
      endpoint: config.aws.iot.endpoint,
      clientId: 'mqtt-client-' + (Math.floor((Math.random() * 100000) + 1)),
      will: {
          topic: 'WillMsg',
          payload: 'Connection Closed abnormally..!',
          qos: 0,
          retain: false
      }
    });

    client.on('connect', () => {
      client.subscribe('/chat');
    })

    client.on('message', (topic, message) => {
      console.log(`${topic} => ${message}`);
    })

    // TODO: following line publishes message to topic
    client.publish('/chat', 'message text');

  }

  render() {
    return (
      <div>
        <h1>AWS IoT Pub/Sub Demo</h1>
        <form>
            <div>
                <label htmlFor="message">Message to send:</label>
                <input type="text" id="message" defaultValue="Hello world!" />
                <button type="button" id="send">send!</button>
            </div>
        </form>

        <h2>Log Output</h2>
        <ul id="the-log"></ul>
      </div>
    );
  }
}

export default TestMe;
