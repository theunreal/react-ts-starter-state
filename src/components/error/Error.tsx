import * as React from "react";
import { ReactNode } from "react";
import { makeStyles } from "@material-ui/core";

type TProps = {
    children: ReactNode
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

export function Error({ children }: TProps) {

    const classes = useStyles();

    return (<div className={classes.card}>
        {children}
    </div>)
}
