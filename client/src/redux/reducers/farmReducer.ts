import {
  GET_FARM_START,
  GET_FARM_SUCCESS,
  GET_FARM_FAIL,
  GET_FARM_END,
} from '../actions/types';
import { ActionType } from '../../react-app-env';

const initialState = {
  farm: null,
  loading: true,
  error: null,
};

export default function(state = initialState, action: ActionType) {
  switch (action.type) {
    case GET_FARM_START:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_FARM_SUCCESS:
      return {
        ...state,
        farm: action.payload,
        loading: false,
      };
    case GET_FARM_FAIL:
      return {
        ...state,
        error: action.payload!.error,
      };
    case GET_FARM_END:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
