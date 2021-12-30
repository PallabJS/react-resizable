import { blue, grey, lightBlue, red } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";

import { createUseStyles } from "react-jss";

const handleMargin = 5;

const direction = {};

const noImg = document.createElement("div");

const useStyles = createUseStyles((theme) => ({
    root: {
        position: "relative",
        margin: (props) => props.gap,
        padding: 20,
        borderRadius: 4,
        border: `${handleMargin / 4}px solid #c5cae9`,
        boxShadow: "1px 2px 5px -2px grey",

        overflowX: "hidden",
        overflowY: "auto",
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": {
            width: 8,
            backgroundColor: grey[100],
            cursor: "pointer !important",
        },
        "&::-webkit-scrollbar-button": {
            backgroundColor: grey[600],
            borderRadius: 2,
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: blue[100],
        },

        // transition: "width 0.02s linear",

        opacity: 0.8,

        "& .resize-handle": {
            position: "absolute",
            transition: "all 0.3s ease-in-out",
            borderRadius: "1000000px",
            backgroundColor: red[400],
            "&:hover": {
                opacity: 0.5,
            },
        },

        "& .hide": {
            opacity: 0.05,
        },
    },
    topHandle: {
        width: "100%",
        height: handleMargin,
        top: 2,
        left: 0,
        "&:hover": { cursor: "row-resize" },
    },
    bottomHandle: {
        left: 0,
        width: "100%",
        height: handleMargin,
        bottom: 0,
        "&:hover": { cursor: "row-resize" },
    },
    leftHandle: {
        height: "100%",
        left: 0,
        width: handleMargin,
        top: 0,
        bottom: handleMargin,
        "&:hover": { cursor: "col-resize" },
    },
    rightHandle: {
        height: "100%",
        right: 0,
        width: handleMargin,
        top: 0,
        bottom: handleMargin,
        "&:hover": { cursor: "col-resize" },
    },
}));

const Resizable = ({
    children,
    row,
    rowId,
    childId,
    updateLayout,
    first,
    last,
    isFirstRow,
    isLastRow,
    width,
    height,
    gap,
    resizeStep,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    reRender,
}) => {
    const classes = useStyles({ gap });

    const root = useRef(null);

    const [visibles, setVisibles] = useState({
        leftHandle: false,
        rightHandle: false,
        topHandle: false,
        bottomHandle: false,
    });

    const setupDragStartEvent = (e) => {
        e.dataTransfer.setDragImage(noImg, 10, 10);
    };

    const resizeHandler = (e) => {
        if (e.clientX <= 0) return;

        let parent = e.target.parentElement;

        // console.log("parent offset = ", parent.offsetTop);
        // console.log("parentHeight = ", parent.clientHeight);
        // console.log("clientY = ", e.clientY);

        let updatedParameter = null;

        let name = e.target.getAttribute("name");

        let newState = { width, height };

        if (name === "rightHandle") {
            newState.width =
                parent.clientWidth + e.clientX - (parent.clientWidth + parent.offsetLeft) + 15;
            updatedParameter = "width";
            if (newState.width < minWidth || newState.width > maxWidth) return;
        }
        if (name === "leftHandle") {
            newState.width = parent.clientWidth - (e.clientX - +parent.offsetLeft) + 15;
            updatedParameter = "width";
            if (newState.width < minWidth || newState.width > maxWidth) return;
        }
        if (name === "bottomHandle") {
            newState.height = e.clientY - parent.offsetTop;
            updatedParameter = "height";
            if (newState.height < minHeight || newState.height > maxHeight) return;
        }
        if (name === "topHandle") {
            newState.height = parent.clientHeight - (e.clientY - parent.offsetTop);
            updatedParameter = "height";
            if (newState.height < minHeight || newState.height > maxHeight) return;
        }

        // // Prevent Static fluctuation
        if (width != newState.width && Math.abs(newState.width - width) < resizeStep) return;
        if (height != newState.height && Math.abs(newState.height - height) < resizeStep) return;

        updateLayout(
            rowId,
            childId,
            updatedParameter,
            newState,
            minWidth,
            maxWidth,
            minHeight,
            maxHeight
        );
    };

    return (
        <div className={classes.root} ref={root} style={{ width: width, height: height }}>
            {!isFirstRow && (
                <div
                    name="topHandle"
                    className={
                        "resize-handle " + classes.topHandle + (visibles.topHandle ? "" : " hide")
                    }
                    draggable={true}
                    onDragStart={setupDragStartEvent}
                    onDrag={resizeHandler}
                    onMouseDown={() => {
                        setVisibles({ ...visibles, topHandle: true });
                    }}
                    onMouseUp={() => {
                        setVisibles({ ...visibles, topHandle: false });
                    }}
                    onDragEnd={() => {
                        setVisibles({ ...visibles, topHandle: false });
                    }}
                ></div>
            )}
            {!isLastRow && (
                <div
                    name="bottomHandle"
                    className={
                        "resize-handle " +
                        classes.bottomHandle +
                        (visibles.bottomHandle ? "" : " hide")
                    }
                    onDragStart={setupDragStartEvent}
                    draggable={true}
                    onDrag={resizeHandler}
                    onMouseDown={() => {
                        setVisibles({ ...visibles, bottomHandle: true });
                    }}
                    onMouseUp={() => {
                        setVisibles({ ...visibles, bottomHandle: false });
                    }}
                    onDragEnd={() => {
                        setVisibles({ ...visibles, bottomHandle: false });
                    }}
                ></div>
            )}
            {!first && (
                <div
                    name="leftHandle"
                    className={
                        "resize-handle " + classes.leftHandle + (visibles.leftHandle ? "" : " hide")
                    }
                    draggable={true}
                    onDragStart={setupDragStartEvent}
                    onDrag={resizeHandler}
                    onMouseDown={() => {
                        setVisibles({ ...visibles, leftHandle: true });
                    }}
                    onMouseUp={() => {
                        setVisibles({ ...visibles, leftHandle: false });
                    }}
                    onDragEnd={() => {
                        setVisibles({ ...visibles, leftHandle: false });
                    }}
                ></div>
            )}
            {!last && (
                <div
                    name="rightHandle"
                    className={
                        "resize-handle " +
                        classes.rightHandle +
                        (visibles.rightHandle ? "" : " hide")
                    }
                    draggable={true}
                    onDragStart={setupDragStartEvent}
                    onDrag={resizeHandler}
                    onMouseDown={() => {
                        setVisibles({ ...visibles, rightHandle: true });
                    }}
                    onMouseUp={() => {
                        setVisibles({ ...visibles, rightHandle: false });
                    }}
                    onDragEnd={() => {
                        setVisibles({ ...visibles, rightHandle: false });
                    }}
                ></div>
            )}

            {children}
        </div>
    );
};

export default Resizable;
