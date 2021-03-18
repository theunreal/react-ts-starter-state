import React, { createContext, ReactChild, useReducer } from "react";

import {
  ActionTypes,
  apiError,
  apiSuccess,
  apiRequest,
  iAction,
} from "./actions";

export interface IState {
  error: string;
  loading: boolean;
  data: Array<any>;
}

const initialState: IState = {
  error: "",
  loading: false,
  data: [],
};

const reducer = (state: IState, action: iAction) => {
  switch (action.type) {
    case ActionTypes.API_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.API_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case ActionTypes.API_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const NewsContext = createContext({
  ...initialState,
  apiRequest: () => {},
  apiSuccess: (payload: Array<any>) => {
    payload: [];
    type: ActionTypes;
  },
  apiError: (payload: string) => {
    payload: "";
    type: ActionTypes;
  },
});

export const NewsProvider: React.FunctionComponent<{ children: ReactChild }> = (
  props
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NewsContext.Provider
      value={{
        ...state,
        apiRequest: apiRequest,
        apiSuccess: apiSuccess,
        apiError: apiError,
      }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsContext;
