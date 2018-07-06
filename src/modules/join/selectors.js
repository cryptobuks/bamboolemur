import { createSelector } from 'reselect';

const getJoinState = (state) => state.get('join');
export const getUserId = createSelector([getJoinState], (join) => join.get('userId'));
export const getSessionId = createSelector([getJoinState], (join) => join.get('sessionId'));
export const getMessages = createSelector([getJoinState], (join) => join.get('messages'));
export const getMessageText = createSelector([getJoinState], (join) => join.get('messageText'));
