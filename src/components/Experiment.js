import React from "react";

import ResizableContainer, { Resizable } from "../core";

const Experiment = () => {
    return (
        <ResizableContainer renderOnResize={true} resizeStep={20}>
            <Resizable row={0}>
                <h3>What is Lorem Ipsum?</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since...
                </p>
            </Resizable>
            <Resizable row={0}>
                <h3>What is Lorem Ipsum?</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since...
                </p>
            </Resizable>
            <Resizable row={1}>
                <h3>What is Lorem Ipsum?</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since...
                </p>
            </Resizable>
            <Resizable row={1}>
                <h3>What is Lorem Ipsum?</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since...
                </p>
            </Resizable>
            <Resizable row={1}>
                <h3>What is Lorem Ipsum?</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since...
                </p>
            </Resizable>

            <Resizable row={2}>
                <h3>What is Lorem Ipsum?</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since...
                </p>
            </Resizable>
            <Resizable row={2}>
                <h3>What is Lorem Ipsum?</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since...
                </p>
            </Resizable>
        </ResizableContainer>
    );
};

export default Experiment;
