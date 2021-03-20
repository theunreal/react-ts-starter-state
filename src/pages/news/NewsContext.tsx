import { createContext } from "react";
import { IArticle } from "./components/Article";
import * as React from "react";

export interface INewsContextProps {
    newsState: INewsState,
    newsDispatch: React.Dispatch<INewsActions>
}

export interface INewsActions {
    type : 'add_article' | 'remove_article',
    payload: IArticle
}

export interface INewsState {
    articles: Array<IArticle>;
}

export const initialNewsState = {
    articles: []
};

export const newsReducer = (state: INewsState, action: INewsActions) => {
    const { type } = action;

    switch (type) {
        case 'add_article':
            let article = action.payload;
            let articles = [ ...state.articles, article];
            return {
                ...state,
                articles
            };
        default:
            return state;
    }
}

const NewsContext = createContext<INewsContextProps>({
    newsState: initialNewsState,
    newsDispatch: () => {}
});



export const NewsContextConsumer = NewsContext.Consumer;
export const NewsContextProvider = NewsContext.Provider;
export default NewsContext;
