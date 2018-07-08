import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Create from './modules/create';
import Join from './modules/join';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Bamboo Lemur!</h1>
        </header>
        <Router>
          <Switch>
            <Route exact path="/" component={Create} />
            <Route path="/:sessionId" component={Join} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
