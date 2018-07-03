import { createSelector } from 'reselect';

const getCreateState = (state) => state.get('create');
export const getSessionId = createSelector([getCreateState], (create) => create.get('sessionId'));
export const getUserId = createSelector([getCreateState], (create) => create.get('userId'));
export const getMqttClient = createSelector([getCreateState], (create) => create.get('mqttClient'));
