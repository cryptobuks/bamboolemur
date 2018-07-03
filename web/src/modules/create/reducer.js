import { Map } from 'immutable';
import * as actions from './actions';

const create = (state = Map({}), action) => {
  switch (action.type) {
    case 'SHOW_TEXT':
      return state.set('text', action.text);
    case actions.GENERATE_SESSION_ID:
      const sessionId = '/' + generateId();
      return state.set('sessionId', sessionId);
    case actions.GENERATE_USER_ID:
      const userId = 'mqtt-client-' + (Math.floor((Math.random() * 100000) + 1));
      return state.set('userId', userId);
    default:
      return state
  }
};

function generateId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export default create;
