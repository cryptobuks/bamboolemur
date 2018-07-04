import { createSelector } from 'reselect';

const getCreateState = (state) => state.get('create');
export const getSessionId = createSelector([getCreateState], (create) => create.get('sessionId'));
