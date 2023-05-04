import { Button, Col, Container, Form, Row } from "react-bootstrap";
import TitlePage from "../../components/Title-page";
import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Context/Store/StoreContext";
import CheckOutSteps from "../../components/CheckOutSteps";

export default function ShippingAddressScreen() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        userInfo,
        cart: { shippingAddress },
    } = state;

    const [fullname, setFullName] = useState(shippingAddress.fullname || "");
    const [address, setAddress] = useState(shippingAddress.address || "");
    const [city, setCity] = useState(shippingAddress.city || "");
    const [postalCode, setPostalCode] = useState(
        shippingAddress.postalCode || ""
    );
    const [country, setCountry] = useState(shippingAddress.country || "");
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate("/signin?redirect=/shipping");
        }
    }, [userInfo, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: "SAVE_SHIPPING_ADDRESS",
            payload: {
                fullname,
                address,
                country,
                postalCode,
                city,
            },
        });
        localStorage.setItem(
            "shippingAddress",
            JSON.stringify({
                fullname,
                country,
                city,
                postalCode,
                address,
            })
        );
        navigate("/payment");
    };

    return (
        <div>
            <TitlePage title="Shipping Address"></TitlePage>
            <header>
                <NavBar isShowIcons={false} />
            </header>
            <Container fluid="md">
                <Row
                    mt={4}
                    style={{ margin: 10 }}
                    className="justify-content-center"
                >
                    <CheckOutSteps step1 step2></CheckOutSteps>
                    <Col
                        sm={4}
                        style={{ padding: 20 }}
                        className="square border rounded-5"
                    >
                        <h1 className="my-3">Shipping Address</h1>
                        <Form on onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId="fullname">
                                <Form.Label>Full name</Form.Label>
                                <Form.Control
                                    value={fullname}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    required
                                />
                            </Form.Group>
                         
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="postalCode">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control
                                    value={postalCode}
                                    onChange={(e) =>
                                        setPostalCode(e.target.value)
                                    }
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <div className="mb-3">
                                <Button variant="primary" type="submit">
                                    Continue
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
