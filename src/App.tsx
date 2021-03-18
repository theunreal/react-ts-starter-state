import React from "react";
import "./App.css";
import News from "./components/News";
import { NewsProvider } from "./context/NewsContext";

function App(): JSX.Element {
  return (
    <NewsProvider>
      <News />
    </NewsProvider>
  );
}

export default App;
