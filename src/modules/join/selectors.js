import { createSelector } from 'reselect';

const getJoinState = (state) => state.get('join');
export const getUserId = createSelector([getJoinState], (state) => state.get('userId'));
export const getSessionId = createSelector([getJoinState], (state) => state.get('sessionId'));
export const getMessages = createSelector([getJoinState], (state) => state.get('messages'));
export const getMessageText = createSelector([getJoinState], (state) => state.get('messageText'));
export const getConnectionStatus = createSelector([getJoinState], (state) => state.get('connectionStatus'));
