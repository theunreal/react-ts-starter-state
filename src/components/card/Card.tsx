import * as React from "react";
import { ReactChild, ReactNode } from "react";
import { makeStyles } from "@material-ui/core";
import { isObject } from "../../utils/utils";

type Props = {
    children: ReactChild | NamedChildrenSlots
}
type NamedChildrenSlots = {
    header: ReactNode;
    content: ReactNode;
    actions?: ReactNode;
    media?: ReactNode;
}

const useStyles = makeStyles(() => ({
    card: {
        backgroundColor: 'white',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        padding: '20px',
        '&:hover': {
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
        },
    }
}));

export function Card(props: Props) {

    const classes = useStyles();
    const { children } = props;

    if (!children) {
        throw new Error('children is mandatory!');
    }

    if (isNamedSlots(children)) {
        const { header, content, actions, media } = children;
        return (<div className={classes.card}>
            {media ? <div className={'media'}>{media}</div> : null}
            {header ? <div className={'header'}>{header}</div> : null}
            {content ? <div className={'content'}>{content}</div> : null}
            {actions ? <div className={'actions'}>{actions}</div> : null}
        </div>)
    }

    return <div className={classes.card}>{children}</div>


}

export const isNamedSlots = (children: any): children is NamedChildrenSlots =>
    isObject(children) && 'content' in children;
