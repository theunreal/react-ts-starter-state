import React from 'react';
import './App.css';
import NewModule from "./pages/news/News";
import Header from "./components/header/Header";
import { Container } from "@material-ui/core";
import useWindowSize from "./utils/hooks/useWindowSize";


function App(): JSX.Element {

    const { width, height } = useWindowSize();

    console.log('Found size ', width);

    return (
        <>
            <Header/>

            <Container>
                <NewModule/>
            </Container>
        </>
    );
}

export default App;
