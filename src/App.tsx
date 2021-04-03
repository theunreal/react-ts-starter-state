import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import { Container } from "@material-ui/core";
import Tournament from "./pages/tournament/Tournament";


function App(): JSX.Element {
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
