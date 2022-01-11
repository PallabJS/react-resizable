# react-resizable-container

A container component for React that allows the child component to behave as resizable containers.

## Installation

```bash
npm install react-resizable-container
```

## Basic usage

```
import React from "react";

import ResizableContainer, { Resizable } from "react-resizable-container";

export const App = () => {
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

```
