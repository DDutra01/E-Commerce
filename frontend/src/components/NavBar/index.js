import React, { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Store } from "../../Context/Store/StoreContext";
import { LinkContainer } from "react-router-bootstrap";
import { Button, NavDropdown } from "react-bootstrap";
import SearchBox from "../SearchBox";

const NavBar = (props) => {
    const { state, dispatch: cxtDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signoutHandler = () => {
        cxtDispatch({ type: "USER_SIGNOUT" });
        localStorage.removeItem("userInfo");
        localStorage.removeItem("shippingAddress");
        localStorage.removeItem("paymentMethod");
    };

    const handleIsOpen = () => {
        props.onToggle();
    };

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
                <Button className="me-2" variant="dark" onClick={handleIsOpen}>
                    <i className="fas fa-bars" />
                </Button>
                <LinkContainer to="/">
                    <Navbar.Brand>amazona</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBox/>
                    {props.isShowIcons ? (
                        <Nav className="me-auto w-100 justify-content-end">
                            <Link to="/cartShop" className="nav-link">
                                <ShoppingCartOutlinedIcon
                                    color="#f8f8f8"
                                    fontSize="medium"
                                />
                                Cart
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

                                    <LinkContainer to="/orderHistory">
                                        <NavDropdown.Item>
                                            Order history
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider></NavDropdown.Divider>
                                    <Link
                                        to="/"
                                        className="dropdown-item"
                                        onClick={signoutHandler}
                                    >
                                        signout
                                    </Link>
                                </NavDropdown>
                            ) : (
                                <Link to="/signin" className="nav-link">
                                    <ExitToAppIcon
                                        color="#f8f8f8"
                                        fontSize="medium"
                                    />
                                    Signin
                                </Link>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id='admin-nav-dropdown'>
                                    <LinkContainer to="/admin/dashbaord">
                                        <NavDropdown.Item>Dashbaord</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/poductlist">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    ) : null}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
