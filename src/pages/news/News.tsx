import * as React from "react";
import ArticleList from "./components/ArticleList";
import { QueryClient, QueryClientProvider } from "react-query";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import Box from '@material-ui/core/Box';

export default function News() {

    const client = new QueryClient({ defaultOptions: { queries: { retry: false, suspense: true } } });

    return (<>
        <QueryClientProvider client={client}>
            <React.Suspense fallback={
                <Box m={2}>
                    <LinearProgress/>
                    Loading... Be ready!
                </Box>
            }>
                <ArticleList/>
            </React.Suspense>
        </QueryClientProvider>
    </>)
}
