import React, { Component } from 'react';

class Join extends Component {

  componentDidMount(){
    console.log(this.props.match.params.sessionId);
    // connect to topic by sessionId
    // generate clientId
    // notify all by sending message {clientId: 123, message: JOINING}
    // wait for message {clientId: 567, message: OFFER}
    // CREATE Participant'S SDP
    // send Participant'S SDP to 567
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Join;
