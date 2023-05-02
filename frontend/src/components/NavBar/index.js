import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Store } from "../../Context/Store/StoreContext";
import { LinkContainer } from "react-router-bootstrap";
import { NavDropdown } from "react-bootstrap";

const NavBar = () => {
    const { state, dispatch: cxtDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signoutHandler = () => {
        cxtDispatch({ type: "USER_SIGNOUT" });
        localStorage.removeItem("userInfo");
    };

    return (
        <div>
            <header>
                <ToastContainer position="bottom-center" limit={1} />
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>amazona</Navbar.Brand>
                        </LinkContainer>
                        <Nav className="justify-content-end align-item-center">
                            <Link to="/cartShop" className="nav-link">
                                <ShoppingCartOutlinedIcon
                                    color="#f8f8f8"
                                    fontSize="medium"
                                />
                                {cart.cartItems.length > 0 && (
                                    <Badge pill bg="danger">
                                        {cart.cartItems.reduce(
                                            (acumulator, count) =>
                                                acumulator + count.quantity,
                                            0
                                        )}
                                    </Badge>
                                )}
                            </Link>
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="basic-nav-dropdown"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            User profile
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/oderhistory">
                                        <NavDropdown.Item>
                                            Oder history
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider></NavDropdown.Divider>
                                    <Link
                                        to="#signout"
                                        className="dropdown-item"
                                        onClick={signoutHandler}
                                    >
                                        signout
                                    </Link>
                                </NavDropdown>
                            ) : (
                                <Link to="/signin" className="nav-link">
                                    Signin
                                    <ExitToAppIcon
                                        color="#f8f8f8"
                                        fontSize="medium"
                                    />
                                </Link>
                            )}
                        </Nav>
                    </Container>
                </Navbar>
            </header>
        </div>
    );
};

export default NavBar;
