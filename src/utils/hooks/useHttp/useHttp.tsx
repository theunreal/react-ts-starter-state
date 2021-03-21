import { useEffect, useReducer, useState } from "react";
import axios from "../../../config/axios";
import { TAction } from "./actions";
import { API_ERROR, API_REQUEST, API_SUCCESS } from "./types";
import { AxiosPromise } from "axios";

export interface IState<T> {
    error: string;
    isLoading: boolean;
    data: T;
}

interface UseHttp<T> extends IState<T> {
    executeFetch: (url: string) => void;
}

const createHttpReducer = <T,>() => (state: IState<T>, action: TAction<T>): IState<T> => {
    switch (action.type) {
        case API_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case API_SUCCESS:
            return {
                ...state,
                data: action.payload,
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


export function useHttp<T>(initUrl: string, initData: T): UseHttp<T> {
    const [url, setUrl] = useState(initUrl);
    const useHttpReducer = createHttpReducer<T>();
    const [state, dispatch] = useReducer(useHttpReducer, {
        isLoading: false,
        error: '',
        data: initData
    });

    useEffect(() => {
        let cancelRequest = false;

        const fetchData = async (cancelRequest: boolean = false) => {
            if (!url) return;

            dispatch({ type: API_REQUEST});
            try {
                const responsePromise: AxiosPromise<T> = axios(url);
                const response = await responsePromise;
                if (cancelRequest) return;
                dispatch({ type: API_SUCCESS, payload: response.data });
            } catch (e) {
                console.log("Got error", e);
                dispatch({ type: API_ERROR, payload: e.message });
            }
        };
        fetchData(cancelRequest);

        return () => {
            cancelRequest = true;
        }

    }, [url]);

    const executeFetch = (url: string): void => {
        setUrl(url);
    };


    return { ...state, executeFetch}
}
