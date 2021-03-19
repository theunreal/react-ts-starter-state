import { useEffect, useReducer, useState } from "react";
import axios from "../../config/axios";
import { TAction } from "./actions";
import { API_ERROR } from "./types";
import initialState, { IState } from "./initialState";

const fetchReducer = (state: IState = initialState, action: TAction) => {
    switch (action.type) {
        case 'API_REQUEST':
            return {
                ...state,
                isLoading: true
            };
        case 'API_SUCCESS':
            return {
                ...state,
                data: action.payload,
                isLoading: false
            };
        case 'API_ERROR':
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


export const useHttp = (url: string) => {
    const [state, dispatch] = useReducer(fetchReducer, initialState);

    const fetchData = async (cancelRequest: boolean = false) => {
        if (!url) return;

        dispatch({ type: 'API_REQUEST'});
        try {
            const response = await axios(url);
            if (cancelRequest) return;
            dispatch({ type: 'API_SUCCESS', payload: response.data });
        } catch (e) {
            dispatch({ type: 'API_ERROR', payload: e.message });
        }
    };

    useEffect(() => {
        let cancelRequest = false;

        fetchData(cancelRequest);

        return () => {
            cancelRequest = true;
        }

    }, [url]);

    return { ...state, fetchData}
};
