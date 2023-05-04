import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TitlePage from "../../components/Title-page";
import NavBar from "../../components/NavBar";
import CheckOutSteps from "../../components/CheckOutSteps";

export default function PlaceOrderScreen() {
    return (
        <div>
            <TitlePage title="Place Order"></TitlePage>
            <header>
                <NavBar isShowIcons={false} />
            </header>
            <Container fluid="md">
                <Row
                    mt={4}
                    style={{ margin: 10 }}
                    className="justify-content-start"
                >
                    <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
                    <Col
                        sm={4}
                        style={{ padding: 20, margin: 10 }}
                        className="square border rounded-5"
                    >
                        <h1 className="my-3">Place Order</h1>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
