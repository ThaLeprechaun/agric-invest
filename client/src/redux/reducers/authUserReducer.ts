import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_END,
  USER_LOADED,
} from '../actions/types';

import { ActionType } from '../../react-app-env';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: null,
  loading: true,
  error: null,
};

export default function(state = initialState, action: ActionType) {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: action.payload,
      };
    case AUTH_SUCCESS:
      localStorage.setItem('token', action.payload!.token);
      return {
        ...state,
        user: action.payload!.user,
        isAuthenticated: true,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_FAIL:
      return {
        ...state,
        error: action.payload!.error,
      };
    case AUTH_END:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
