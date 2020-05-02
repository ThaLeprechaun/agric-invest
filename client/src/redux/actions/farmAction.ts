import {
  GET_FARM_START,
  GET_FARM_SUCCESS,
  GET_FARM_FAIL,
  GET_FARM_END,
  CREATE_FARM_START,
  CREATE_FARM_SUCCESS,
  CREATE_FARM_FAIL,
  CREATE_FARM_END,
} from './types';
import axios from '../../axios';
import { AxiosResponse } from 'axios';
import { ConfigType, NewFarmType } from '../../react-app-env';

function getFarmStart(payload: boolean) {
  return {
    type: GET_FARM_START,
    payload,
  };
}

function getFarmSuccess(payload: AxiosResponse<any>) {
  return {
    type: GET_FARM_SUCCESS,
    payload,
  };
}

function getFarmFail(payload: boolean) {
  return {
    type: GET_FARM_FAIL,
    payload,
  };
}

function getFarmEnd(payload: boolean) {
  return {
    type: GET_FARM_END,
    payload,
  };
}

function createFarmStart(payload: boolean) {
  return {
    type: CREATE_FARM_START,
    payload,
  };
}

function createFarmSuccess(payload: AxiosResponse<any>) {
  return {
    type: CREATE_FARM_SUCCESS,
    payload,
  };
}

function createFarmFail(payload: boolean) {
  return {
    type: CREATE_FARM_FAIL,
    payload,
  };
}

function createFarmEnd(payload: boolean) {
  return {
    type: CREATE_FARM_END,
    payload,
  };
}

export function getAllFarms() {
  return async (dispatch: any) => {
    try {
      dispatch(getFarmStart(true));
      const response = await axios.get('api/v1/farms');
      dispatch(getFarmSuccess(response.data));
      dispatch(getFarmEnd(false));
    } catch (error) {
      dispatch(getFarmFail(true));
      dispatch(getFarmEnd(true));
    }
  };
}

export function getUserFarm(farmId: AxiosResponse) {
  return async (dispatch: any) => {
    try {
      dispatch(getFarmStart(true));
      const response = await axios.get(`api/v1/farms/${farmId}`);
      console.log(response.data.farm.farmName);
      dispatch(getFarmSuccess(response.data.farm.farmName));
      dispatch(getFarmEnd(false));
      return;
    } catch (error) {
      dispatch(getFarmFail(true));
      dispatch(getFarmEnd(true));
    }
  };
}

export function newFarm(userId: string, body: NewFarmType) {
  return async (dispatch: any) => {
    const config: ConfigType = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      dispatch(createFarmStart(true));
      const response = await axios.patch(
        `api/v1/users/${userId}/farms`,
        body,
        config,
      );
      dispatch(createFarmSuccess(response.data));
      dispatch(createFarmEnd(false));
    } catch (error) {
      dispatch(createFarmFail(true));
      dispatch(createFarmEnd(true));
    }
  };
}
