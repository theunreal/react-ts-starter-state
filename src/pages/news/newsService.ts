import { IArticle } from "./components/Article";
import axiosIntsance from "../../config/axios";

export const fetchNews = async(): Promise<IArticle[]> => {
    const response = await axiosIntsance.get<IArticle[]>('news');

    return response.data;
};

export const updateArticle = async(article: IArticle): Promise<IArticle> => {
    const response = await axiosIntsance.post<IArticle>('updateNews?id=' + article.id, article);
    return response.data;
};
