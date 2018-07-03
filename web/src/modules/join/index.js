import React, { Component } from 'react';
import $ from 'jquery';

class Join extends Component {

  constructor(props) {
     super(props);
     this.state = {}
  }

  componentDidMount(){
    console.log(this.props.match.params.sessionId);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Join;
