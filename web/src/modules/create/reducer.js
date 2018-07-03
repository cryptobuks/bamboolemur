import { Map } from 'immutable';

const create = (state = Map({}), action) => {
  switch (action.type) {
    case 'SHOW_TEXT':
      return state.set('text', action.text);
    default:
      return state
  }
};

export default create;
