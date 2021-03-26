import { useReducer, useState } from "react";
import axios, { axiosInitialOptions } from "../../../config/axios";
import { TAction } from "./actions";
import { API_ERROR, API_REQUEST, API_SUCCESS } from "./types";
import { AxiosPromise, AxiosRequestConfig } from "axios";

export interface IState {
    error: string;
    isLoading: boolean;
}

type TCallBack = (param: any) => any;

interface UseHttp<T> extends IState {
    executeFetch: (url: string, options?: AxiosRequestConfig, callback?: TCallBack | undefined) => void;
}

const createHttpReducer = <T, >() => (state: IState, action: TAction<T>): IState => {
    switch (action.type) {
        case API_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case API_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: ''
            };
        case API_ERROR:
            console.error(`Triggered: ${API_ERROR}, message: ${action.payload}`);
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            throw Error('Invalid action');
    }
};


export function useHttp<T>(initUrl: string, callback: TCallBack, lazy: boolean = false): UseHttp<T> {
    const initOptions: AxiosRequestConfig = { url: initUrl };

    const useHttpReducer = createHttpReducer();
    const [state, dispatch] = useReducer(useHttpReducer, {
        isLoading: false,
        error: '',
    });

    const fetchData = async (options: AxiosRequestConfig = initOptions, callback = (data: T) => {}) => {
        if (!options.url) return;

        dispatch({ type: API_REQUEST });
        try {
            const responsePromise: AxiosPromise<T> = axios(options);
            const response = await responsePromise;
            callback(response.data);
            dispatch({ type: API_SUCCESS, payload: response.data });
        } catch (e) {
            console.log("Got error", e);
            dispatch({ type: API_ERROR, payload: e.message });
        }
    };

    if (!lazy) {
        fetchData();
    }

    const executeFetch = (url: string, options: AxiosRequestConfig = axiosInitialOptions, callback: TCallBack | undefined): void => {
        options.url = url;
        fetchData(options, callback)
    };


    return { ...state, executeFetch }
}
