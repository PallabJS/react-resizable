import FixedView from "./components/FixedView/FixedView";
import TaskComponent from "./components/demo/Task1";

function App() {
    return (
        <div style={{ height: 200 }}>
            <FixedView>
                <TaskComponent />
            </FixedView>
        </div>
    );
}
export default App;
