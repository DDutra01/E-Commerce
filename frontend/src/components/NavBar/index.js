import React, { useContext } from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import { Store } from '../../Context/Store/StoreContext';
import { LinkContainer } from "react-router-bootstrap";


const NavBar = () => {
    const {state} = useContext(Store)
    const { cart } = state;
    
    
    return (
        <div>
            <header>
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>amazona</Navbar.Brand>
                        </LinkContainer>
                        <Nav className="justify-content-end">
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
                            <Link to="/signin" className="nav-link">
                                Signin
                                <ExitToAppIcon
                                    color="#f8f8f8"
                                    fontSize="medium"
                                />
                            </Link>
                        </Nav>
                    </Container>
                </Navbar>
            </header>
        </div>
    );
}

export default NavBar;









