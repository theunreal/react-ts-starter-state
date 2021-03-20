import React from 'react';
import './App.css';
import NewModule from "./pages/news/News";
import Header from "./components/header/Header";
import { Container } from "@material-ui/core";


function App(): JSX.Element {

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
