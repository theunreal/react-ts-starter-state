import * as React from "react";
import Article from "./Article";
import {  makeStyles } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { useHttp } from "../../utils/useHttp/useHttp";

const useStyles = makeStyles(() => ({
    articleListHeader: {
        display: 'flex',
        borderBottom: '1px solid #eee',
        alignItems: 'baseline',
        flexWrap: 'wrap',
    },
    headerSubtitle: {
        display: 'flex',
        width: '20%',
        paddingLeft: '1em',
        color: 'grey',
    }
}));

function ArticleList(): JSX.Element {
    const classes = useStyles();

    const { data, error, isLoading, fetchData } = useHttp('news');

    if (isLoading) {
        return <LinearProgress />;
    }

    if (error) {
        return (<>
            <h4>Oops.. failed to load article list.</h4>
            <Button onClick={() => fetchData()}>Retry</Button>
            </>
        );
    }

    return (
        <>
            <div className={classes.articleListHeader}>
                <h1>Article List</h1>
                <small className={classes.headerSubtitle}>{data.length} Articles</small>
            </div>
            <ul>
                {data.map(article => <Article article={article}/>)}
            </ul>
        </>
    )
}

export default ArticleList;
