import { ToastContainer } from "react-toastify";
import MainRoutes from "./Routes";
import { Container } from "react-bootstrap";

function App() {
    return (
        <div className="site-container">
            <ToastContainer position="bottom-center" limit={1} />
            <MainRoutes />
        </div>
    );
}

export default App;
