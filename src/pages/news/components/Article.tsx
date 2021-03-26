import * as React from "react";
import { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { Card } from "../../../components/card/Card";

export type IArticle = {
    id: number;
    title: string;
    content: string;
    isRead: boolean;
}
type ArticleProps = {
    article: IArticle;
    handleChange: (article: IArticle, event: React.ChangeEvent<HTMLInputElement>) => void
}


function Article({ article, handleChange }: ArticleProps): JSX.Element {

    const { title, content } = article;
    // { data, error, isLoading, executeFetch } = useHttp<IArticle[]>('news', );
    const [isRead, setIsRead] = useState(article.isRead);


    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(article, event);
        setIsRead(event.target.checked);
    };

    return (
        <article>

            <Card>
                {{
                    header: title,
                    content,
                    actions: (<>
                        <Checkbox
                            checked={isRead}
                            onChange={onChange}/>
                    </>)
                }}

            </Card>
        </article>
    )
}

export default Article;
