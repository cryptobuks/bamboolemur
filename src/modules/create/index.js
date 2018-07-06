import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import { getSessionId } from './selectors';
import { withRouter } from 'react-router-dom'

class Create extends Component {

  componentDidMount(){
    // redirect to join chat page
    const sessionId = generateId();
    this.props.history.push(sessionId);
  }

  render() {
    return (
      <div>
        Session ID:<span>{this.props.sessionId}</span>
      </div>
    );
  };

}

function generateId() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const mapStateToProps = state => ({
  sessionId: getSessionId(state)
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Create));
