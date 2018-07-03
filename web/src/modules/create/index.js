import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showText } from './actions'

class Create extends Component {

  render() {
    return (
      <div>
        <span>{this.props.text}</span>
        <button id="send" onClick = { e => this.props.dispatch(showText('bla')) } >
          Show text
        </button>
      </div>
    );
  };

}

const mapStateToProps = state => ({
  text: state.createConversation[0] ? state.createConversation[0].text : ''
});

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
