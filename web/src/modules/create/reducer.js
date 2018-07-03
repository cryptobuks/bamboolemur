import { Map } from 'immutable';
import { GENERATE_SESSION_ID } from './actions';

const create = (state = Map({}), action) => {
  switch (action.type) {
    case 'SHOW_TEXT':
      return state.set('text', action.text);
    case GENERATE_SESSION_ID:
      const sessionId = '/' + generateId();
      return state.set('sessionId', sessionId);
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
