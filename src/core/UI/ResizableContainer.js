import React, { useCallback, useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: `calc(100% - 4px)`,
        overflow: "hidden",
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
}));

const ResizableContainer = ({ renderOnResize, resizeStep = 10, gap = 5, ...props }) => {
    const [rows, setRows] = useState([]);
    const classes = useStyles();

    const container = useRef(null);

    const [sizes, setSizes] = useState([]);

    // This sorts the items into separate rows using row property
    const fillRows = useCallback(() => {
        let classifiedRows = [];
        let computedSizes = [];

        let allChild = props.children;
        if (!Array.isArray(props.children)) allChild = [allChild];

        allChild.forEach((child, key) => {
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
                    width: parseInt(
                        (container.current.clientWidth - 2 * gap * rowCount) / rowCount
                    ),
                    height: parseInt(
                        (container.current.clientHeight - 2 * gap * rowCount) /
                            classifiedRows.length
                    ),
                });
            });
        });

        setRows(classifiedRows);
        setSizes(computedSizes);
    }, [gap, props.children]);

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
                if (itemId === childId) {
                    let acceptedWidth = newItemSize.width;
                    acceptedWidth = acceptedWidth < minWidth ? minWidth : acceptedWidth;
                    acceptedWidth = acceptedWidth > maxWidth ? maxWidth : acceptedWidth;

                    // This stop the user to resize a box beyond maxWidth and below minWidth
                    if (newItemSize.width > maxWidth) updateFlag = false;
                    if (newItemSize.width < minWidth) updateFlag = false;

                    return { width: acceptedWidth, height: newItemSize.height };
                } else {
                    let newWidth = (parseInt(item.width) / previousAvailableWidth) * availableWidth;

                    // This was used to stop resizing if any other box dissallows it
                    // if (newWidth > maxWidth) updateFlag = false;
                    // if (newWidth < minWidth) updateFlag = false;

                    // This only prevents resizing that are constraints to maxWidth and minWidth
                    newWidth = newWidth > maxWidth ? maxWidth : newWidth;
                    newWidth = newWidth < minWidth ? minWidth : newWidth;

                    return {
                        width: newWidth,
                        height: item.height,
                    };
                }
            });
        }

        // Reflects height chnages
        if (param === "height") {
            if (newItemSize.height > maxHeight) updateFlag = false;
            if (newItemSize.height < minHeight) updateFlag = false;

            let availableHeight =
                container.current.clientHeight - 2 * gap * sizes.length - newItemSize.height;
            let previousAvailableHeight = 0;

            sizes.forEach((row, id) => {
                if (id === rowId) return;
                previousAvailableHeight += row[0].height;
            });

            updatedSizes = sizes.map((row, _rowId) => {
                let newHeight =
                    (parseInt(row[0].height) / previousAvailableHeight) * availableHeight;

                let newRow = row.map((item, itemId) => {
                    // let finalApplicableHeight = newHeight;
                    // if (newHeight < minHeight) finalApplicableHeight = minHeight;

                    // // This update is for the moving box
                    // if (_rowId === rowId)
                    //     return {
                    //         width: item.width,
                    //         height: newItemSize.height,
                    //     };
                    // // This update is for the other boxes
                    // else {
                    //     return {
                    //         width: item.width,
                    //         height: finalApplicableHeight,
                    //     };
                    // }

                    if (_rowId === rowId) {
                        // Calculation for the target box
                        let acceptedHeight = newItemSize.height;
                        acceptedHeight = acceptedHeight < minHeight ? minHeight : acceptedHeight;
                        acceptedHeight = acceptedHeight > maxHeight ? maxHeight : acceptedHeight;
                        // This stop the user to resize a box beyond maxWidth and below minWidth
                        if (newItemSize.height > maxHeight) updateFlag = false;
                        if (newItemSize.height < minHeight) updateFlag = false;
                        return { width: newItemSize.width, height: acceptedHeight };
                    } else {
                        // This was used to stop resizing if any other box dissallows it
                        // if (newWidth > maxWidth) updateFlag = false;
                        // if (newWidth < minWidth) updateFlag = false;

                        // This only prevents resizing that are constraints to maxWidth and minWidth
                        newHeight = newHeight > maxHeight ? maxHeight : newHeight;
                        newHeight = newHeight < minHeight ? minHeight : newHeight;

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
    }, [props.children, fillRows]);

    useEffect(() => {
        if (renderOnResize) {
            window.addEventListener("resize", fillRows);
        }
        return () => {
            window.removeEventListener("resize", fillRows);
        };
    }, [renderOnResize, props, fillRows]);

    return (
        <div className={classes.root} ref={container}>
            {rows.map((row, rowId) => {
                const maxHeightRatio = -0.15 * rows.length + 1.15;
                const minHeightRatio = (1 - maxHeightRatio) / (rows.length - 1);

                const maxWidthRatio = -0.15 * row.length + 1.15;
                const minWidthRatio = (1 - maxWidthRatio) / (row.length - 1);

                return (
                    <div key={rowId} className={classes.flexRow}>
                        {row.map((child, key) => {
                            return React.cloneElement(
                                child,
                                {
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
                                    minWidth: minWidthRatio * container.current.clientWidth,
                                    maxWidth: maxWidthRatio * container.current.clientWidth,
                                    minHeight: minHeightRatio * container.current.clientHeight,
                                    maxHeight:
                                        maxHeightRatio * (container.current.clientHeight - 40),
                                    updateLayout: updateSizesOnChildWidthChange,
                                    reRender: fillRows,
                                },
                                child.props.children
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export { ResizableContainer };
