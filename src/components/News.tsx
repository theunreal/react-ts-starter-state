import * as React from "react";
import { useReducer } from "react";
import useNews from "../hooks/useNews";

function News(): JSX.Element {
  const { data } = useNews();
  return (
    <>
      <h1>Hello World</h1>
      {data.map((d, i) => {
        return <p key={i}>{d}</p>;
      })}
    </>
  );
}
export default News;
