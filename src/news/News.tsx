import * as React from "react";
import { useReducer } from "react";
import Context from './newsContext';
import initialState from "./store/initialState";
import { reducer } from "./store/reducer";
function News(): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider value={{ state, dispatch }}>
            <h1>Hello World</h1>
        </Context.Provider>);
}
export default News;
