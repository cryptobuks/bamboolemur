import { Map } from 'immutable';
import * as actions from './actions';

const join = (state = Map({}), action) => {
  switch (action.type) {
    case actions.GENERATE_USER_ID:
      const userId = 'mqtt-client-' + (Math.floor((Math.random() * 100000) + 1));
      return state.set('userId', userId);
    case actions.SET_SESSION_ID:
      return state.set('sessionId', action.sessionId);
    default:
      return state
  }
};

export default join;
