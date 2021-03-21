import * as React from "react";
import Checkbox from "@material-ui/core/Checkbox";

export type IArticle = {
    id: number;
    title: string;
    content: string;
    isRead: boolean;
}
type ArticleProps = {
    article: IArticle;
    handleChange: (article: IArticle, event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Article({ article, handleChange }: ArticleProps): JSX.Element {

    const { isRead, title, content } = article;
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(article, event);
    };

    return (
        <article>

            <div className={'article-title'}>{title}</div>
            <div className={'article-content'}>{content}</div>

            <Checkbox
                checked={isRead}
                onChange={onChange}
            />


        </article>
    )
}

export default Article;
