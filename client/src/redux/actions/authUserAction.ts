import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_END,
  USER_LOADED,
} from './types';
import { ConfigType, LoginType } from '../../react-app-env';
import { AxiosResponse } from 'axios';
import axios from '../../axios';
import { Dispatch } from 'redux';
import setAuthToken from '../../utils/setAuthToken';

function authUserStart(payload: boolean) {
  return {
    type: AUTH_START,
    payload,
  };
}

function authUserSuccess(payload: AxiosResponse<any>) {
  return {
    type: AUTH_SUCCESS,
    payload,
  };
}

function authUserFail(payload: boolean) {
  return {
    type: AUTH_FAIL,
    payload,
  };
}

function authUserEnd(payload: boolean) {
  return {
    type: AUTH_END,
    payload,
  };
}

function loadUserSuccess(payload: boolean) {
  return {
    type: USER_LOADED,
    payload,
  };
}

export const loadUser = () => async (dispatch: Dispatch) => {
  // @todo -load token into global headers
  if (localStorage) {
    setAuthToken(localStorage.token);
  }
  try {
    const response = await axios.get('/api/v1/auth');
    dispatch(loadUserSuccess(response.data));
    return;
  } catch (err) {
    console.error(err.response!.data.msg);
    dispatch(authUserFail(true));
  }
};

export function authUser(body: LoginType) {
  return async (dispatch: any) => {
    const config: ConfigType = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      dispatch(authUserStart(true));
      const response = await axios.post('api/v1/auth', body, config);
      dispatch(authUserSuccess(response.data));
      dispatch(loadUser());
      dispatch(authUserEnd(false));
    } catch (err) {
      console.error(err);
      dispatch(authUserFail(true));
      dispatch(authUserEnd(true));
    }
  };
}
