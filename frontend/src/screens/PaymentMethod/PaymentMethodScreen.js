import React, { useContext, useEffect, useState } from "react";
import CheckOutSteps from "../../components/CheckOutSteps";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import TitlePage from "../../components/Title-page";
import NavBar from "../../components/NavBar";
import { Store } from "../../Context/Store/StoreContext";
import { useNavigate } from "react-router-dom";

export default function PaymentMethodScreen() {
    const [paymentMethodName, setPaymentMethod] = useState(
        "PayPal" || paymentMethod
    );
    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { shippingAddress, paymentMethod },
    } = state;
    
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate("/shipping");
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(paymentMethod)
        ctxDispatch({
            type: "SAVE_PAYMENT_METHOD",
            payload: paymentMethodName,
        });
        localStorage.setItem("paymentMethod", paymentMethodName);
        navigate("/placeorder");
    };

    return (
        <div>
            <TitlePage title="Payment"></TitlePage>
            <header>
                <NavBar isShowIcons={false} />
            </header>
            <Container fluid="md">
                <Row
                    mt={4}
                    style={{ margin: 10 }}
                    className="justify-content-center"
                >
                    <CheckOutSteps step1 step2 step3></CheckOutSteps>
                    <Col                        
                        sm={4}
                        style={{ padding: 20 , margin:10 }}
                        className="square border rounded-5"
                    >
                        <h1 className="my-3">Payment Method</h1>
                        <Form onSubmit={submitHandler}>
                            <div className="mb=3">
                                <Form.Check
                                    type="radio"
                                    id="PayPal"
                                    label="PayPal"
                                    value="PayPal"
                                    checked={paymentMethodName === "PayPal"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb=3">
                                <Form.Check
                                    type="radio"
                                    id="Stripe"
                                    label="Stripe"
                                    value="Stripe"
                                    checked={paymentMethodName === "Stripe"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Button type="submit">Continue</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
