import { createSelector } from 'reselect';

export const getCreateState = (state) => state.get('create');
export const getText = createSelector([getCreateState], (create) => create.get('text'));
