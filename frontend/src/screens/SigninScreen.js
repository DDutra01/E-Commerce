import Button from "react-bootstrap/Button";
import { Link, redirect, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import { useApi } from "../hooks/useApi";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function SigninScreen() {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const api = useApi();

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(email, password);
        try {
            const user = await api.signin(email, password);
            console.log(user);
        } catch (error) {}
    };

    return (
        <Container fluid="md">
            <Container className="spacer" />
            <Row mt={4} className="justify-content-center">
                <Col
                    sm={4}
                    style={{ padding: 20 }}
                    className="square border rounded-5"
                >
                    <h1 className="d-flex justify-content-center"> Signin</h1>
                    <Form onSubmit={submitHandler} mt={2}>
                        <Container className="spacerSm" />
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control                               
                                type="email"
                                placeholder="Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className="mb-3">
                            <Button type="submit">Signin</Button>
                        </div>
                        <div className="d-flex justify-content-end">
                            New customer?
                            <Link to={`signin?redirect=${redirect}`}>
                                Create your account
                            </Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
