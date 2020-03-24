import { RegisterType, ConfigType } from './../../react-app-env.d';
import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_END,
} from './types';
import axios from '../../axios';
import { AxiosResponse } from 'axios';

function registerUserStart(payload: boolean) {
  return {
    type: REGISTER_START,
    payload,
  };
}

function registerUserSuccess(payload: AxiosResponse<any>) {
  return {
    type: REGISTER_SUCCESS,
    payload,
  };
}

function registerUserFail(payload: boolean) {
  return {
    type: REGISTER_FAIL,
    payload,
  };
}

function registerUserEnd(payload: boolean) {
  return {
    type: REGISTER_END,
    payload,
  };
}

export function registerUser(body: RegisterType) {
  return async (dispatch: any) => {
    const config: ConfigType = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      dispatch(registerUserStart(true));
      const response = await axios.post('/api/v1/users', body, config);
      dispatch(registerUserSuccess(response.data.user));
      dispatch(registerUserEnd(false));
    } catch (err) {
      console.error(err);
      dispatch(registerUserFail(true));
      dispatch(registerUserEnd(true));
    }
  };
}
