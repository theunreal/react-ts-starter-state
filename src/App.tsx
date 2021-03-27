import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import { Container } from "@material-ui/core";
import useWindowSize from "./utils/hooks/useWindowSize";
import Tournament from "./pages/tournament/Tournament";


function App(): JSX.Element {

    const { width, height } = useWindowSize();

    console.log('Found size ', width);

    return (
        <>
            <Header/>

            <Container>
                <Tournament/>
            </Container>
        </>
    );
}

export default App;
