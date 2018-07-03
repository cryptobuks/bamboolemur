import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import { getSessionId } from './selectors';


class Create extends Component {

  componentDidMount(){
    // generate userId
    this.props.generateUserId();
    // generate random sessionId
    this.props.generateSessionId();
    // connect to topic
    this.props.initConnToMessBroker();
  }

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

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
