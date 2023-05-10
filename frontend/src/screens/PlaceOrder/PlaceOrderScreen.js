import React, { useContext, useReducer } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import TitlePage from "../../components/Title-page";
import NavBar from "../../components/NavBar";
import CheckOutSteps from "../../components/CheckOutSteps";
import { Store } from "../../Context/Store/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingBox from "../../components/LoadingBox";
import { useOrder } from "../../hooks/useOrders";

export default function PlaceOrderScreen() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const navigate = useNavigate();
    const api = useOrder();

    const reducer = (state, action) => {
        switch (action.type) {
            case "CREATE_REQUEST":
                return { ...state, loading: true };

            case "SUCCESS_REQUEST":
                return { ...state, loading: false };

            case "FAIL_REQUEST":
                return { ...state, loading: false };

            default:
                return state;
        }
    };

    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
    });

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; //123.234 = 123.23

    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );

    cart.shippingPrice =
        cart.cartItems.lenght > 0
            ? cart.itemsPrice > 100
                ? round2(0)
                : round2(10)
            : round2(0);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = async () => {
        const orderInfo = {
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        };
        const { token } = userInfo;

        dispatch({ type: "CREATE_REQUEST" });
        const response = await api.orderPayment(orderInfo, token);
        console.log(response);
        if (response) {
            console.log('chegou aqui')
            ctxDispatch({ type: "CART_CLEAR" });
            dispatch({ type: "SUCCESS_REQUEST" });
            localStorage.removeItem("cartItems");
            navigate(`/order/${response.data.order._id}`);
            
        }
    };

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate("/payment");
        }
    }, [cart, navigate]);

    return (
        <div className="d-flex flex-column site-container">
            <TitlePage title="Place Order"></TitlePage>
            <header>
                <NavBar isShowIcons={false} />
            </header>
            {loading ? (
                <div className="d- flex justify-content-center">
                    <LoadingBox />
                </div>
            ) : (
                <Container fluid="md">
                    <Row
                        mt={4}
                        style={{ margin: 10 }}
                        className="align-items-start"
                    >
                        <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
                        <h1 className="my-3">Place Order</h1>
                        {/* shipping */}
                        <Col sm={8}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Shipping</Card.Title>
                                    <Card.Text>
                                        <strong>Name:</strong>
                                        {cart.shippingAddress.fullname}
                                        <br />
                                        <strong>Address:</strong>
                                        {cart.shippingAddress.address},
                                        {cart.shippingAddress.city},
                                        {cart.shippingAddress.postalCode},
                                        {cart.shippingAddress.country}
                                    </Card.Text>
                                    <Link to="/shipping">Edit</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/* payment */}
                        <Col sm={8}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Payment</Card.Title>
                                    <Card.Text>
                                        <strong>Method:</strong>
                                        {cart.paymentMethod} <br />
                                    </Card.Text>
                                    <Link to="/payment">Edit</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/* Item */}
                        <Col sm={8}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Item</Card.Title>
                                    <ListGroup variant="flush">
                                        {cart.cartItems.map((item) => (
                                            <ListGroup.Item key={item.id}>
                                                {console.log("id", item._id)}
                                                <Row className="align-items-center">
                                                    <Col md={6}>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="img-fluid rounded img-thumbnail"
                                                        />{" "}
                                                        <Link
                                                            to={`/product/${item.slug}`}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={3}>
                                                        <span>
                                                            {item.quantity}
                                                        </span>
                                                    </Col>
                                                    <Col md={3}>
                                                        $ {item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    <Link to="/cart">Edit</Link>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Order Summary</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Items</Col>
                                                <Col>
                                                    ${" "}
                                                    {cart.itemsPrice.toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Shipping</Col>
                                                <Col>
                                                    ${" "}
                                                    {cart.shippingPrice.toFixed(
                                                        2
                                                    )}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Tax</Col>
                                                <Col>
                                                    $ {cart.taxPrice.toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    <strong>Order Total</strong>
                                                </Col>
                                                <Col>
                                                    $
                                                    <strong>
                                                        {cart.totalPrice.toFixed(
                                                            2
                                                        )}
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="d-grid">
                                                <Button
                                                    type="button"
                                                    onClick={placeOrderHandler}
                                                    disabled={
                                                        cart.cartItems
                                                            .lenght === 0
                                                    }
                                                >
                                                    {loading
                                                        ? loading && (
                                                              <LoadingBox></LoadingBox>
                                                          )
                                                        : "Place Order"}
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
}
