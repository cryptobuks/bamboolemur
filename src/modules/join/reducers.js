import { Map, List } from 'immutable';
import * as actions from './actions';

const initialState = Map({
  messages: List(),
  messageText: ''
});

const join = (state = initialState, action) => {
  switch (action.type) {
    case actions.GENERATE_USER_ID:
      const userId = 'mqtt-client-' + (Math.floor((Math.random() * 100000) + 1));
      return state.set('userId', userId);
    case actions.SET_SESSION_ID:
      return state.set('sessionId', action.sessionId);
    case actions.SEND_MESSAGE:
      return state
      .update('messages', arr => arr.push({
        text: action.text,
        me: true
      }))
      .set('messageText', '');
    case actions.UPDATE_MESSAGE_TEXT:
        return state.set('messageText', action.text);
    case actions.NEW_MESSAGE_RECEIVED:
      return state.update('messages', arr => arr.push({
        text: action.text,
        me: false
      }));
    default:
      return state
  }
};

export default join;
