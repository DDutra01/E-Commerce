import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

export default function LoadingBox() {
    return (
        <Container className="spinner-container">
            <Spinner animation="border" role="status" className="spinner">
                <span className="visually-hidden ">Loading...</span>
            </Spinner>
        </Container>
    );
}
