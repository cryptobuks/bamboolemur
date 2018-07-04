import React, { Component } from 'react';
import * as actions from './actions';
import * as selectors from './selectors';
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
  }

  render() {
    return (
      <div id="chat">
        <div id="chat-screen-wp">
          <div id="chat-screen">
            {this.props.messages.map((message, i) => <div key={i}>{message}</div>)}
          </div>
        </div>
        <div id="ct">
          <input id="msg" value = { this.props.messageText }
            onChange={ this.props.updateMessageText }/>
          <button id="send" onClick = { () => this.props.sendMessage(this.props.messageText) }>send</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  sessionId: '/' + props.match.params.sessionId,
  messages: selectors.getMessages(state),
  messageText: selectors.getMessageText(state)
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join);
