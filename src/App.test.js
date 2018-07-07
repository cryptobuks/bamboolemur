import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Map, List } from 'immutable';

const initialState = Map({
  create: Map(),
  join: Map({
    messages: List(),
    messageText: ''
  })
});
const reducer = (state = initialState, action) => state;
const testStore = createStore(reducer);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={testStore}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
