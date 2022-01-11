import React, { useEffect, useState } from "react";
import ResizableContainer, { Resizable } from "../../core";
import FixedView from "../FixedView/FixedView";
import DataViewer from "../DataViewer";

import { dashboardApi } from "../../api/dashboardApi";

const Task1 = () => {
    const [data, setData] = useState([]);

    const getDashboardData = async () => {
        let res = await dashboardApi.getData();
        if (res.success) setData(res.data);
    };

    const updateData = ({ title, newData }) => {
        if (!title) {
            getDashboardData();
        } else {
            let updatedData = data.map((item, id) => {
                if (title === item.title) return newData;
                return item;
            });
            setData(updatedData);
        }
    };

    useEffect(() => {
        getDashboardData();
    }, []);
    return (
        <>
            <FixedView>
                <ResizableContainer renderOnResize={true} resizeStep={30}>
                    <Resizable row={0}>
                        <DataViewer data={data[0]} updateData={updateData} />
                    </Resizable>
                    <Resizable row={0}>
                        <DataViewer data={data[1]} updateData={updateData} />
                    </Resizable>
                    <Resizable row={1}>
                        <DataViewer data={data[2]} updateData={updateData} />
                    </Resizable>

                    <Resizable row={1}>
                        <DataViewer data={data[2]} updateData={updateData} />
                    </Resizable>
                </ResizableContainer>
            </FixedView>
        </>
    );
};

export default Task1;
