import * as React from "react";
import Article, { IArticle } from "./Article";
import { makeStyles, SnackbarCloseReason, SnackbarProps } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { useMutation, useQuery } from "react-query";
import { fetchNews, updateArticle } from "../newsService";
import { useState } from "react";
import { Alert } from "@material-ui/lab";

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

    const { isError, data, refetch} = useQuery<IArticle[]>('news', fetchNews);
    const mutation = useMutation((article: IArticle) => {
        setToastOpen(true);
        return updateArticle(article);
    });
    const [toastOpen, setToastOpen] = useState(false);

    if (isError) {
        return (<>
                <h4>Oops.. failed to load article list.</h4>
                <Button onClick={() => refetch()}>Retry</Button>
            </>);
    }

    if (!data) {
        return (<>
            No records found.. Check back later!
            </>)
    }

    const handleChange = (article: IArticle, event: React.ChangeEvent<HTMLInputElement>): void => {
        article.isRead = event.target.checked;
        mutation.mutate(article);
    };

    const handleClose = (event: React.SyntheticEvent<any>, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        setToastOpen(false);
    };

    return (
        <>
            <div className={classes.articleListHeader}>
                <h1>Tournament 101 - Final Results</h1>
                <small className={classes.headerSubtitle}>{data.length} Articles</small>
            </div>
            <ul>
                {data.map(article => <Article key={article.id} article={article} handleChange={handleChange}/>)}
            </ul>

            <Snackbar open={toastOpen} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="success">
                    This is a success message!
                </Alert>
            </Snackbar>
        </>
    )
}

export default ArticleList;
