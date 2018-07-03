import { takeLatest } from 'redux-saga/effects';
import * as actions from './actions';

function helloSaga() {
  console.log('Hello Sagas!')
};

function* createSaga() {
  yield takeLatest(actions.SHOW_TEXT, helloSaga);
}

export default createSaga;
