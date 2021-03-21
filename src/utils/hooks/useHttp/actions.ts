import * as types from './types';

export interface IApiRequest {
    type: types.ApiRequest
}

export interface IApiSuccess<T> {
    type: types.ApiSuccess,
    payload: T;
}

export interface IApiError {
    type: types.ApiError,
    payload: string;
}

export type TAction<T> = IApiRequest | IApiSuccess<T> | IApiError;
