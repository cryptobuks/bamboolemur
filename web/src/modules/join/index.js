import React, { Component } from 'react';
import * as actions from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Join extends Component {

  componentDidMount(){
    // set sessionId
    this.props.setSessionId(this.props.sessionId);
    // generate userId
    this.props.generateUserId();
    // connect to topic
    this.props.initConnToMessBroker();

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

const mapStateToProps = (state, props) => ({
  sessionId: '/' + props.match.params.sessionId
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join);
