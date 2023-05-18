import React, { useContext, useReducer, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TitlePage from "../../../components/Title-page";
import NavBar from "../../../components/NavBar";
import { Store } from "../../../Context/Store/StoreContext";
import { useUser } from "../../../hooks/useUser";
import { toast } from "react-toastify";
import LoadingBox from "../../../components/LoadingBox";

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_REQUEST":
            return { ...state, loadingUpdate: true };
        case "UPDATE_SUCCESS":
            return { ...state, loadingUpdate: false };
        case "UPDATE_FAIL":
            return { ...state, loadingUpdate: false };

        default:
            return state;
    }
};

export default function ProfileScreen() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const api = useUser();

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("clicou");
        const { token } = userInfo;

        if (name === "" || name.lenght < 3) {
            toast.warn("Name invalid, try change!");
            return;
        }
        if (email === "" || email.lenght < 7) {
            toast.warn("Email invalid, try change!");
            return;
        }
        if (password === "" || password.length < 3) {
            toast.warn("Name invalid, try change!");
            return;
        }
        if (password !== confirmPassword) {
            toast.warn("Passwords aren't equal");
            return;
        }

        const user = {
            name,
            email,
            password,
        };

        dispatch({
            type: "UPDATE_REQUEST",
        });
        const response = await api.update(token, user);

        if (!response) {
            toast.error("something didn't go as expected, try again!");
        }
        if (response) {
            const { user } = response;
            dispatch({
                type: "UPDATE_SUCCESS",
            });
            ctxDispatch({ type: "USER_SIGNIN", payload: user });
            localStorage.setItem("userInfo", JSON.stringify(user));
            toast.success("User updated successfully");
        }
    };

    return (
        <div>
            <TitlePage title="Profile" />
            <NavBar />
            {loadingUpdate ? (
                <LoadingBox />
            ) : (
                <div className="container small-container">
                    <h1 className="my-3">Hi, {userInfo.name ?? "User"}</h1>
                    <form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email ?? "E-mail"}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="ConfirmPassword"
                        >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </Form.Group>
                        <div className="mb-3">
                            <Button type="submit">Update Profile</Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
