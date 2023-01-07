import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { Store } from "../Context/Store/StoreContext";
import { Container} from "react-bootstrap";
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const CartScreen = () => {
    const navigate = useNavigate();
    const { state, dispatch: cxtDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const updateCartHandler = async (item, quantity) => {
        //Melhorar isso, não ficar fazendo consulta no backend toda vez.

        const { data } = await axios.get(`api/products/${item._id}`);

        if (data.countInStock < quantity) {
            window.alert("Sorry, Product is out of sotck");
            return;
        }

        cxtDispatch({
            type: "CART_ADD_ITEM",
            payload: {
                ...item,
                quantity,
            },
        });
    };

    const removeItemHandler = (item) => {
        cxtDispatch({
            type: "CART_REMOVE_ITEM",
            payload: item,
        });
    };

    const checkoutHandler = () => {
          navigate("/signin?redirect=/shipping");
    }

    return (
        <div className="d-flex flex-column site-container">
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <header>
                <NavBar />
            </header>
            <Container className="mt-3">
                <main>
                    <h1>Shopping Cart</h1>
                    <Row>
                        <Col md={8} sm={8}>
                            {cartItems.length === 0 ? (
                                <MessageBox>
                                    Cart is empty.{" "}
                                    <Link to="/"> Go shopping</Link>
                                </MessageBox>
                            ) : (
                                <ListGroup>
                                    {cartItems.map((item) => (
                                        <ListGroup.Item key={item.id}>
                                            <Row className="align-items-center">
                                                <Col md={4}>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="img-fluid rounded img-thumbnail"
                                                    />
                                                    <Link
                                                        to={`/product/${item.slug}`}
                                                    >
                                                        {item.name}{" "}
                                                    </Link>
                                                </Col>
                                                <Col md={3}>
                                                    <Button
                                                        variant="light"
                                                        onClick={() =>
                                                            updateCartHandler(
                                                                item,
                                                                item.quantity -
                                                                    1
                                                            )
                                                        }
                                                        disabled={
                                                            item.quantity === 1
                                                        }
                                                    >
                                                        <i className="fas fa-minus-circle"></i>
                                                    </Button>{" "}
                                                    <span>{item.quantity}</span>{" "}
                                                    <Button
                                                        variant="light"
                                                        onClick={() =>
                                                            updateCartHandler(
                                                                item,
                                                                item.quantity +
                                                                    1
                                                            )
                                                        }
                                                        disabled={
                                                            item.quantity ===
                                                            item.countInStock
                                                        }
                                                    >
                                                        <i className="fas fa-plus-circle"></i>
                                                    </Button>{" "}
                                                </Col>
                                                <Col md={3}>{item.price}</Col>
                                                <Col md={2}>
                                                    <Button
                                                        variant="light"
                                                        onClick={() =>
                                                            removeItemHandler(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Col>
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>
                                                Subtotal (
                                                {cartItems.reduce(
                                                    (a, c) => a + c.quantity,
                                                    0
                                                )}{" "}
                                                items) :${" "}
                                                {cartItems.reduce(
                                                    (a, c) =>
                                                        a +
                                                        c.price * c.quantity,
                                                    0
                                                )}
                                            </h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="d-grid">
                                                <Button
                                                    type="button"
                                                    variant="primary"
                                                    onClick={() => checkoutHandler}
                                                    disabled={
                                                        cartItems.length === 0
                                                    }
                                                >
                                                    Proceed to Checkout
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </main>
            </Container>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default CartScreen;
