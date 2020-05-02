import {
  ADD_INVESTMENT_START,
  ADD_INVESTMENT_SUCCESS,
  ADD_INVESTMENT_FAIL,
  ADD_INVESTMENT_END,
  GET_INVESTMENT_START,
  GET_INVESTMENT_SUCCESS,
  GET_INVESTMENT_FAIL,
  GET_INVESTMENT_END,
} from './types';
import { ConfigType } from '../../react-app-env';
import axios from '../../axios';
import { AxiosResponse } from 'axios';

function addInvestmentStart(payload: boolean) {
  return {
    type: ADD_INVESTMENT_START,
    payload,
  };
}
function addInvestmentSuccess(payload: boolean) {
  return {
    type: ADD_INVESTMENT_SUCCESS,
    payload,
  };
}
function addInvestmentFail(payload: boolean) {
  return {
    type: ADD_INVESTMENT_FAIL,
    payload,
  };
}
function addInvestmentEnd(payload: boolean) {
  return {
    type: ADD_INVESTMENT_END,
    payload,
  };
}
function getInvestmentStart(payload: boolean) {
  return {
    type: GET_INVESTMENT_START,
    payload,
  };
}
function getInvestmentSuccess(payload: AxiosResponse<any>) {
  return {
    type: GET_INVESTMENT_SUCCESS,
    payload,
  };
}
function getInvestmentFail(payload: boolean) {
  return {
    type: GET_INVESTMENT_FAIL,
    payload,
  };
}
function getInvestmentEnd(payload: boolean) {
  return {
    type: GET_INVESTMENT_END,
    payload,
  };
}

export function investAction(userId: string, farmId: string, body: any) {
  return async (dispatch: any) => {
    const config: ConfigType = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      dispatch(addInvestmentStart(true));
      const response = await axios.patch(
        `api/v1/users/${userId}/farms/${farmId}/invests`,
        body,
        config,
      );
      dispatch(addInvestmentSuccess(response.data));
      dispatch(addInvestmentEnd(false));
    } catch (error) {
      dispatch(addInvestmentFail(true));
      dispatch(addInvestmentEnd(true));
    }
  };
}

export function getInvestmentDetails(userId: string) {
  return async (dispatch: any) => {
    try {
      dispatch(getInvestmentStart(true));
      const response = await axios.get(`api/v1/users/${userId}/invests/farms`);
      console.log(response.data);
      dispatch(getInvestmentSuccess(response.data));
      dispatch(getInvestmentEnd(false));
    } catch (error) {
      dispatch(getInvestmentFail(true));
      dispatch(getInvestmentEnd(true));
    }
  };
}
