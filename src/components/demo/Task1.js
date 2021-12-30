import React from "react";
import ResizableContainer from "../ResizableContainer/ResizableContainer";
import Resizable from "../ResizableContainer/Resizable";
import FixedView from "../FixedView/FixedView";

const Task1 = () => {
    return (
        <FixedView>
            <ResizableContainer renderOnResize={true}>
                <Resizable row={0}></Resizable>
                <Resizable row={0}></Resizable>
                <Resizable row={1}></Resizable>
            </ResizableContainer>
        </FixedView>
    );
};

export default Task1;
