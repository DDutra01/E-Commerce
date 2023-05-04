import { ToastContainer } from "react-toastify";
import MainRoutes from "./Routes";

function App() {
    return (
        <div className="d-flex flex-column site-container">
            <ToastContainer position="bottom-center" limit={1} />
            <MainRoutes />
        </div>
    );
}

export default App;
