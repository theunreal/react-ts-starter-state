import { useContext } from "react";
import NewsContext from "../context/NewsContext";

const useNews = () => useContext(NewsContext);

export default useNews;
