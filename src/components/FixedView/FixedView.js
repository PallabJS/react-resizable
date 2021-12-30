import React from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
    root: {
        width: "calc(100vw)",
        height: "calc(100vh)",
        display: "flex",
        flexDirection: "column",
        padding: 10,
        overflowX: "hidden",
        overflow: "scroll",
        "&::-webkit-scrollbar": {},
    },
}));

const FixedView = (props) => {
    const classes = useStyles();

    return <div className={classes.root}>{props.children}</div>;
};

export default FixedView;
