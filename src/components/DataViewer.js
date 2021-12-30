import { useTheme } from "@emotion/react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Modal,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box, style } from "@mui/system";
import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { dashboardApi } from "../api/dashboardApi";

const useStyles = createUseStyles((theme) => {
    root: {
    }
});

const initialModifyState = {
    modalOpen: false,
    operation: "add",
    add: { title: "", bodyText: "" },
    update: { title: "", bodyText: "" },
};

const DataViewer = ({ data, updateData, ...props }) => {
    const classes = useStyles();

    const [modifyState, setModifyState] = useState(initialModifyState);

    const add = async () => {
        // Add a new data object on the same slot
        let res = await dashboardApi.add({
            ...modifyState.add,
            previousTitle: (data && data.title) || null,
        });
        if (res.success) updateData({ title: (data && data.title) || null, newData: res.data });
        resetModal();
    };

    const update = async () => {
        // Update data on the same slot
        let res = await dashboardApi.update({
            ...modifyState.update,
            previousTitle: (data && data.title) || null,
        });
        if (res.success) updateData({ title: data.title, newData: res.data });
        resetModal();
    };

    const handleChange = (e) => {
        let key = e.target.getAttribute("name");
        setModifyState({
            ...modifyState,
            [modifyState.operation]: {
                ...modifyState[modifyState.operation],
                [key]: e.target.value,
            },
        });
    };

    const resetModal = () => {
        setModifyState(initialModifyState);
    };

    return (
        <>
            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 0,
                }}
            >
                <CardHeader title={(data && data.title) || "<No Title>"} />
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            padding: "3px 10px",
                            fontSize: "12px",
                        }}
                        onClick={() =>
                            setModifyState({ ...modifyState, modalOpen: true, operation: "add" })
                        }
                    >
                        ADD ({data && data.count && data.count.adds})
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        sx={{
                            padding: "3px 10px",
                            fontSize: "12px",
                        }}
                        onClick={() =>
                            setModifyState({
                                ...modifyState,
                                modalOpen: true,
                                operation: "update",
                                update: {
                                    title: data.title,
                                    bodyText: data.bodyText,
                                },
                            })
                        }
                    >
                        UPDATE ({data && data.count && data.count.updates})
                    </Button>
                </CardActions>
                <Divider variant="fullWidth" sx={{ margin: "10px 0px" }} />
                <CardContent sx={{ flex: 1, overflow: "auto" }}>
                    {(data && data.bodyText) || "<No content>"}
                </CardContent>
            </Card>

            <Modal open={modifyState.modalOpen}>
                <Paper
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        minWidth: { lg: 600, sm: 600, xs: 300 },
                        boxShadow: 10,
                        p: 2,
                        outline: "none",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            backgroundColor: grey[300],
                            padding: " 2px 10px",
                            borderRadius: 1,
                            mb: 2,
                        }}
                    >{`Dashboard operation - ${modifyState.operation.toUpperCase()}`}</Typography>

                    <Paper sx={{ boxShadow: 0, borderRadius: 1, padding: 1 }}>
                        <Box
                            sx={{
                                bgcolor: "background.paper",
                                padding: 0,
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    padding: 1,
                                    fontSize: 16,
                                    width: 100,
                                }}
                            >
                                Title
                            </Typography>
                            <TextField
                                fullWidth
                                inputProps={{ name: "title", style: { padding: 5 } }}
                                sx={{
                                    flex: 1,
                                    padding: 0,
                                }}
                                value={modifyState[modifyState.operation].title}
                                onChange={handleChange}
                            />
                        </Box>

                        <Box
                            sx={{
                                bgcolor: "background.paper",
                                padding: 0,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Typography
                                sx={{ display: "block", padding: 1, fontSize: 16, width: 100 }}
                            >
                                Body
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                inputProps={{
                                    name: "bodyText",
                                    style: { padding: 5 },
                                    spellCheck: false,
                                }}
                                sx={{
                                    display: "block",
                                    flex: 1,
                                    padding: 0,
                                    maxHeight: "500px",
                                    overflow: "auto",
                                    outline: "none !important",

                                    "& fieldset": {
                                        "&:hover": {
                                            display: "none",
                                        },
                                    },
                                }}
                                value={modifyState[modifyState.operation].bodyText}
                                onChange={handleChange}
                            />
                        </Box>
                    </Paper>

                    <Box sx={{ textAlign: "right" }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{ padding: "2px 10px", margin: 1 }}
                            onClick={modifyState.operation === "add" ? add : update}
                        >
                            {modifyState.operation}
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ padding: "2px 10px", margin: 1 }}
                            onClick={resetModal}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </>
    );
};

export default DataViewer;
