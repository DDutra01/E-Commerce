import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import bcrypt from "bcryptjs";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Store } from "../../Context/Store/StoreContext";
import TitlePage from "../../components/Title-page";
import { toast } from "react-toastify";
import { useUser } from "../../hooks/useUser";

export default function SignUpScreen() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const api = useUser();

    const submitHandler = async (e) => {    
        e.preventDefault();

        const passwordCryp = bcrypt.hashSync(password)       

        if (password !== confirmPassword) {
            toast.error('Password do not match');
            return
        }
        
        const newUser = {
            name,
            email,
            password: passwordCryp,
        };
        
        const user = await api.signup(newUser);
        if (user) {
            console.log('User', user)
            const { token } = user;
            ctxDispatch({ type: "USER_SIGNIN", payload: user });
            localStorage.setItem("userInfo", JSON.stringify(token));
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
            <TitlePage title="Amazona - Signup"></TitlePage>
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
                            Sign Up
                        </h1>
                        <Form onSubmit={submitHandler} mt={2}>
                            <Container className="spacerSm" />
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Name"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
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
                            <Form.Group
                                className="mb-3"
                                controlId="confirmPassword"
                            >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <div className="mb-3 justify-content-center">
                                <Button type="submit">Sign Up</Button>
                            </div>
                            <div className="d-flex justify-content-end">
                                Already have an account?{" "}
                                <Link to={`/signin?redirect=${redirect}`}>
                                    Sign In
                                </Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </di>
    );
}
