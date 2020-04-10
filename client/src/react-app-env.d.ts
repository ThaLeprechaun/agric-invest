/// <reference types="react-scripts" />

import { AxiosRequestConfig } from 'axios';
import { Action } from 'redux';

export interface RegisterType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  userCategory: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface ConfigType extends AxiosRequestConfig {
  header: {
    'Content-Type': string;
  };
}

export interface ActionType extends Action {
  payload?: {
    token?: string | any;
    user?: object;
    farm?: object;
    userCategory?: string[];
    error: string;
  };
}

export interface FarmType extends Action {
  payload?: {
    farm?: object;
  };
}

export interface NewFarmType {
  farmName: string;
  farmCategory: string;
  farmProduce: string;
  farmLocation: string;
  unitPrice: number | any;
  produceRate: number | any;
  unitsAvailable: number | any;
  duration: string;
}
