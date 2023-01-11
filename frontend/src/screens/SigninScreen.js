import Button from "react-bootstrap/Button";
import { Link, redirect, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import { useApi } from "../hooks/useApi";
import { useState } from "react";

export default function SigninScreen() {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")


    const api = useApi();


    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(email,password)
        try {
            const user = await api.signin(email, password)
            console.log(user)
        } catch (error) {
            
        }
    }

    return (
        <Container className="mt-3 justify-content-center">
            <div className=" small-container ">
                <main>
                    <h1 className="my-3">Signin</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className="mb-3">
                            <Button type="submit">Signin</Button>
                        </div>
                        <div className="mb-3">
                            New customer ?
                            <Link to={`signin?redirect=${redirect}`}>
                                Create your account
                            </Link>
                        </div>
                    </Form>
                </main>
            </div>
        </Container>
    );
}
