import { useState } from "react";

interface IAction {
    type: string;
    payload?: any;
    callback?: (newState: IPaginationState) => any;
}

export interface IPaginationState {
    page: number;
    recordsPerPage: number;
    pageRowOptions: number[];
}

export const initialState: IPaginationState = {
    page: 0,
    pageRowOptions: [10, 25, 50, 100],
    recordsPerPage: 10,
};

export const usePagination = () => {
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);

    return { page, setPage, perPage, setPerPage }
;
};

export const paginationReducer = (state: IPaginationState, action: IAction): IPaginationState => {
    const { type, payload } = action;
    let newState;
    switch (type) {
        case 'PAGE_RESET':
            newState = {
                ...state,
                page: 0,
                recordsPerPage: payload
            };
            if (action.callback) {
                action.callback(newState);
            }
            return newState;
        case 'SET_PAGE':
            newState = {
                ...state,
                page: payload
            };
            if (action.callback) {
                action.callback(newState);
            }
            return newState;
        default:
            console.warn("Invalid action: " + type);
            return state;
    }
};
