import React, { Component } from 'react';
import * as actions from './actions';
import * as selectors from './selectors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Join extends Component {

  componentDidMount(){
    // set sessionId TODO: reducer should do that
    this.props.setSessionId(this.props.sessionId);
    // generate userId
    this.props.generateUserId();
    // connect to topic
    this.props.initConnToMessBroker();
  }

  onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.props.sendMessage(this.props.messageText)
    }
  }

  render() {
    return (
      <div id="chat">
      <div className="alert alert-info" role="alert">
        <strong>Connection status: </strong> {this.props.connectionStatus}
      </div>
        <div id="messages">
          {
            this.props.messages.map(
              (message, i) => <div className={"message" + (message.me ? " me" : "")} key={i}>{message.text}</div>
            )
          }
        </div>
        <div id="new-message">
          <textarea placeholder="Send new message..."
          id="new-message-input"
          onChange={ this.props.updateMessageText }
          onKeyDown={ this.onEnterPress }
          value= { this.props.messageText }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  sessionId: '/' + props.match.params.sessionId,
  messages: selectors.getMessages(state),
  messageText: selectors.getMessageText(state),
  connectionStatus: selectors.getConnectionStatus(state)
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join);
