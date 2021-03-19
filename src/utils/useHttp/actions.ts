import * as types from './types';

export interface IApiRequest {
    type: types.ApiRequest
}

export interface IApiSuccess {
    type: types.ApiSuccess,
    payload: Array<any>;
}

export interface IApiError {
    type: types.ApiError,
    payload: string;
}

export const apiRequest = (): IApiRequest => ({
    type: types.API_REQUEST
});

export const apiSuccess = (payload: Array<any>): IApiSuccess =>
    ({
        payload,
        type: types.API_SUCCESS
    });

export const apiError = (payload: string): IApiError => ({
    payload,
    type: types.API_ERROR
});

export type TAction = IApiRequest | IApiSuccess | IApiError;
