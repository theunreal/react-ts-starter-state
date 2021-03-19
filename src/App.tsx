import React from 'react';
import './App.css';
import NewModule from "./news/News";
import Header from "./header/Header";
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
