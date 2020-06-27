const initialState = {
  userList: [],
};

const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER_LIST':
      return Object.assign({}, state, {
        userList: action.payload,
      });
    default:
      return state;
  }
};

export default asyncReducer;
