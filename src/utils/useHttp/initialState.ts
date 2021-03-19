export interface IState {
    error: string;
    isLoading: boolean;
    data: Array<any>;
}

const initialState: IState = {
    error: '',
    isLoading: false,
    data: []
};

export default initialState;

