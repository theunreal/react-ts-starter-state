import initialState, { IState } from "./initialState";
import { TAction } from "./actions";
import * as types from './types';

export const reducer = (state: IState = initialState, action: TAction): IState => {
    const { type, payload } = action;
    switch (type) {
        case types.API_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.API_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload
            };
        case types.API_ERROR:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
};

