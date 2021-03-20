import * as React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { useContext } from "react";
import NewsContext from "../NewsContext";

export type IArticle = {
    id: number;
    title: string;
    content: string;
    isRead: boolean;
}
type ArticleProps = {
    article: IArticle;
}

function Article({ article }: ArticleProps): JSX.Element {

    const { isRead, title, content } = article;
    const newsContext = useContext(NewsContext);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const article: IArticle = {
            id: 10,
            title: 'Test',
            content: "Wonderer",
            isRead: false,
        };
        newsContext.newsDispatch({ type: 'add_article', payload: article });
    };

    return (
        <article>

            <div className={'article-title'}>{title}</div>
            <div className={'article-content'}>{content}</div>

            <Checkbox
                checked={isRead}
                onChange={handleChange}
            />


        </article>
    )
}

export default Article;
