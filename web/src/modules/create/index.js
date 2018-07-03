import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateSessionId, showText } from './actions';
import { getText } from './selectors';
import AWS from 'aws-sdk/global';
import AWSMqtt from 'aws-mqtt';
import config from '../../config';


class Create extends Component {

  componentDidMount(){
    // generate random sessionId
    this.props.generateSessionId();
    //const topicName = makeId(); // SessionID

    AWS.config.region = config.aws.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: config.aws.cognito.identityPoolId
    });
    // create iot topic
    const client = AWSMqtt.connect({
      WebSocket: window.WebSocket,
      region: AWS.config.region,
      credentials: AWS.config.credentials,
      endpoint: config.aws.iot.endpoint,
      clientId: 'mqtt-client-' + (Math.floor((Math.random() * 100000) + 1))
    });

    // subsctibe to topic
    client.on('connect', () => {
      client.subscribe('/WillMsg');
    });

    client.on('message', (topic, message) => {
      console.log(`${topic} => ${message}`);
    });
  }


  // wait for other user to send {clientId: 123, message: JOINING}
  // create offer for 123, send offer to topic
  // wait for Participant's SDP, start chat

  render() {
    return (
      <div>
        <span>{this.props.text}</span>
        <button id="send" onClick = { e => this.props.showText('bla') } >
          Show text
        </button>
      </div>
    );
  };

}

// function makeId() {
//   var text = "";
//   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//
//   for (var i = 0; i < 5; i++)
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//
//   return text;
// }

const mapStateToProps = state => ({
  text: getText(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  generateSessionId,
  showText
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
