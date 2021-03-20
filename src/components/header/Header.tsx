import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
    },
}));

function Header(): JSX.Element {

    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    News
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
