import { Container} from "react-bootstrap";
import NavBar from "./components/NavBar";
import MainRoutes from "./Routes";

function App() {
    return (
        <div className="d-flex flex-column site-container">
                         
                <MainRoutes />
            
        </div>
    );
}

export default App;
