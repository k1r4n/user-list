
import store from '../store';

export const updateUserList = (list) => (store.dispatch({
  type: 'UPDATE_USER_LIST',
  payload: list,
}));


