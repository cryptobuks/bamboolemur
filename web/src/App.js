import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Create from './modules/create';
import Join from './modules/join';
import TestMe from './modules/testme';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Router>
          <div>
            <Route exact path="/" component={Create} />
            <Route path="/join/:sessionId" component={Join} />
            <Route path="/test" component={TestMe} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
