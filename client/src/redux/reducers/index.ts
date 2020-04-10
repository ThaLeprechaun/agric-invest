import { combineReducers } from 'redux';

import userReducer from './userReducer';
import authUserReducer from './authUserReducer';
import farmReducer from './farmReducer';

export default combineReducers({
  user: userReducer,
  authUser: authUserReducer,
  farm: farmReducer,
});
