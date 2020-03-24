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
    error: string;
  };
}
