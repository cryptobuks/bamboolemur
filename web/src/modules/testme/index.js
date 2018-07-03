import React, { Component } from 'react';
import AWS from 'aws-sdk/global';
import AWSMqtt from 'aws-mqtt';
import config from '../../config';
AWS.config.region = config.aws.region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: config.aws.cognito.identityPoolId
});

class TestMe extends Component {


  render() {
    return (
      <div>
      </div>
    );
  }
}

export default TestMe;
