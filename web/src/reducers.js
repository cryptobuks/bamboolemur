import { combineReducers } from 'redux-immutable';
import create from './modules/create/reducers';
import join from './modules/join/reducers';

export default combineReducers({
  create,
  join
});
