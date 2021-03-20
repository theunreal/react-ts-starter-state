import * as React from "react";
import {  useReducer } from "react";
import ArticleList from "./components/ArticleList";
import { initialNewsState, NewsContextProvider, newsReducer } from "./NewsContext";

function News(): JSX.Element {

    const [newsState, newsDispatch] = useReducer(newsReducer, initialNewsState);

    const newsContextValues = {
        newsState,
        newsDispatch
    };

    return (
        <NewsContextProvider value={newsContextValues}>
            <ArticleList/>
        </NewsContextProvider>
    );
}

export default News;
