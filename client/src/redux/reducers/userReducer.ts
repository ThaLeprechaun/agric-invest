import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_END,
} from '../actions/types';
import { ActionType } from '../../react-app-env';

const initialState = {
  // token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: null,
  loading: true,
  error: null,
};

export default function(state = initialState, action: ActionType) {
  switch (action.type) {
    case REGISTER_START:
      return {
        ...state,
        loading: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload!.user,
        loading: false,
      };
    case REGISTER_END:
      return {
        ...state,
        loading: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
