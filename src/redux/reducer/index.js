import { combineReducers } from 'redux';
import user from './user';
import common from './common';

const appReducer = combineReducers({
  user,
  common,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;