import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {  useUser } from "../../hooks/useUser";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Store } from "../../Context/Store/StoreContext";
import TitlePage from "../../components/Title-page";

export default function SigninScreen() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const api = useUser();

    const submitHandler = async (e) => {
        e.preventDefault();
        const user = await api.signin(email, password);
        if (user) {
            
            ctxDispatch({ type: "USER_SIGNIN", payload: user });
            localStorage.setItem("userInfo", JSON.stringify(user));
            navigate(redirect || "/");
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <di>
            <TitlePage title="Amazona - Signin"></TitlePage>
            <Container fluid="md">
                <Container className="spacer" />
                <Row mt={4} className="justify-content-center">
                    <Col
                        sm={4}
                        style={{ padding: 20 }}
                        className="square border rounded-5"
                    >
                        <h1 className="d-flex justify-content-center">
                            {" "}
                            Signin
                        </h1>
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <div className="mb-3">
                                <Button type="submit">Signin</Button>
                            </div>
                            <div className="d-flex justify-content-end">
                                New customer?
                                <Link to={`/signup?redirect=${redirect}`}>
                                    Create your account
                                </Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </di>
    );
}
