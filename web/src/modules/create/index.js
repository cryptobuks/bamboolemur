import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateSessionId, initConnToMessBroker } from './actions';
import { getSessionId } from './selectors';


class Create extends Component {

  componentDidMount(){
    // generate random sessionId
    this.props.generateSessionId();
    // connect to topic
    this.props.initConnToMessBroker();
  }


  // wait for other user to send {clientId: 123, message: JOINING}
  // create offer for 123, send offer to topic
  // wait for Participant's SDP, start chat

  render() {
    return (
      <div>
        Session ID:<span>{this.props.sessionId}</span>
      </div>
    );
  };

}

const mapStateToProps = state => ({
  sessionId: getSessionId(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  generateSessionId,
  initConnToMessBroker,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
