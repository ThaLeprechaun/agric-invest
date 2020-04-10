import {
  ADD_INVESTMENT_START,
  ADD_INVESTMENT_SUCCESS,
  ADD_INVESTMENT_FAIL,
  ADD_INVESTMENT_END,
} from './types';
import { ConfigType } from '../../react-app-env';
import axios from '../../axios';

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
