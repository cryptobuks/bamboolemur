const createConversation = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_TEXT':
      return [
        ...state,
        {
          text: action.text
        }
      ]
    default:
      return state
  }
};

export default createConversation;
