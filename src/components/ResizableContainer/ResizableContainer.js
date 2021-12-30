import React, { useEffect, useRef, useState } from "react";

import { createUseStyles } from "react-jss";

const gap = 2;

const useStyles = createUseStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        flex: 1,
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
}));

const ResizableContainer = ({ renderOnResize, resizeStep = 10, gap = 5, ...props }) => {
    const [rows, setRows] = useState([]);
    const classes = useStyles();

    const container = useRef(null);

    const [sizes, setSizes] = useState([]);

    console.log(props);

    // This sorts the items into separate rows using row property
    const fillRows = () => {
        let classifiedRows = [];
        let computedSizes = [];

        props.children.forEach((child, key) => {
            // *** Need to check how this is done
            // if (child.type.name != "Resizable") return;

            if (!classifiedRows[child.props.row]) {
                classifiedRows[child.props.row] = [];
                computedSizes[child.props.row] = [];
            }
            classifiedRows[child.props.row].push(child);
        });

        // Initializing width and height
        classifiedRows.forEach((row, rowId) => {
            let rowCount = row.length;
            row.forEach((item, itemId) => {
                computedSizes[rowId].push({
                    width: parseInt(window.innerWidth / rowCount),
                    height: parseInt((window.innerHeight - 30) / classifiedRows.length),
                });
            });
        });

        console.log("fillrows: ", classifiedRows, computedSizes);

        setRows(classifiedRows);
        setSizes(computedSizes);
    };

    const updateSizesOnChildWidthChange = (
        rowId,
        childId,
        param,
        newItemSize,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight
    ) => {
        let updateFlag = true;
        let updatedSizes = [...sizes];

        // Reflects width changes
        if (param === "width") {
            let availableWidth = container.current.clientWidth - newItemSize.width;
            let previousAvailableWidth = 0;

            sizes[rowId].forEach((item, id) => {
                if (id === childId) return;
                previousAvailableWidth += item.width;
            });

            updatedSizes[rowId] = sizes[rowId].map((item, itemId) => {
                if (itemId === childId) return newItemSize;
                let newWidth = (parseInt(item.width) / previousAvailableWidth) * availableWidth;
                if (newWidth > maxWidth) {
                    return { width: maxHeight, height: item.height };
                }
                if (newWidth < minWidth) {
                    return { width: minWidth, height: item.height };
                }
                return {
                    width: newWidth,
                    height: item.height,
                };
            });
        }

        // Reflects height chnages
        if (param === "height") {
            let availableHeight = window.innerHeight - 40 - newItemSize.height;
            let previousAvailableHeight = 0;

            sizes.forEach((row, id) => {
                if (id === rowId) return;
                previousAvailableHeight += row[0].height;
            });

            updatedSizes = sizes.map((row, _rowId) => {
                let newHeight =
                    (parseInt(row[0].height) / previousAvailableHeight) * availableHeight;

                let newRow = row.map((item, itemId) => {
                    // Prevent locking
                    if (newHeight > maxHeight) {
                        return {
                            width: item.width,
                            height: maxHeight,
                        };
                    }
                    if (newHeight < minHeight) {
                        return {
                            width: item.width,
                            height: minHeight,
                        };
                    }

                    if (_rowId === rowId)
                        return {
                            width: item.width,
                            height: newItemSize.height,
                        };
                    else {
                        return {
                            width: item.width,
                            height: newHeight,
                        };
                    }
                });
                return newRow;
            });
        }

        if (updateFlag) setSizes(updatedSizes);
    };

    useEffect(() => {
        fillRows();
    }, []);

    useEffect(() => {
        if (renderOnResize) {
            window.addEventListener("resize", fillRows);
        }
        return () => {
            window.removeEventListener("resize", fillRows);
        };
    }, [renderOnResize]);

    return (
        <div className={classes.root} ref={container}>
            {rows.map((row, rowId) => {
                {
                    return (
                        <div key={rowId} className={classes.flexRow}>
                            {row.map((child, key) => {
                                return React.cloneElement(child, {
                                    key: key,
                                    rowId: rowId,
                                    childId: key,
                                    first: key === 0,
                                    last: key === row.length - 1,
                                    isFirstRow: rowId === 0,
                                    isLastRow: rowId === rows.length - 1,
                                    width: sizes[rowId][key].width,
                                    height: sizes[rowId][key].height,
                                    gap: gap,
                                    resizeStep: resizeStep,
                                    minWidth: 0.1 * window.innerWidth,
                                    maxWidth: 0.8 * window.innerWidth,
                                    minHeight: 0.2 * window.innerHeight,
                                    maxHeight: 0.6 * window.innerHeight,
                                    updateLayout: updateSizesOnChildWidthChange,
                                });
                            })}
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default ResizableContainer;
