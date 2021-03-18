export enum ActionTypes {
  API_REQUEST = "API_REQUEST",
  API_SUCCESS = "API_SUCCESS",
  API_ERROR = "API_ERROR",
}

export const apiRequest = () => ({
  type: ActionTypes.API_REQUEST,
});

export const apiSuccess = (payload: Array<any>) => ({
  payload,
  type: ActionTypes.API_REQUEST,
});

export const apiError = (payload: string) => ({
  payload,
  type: ActionTypes.API_ERROR,
});

export interface iAction {
  type: ActionTypes;
  payload?: any;
}
