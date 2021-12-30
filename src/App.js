import { createUseStyles } from "react-jss";
import Task1 from "./components/demo/Task1";

import Experiment from "./components/Experiment";

const useStyles = createUseStyles((theme) => ({
    root: {},
}));

function App() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Task1 />
            {/* <Experiment /> */}
        </div>
    );
}

export default App;
