import React, { useContext, useEffect, useReducer } from "react";
import TitlePage from "../../components/Title-page";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { Store } from "../../Context/Store/StoreContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrders";
import NavBar from "../../components/NavBar";

const OrderStatusScreen = () => {
    const api = useOrder();
    const reducer = (state, action) => {
        switch (action.type) {
            case "FETCH_REQUEST":
                return { ...state, loading: true, error: "" };

            case "FETCH_SUCCESS":
                return {
                    ...state,
                    loading: false,
                    order: action.payload,
                    error: "",
                };

            case "FETCH_FAIL":
                return { ...state, loading: false, error: action.payload };

            default:
                return state;
        }
    };
    const [{ loading, order, error }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: "",
    });

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const navigate = useNavigate();
    const params = useParams();
    const { id: orderId } = params;

    const oders = async () => {
        const id = orderId;
        const { token } = userInfo;
        dispatch({ type: "FETCH_REQUEST" });
        const response = await api.getOrder(id, token);
        console.log("response", response.data);
        if (response.data.success) {
            dispatch({ type: "FETCH_SUCCESS", payload: response.data.order });
        }
        if (error) {
            dispatch({ type: "FETCH_FAIL", payload: response });
        }
    };

    useEffect(() => {
        if (!userInfo) {
            return navigate("/signin");
        }
        if (!order._id || (order._id && order._id !== orderId)) {
            oders();
        }
    }, [order, orderId, userInfo, navigate]);

    return (
        <div className="d-flex flex-column site-container">
            <TitlePage props="Order Status"></TitlePage>
            <header>
                <NavBar isShowIcons={true} />
            </header>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <Container className="d-wrap mb-3">
                    <Row className="align-items-start">
                        <h1>Order {orderId}</h1>
                        <Col md={8} className="my-3">
                            <Card className="mb-6">
                                <Card.Body>
                                    <Card.Title>Shipping</Card.Title>
                                    <Card.Text>
                                        <strong>Name: </strong>
                                        {order.shippingAddress.fullName}
                                        <br />
                                        <strong>Address: </strong>
                                        {order.shippingAddress.address},<br />
                                        {order.shippingAddress.city},<br />
                                        {order.shippingAddress.postalCode},
                                        <br />
                                        {order.shippingAddress.country}
                                        <br />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="my-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Order Summary</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Items</Col>
                                                <Col>
                                                    ${" "}
                                                    {order.itemsPrice.toFixed(
                                                        2
                                                    )}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Shipping</Col>
                                                <Col>
                                                    $
                                                    {order.shippingPrice.toFixed(
                                                        2
                                                    )}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Tax</Col>
                                                <Col>
                                                    ${" "}
                                                    {order.taxPrice.toFixed(2)}
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
                                                        {order.totalPrice.toFixed(
                                                            2
                                                        )}
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* payment */}
                        <Col sm={8}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Payment</Card.Title>
                                    <Card.Text>
                                        <strong>Method: </strong>
                                        {order.paymentMethod} <br />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/* Item */}
                        <Col sm={8}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Items</Card.Title>
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item) => (
                                            <ListGroup.Item key={item.id}>
                                                {console.log("id", item._id)}
                                                <Row className="align-items-center">
                                                    <Col md={6}>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="img-fluid rounded img-thumbnail"
                                                        />{" "}
                                                        <Link>{item.name}</Link>
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
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
};

export default OrderStatusScreen;
