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
}

function Article({ article }: ArticleProps): JSX.Element {

    const { isRead, title, content } = article;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
    };

    return (
        <article>

            <div className={'article-title'}>{title}</div>
            <div className={'article-content'}>{content}</div>

            <Checkbox
                checked={isRead}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />


        </article>
    )
}

export default Article;
