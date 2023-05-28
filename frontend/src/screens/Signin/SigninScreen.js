import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useUser } from "../../hooks/useUser";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Store } from "../../Context/Store/StoreContext";
import TitlePage from "../../components/Title-page";
import { Typography } from "@mui/material";

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
        <div className="signin">
            <TitlePage title="Amazona - Signin"></TitlePage>
            <div className="container-signin">
                <Row>
                    <Col>                       
                        <Typography variant="h3"> Signin</Typography>                     
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
                                <Typography variant="body1">
                                    New customer?
                                </Typography>
                                <Link to={`/signup?redirect=${redirect}`}>
                                    <Typography variant="body1">
                                        Create your account
                                    </Typography>
                                </Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
