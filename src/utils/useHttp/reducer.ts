import initialState, { IState } from "./initialState";
import { TAction } from "./actions";
import * as types from './types';

export const reducer = (state: IState = initialState, action: TAction): IState => {
    switch (action.type) {
        case types.API_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case types.API_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case types.API_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

