import React, { useContext, useReducer, useState } from "react";
import Form from "react-bootstrap/Form";
import TitlePage from "../../components/Title-page";
import NavBar from "../../components/NavBar";
import { Button, Col, Container, Row } from "react-bootstrap";
import MessageBox from "../../components/MessageBox";
import { Store } from "../../Context/Store/StoreContext";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useOrder } from "../../hooks/useOrders";
const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, orders: action.payload, loading: false };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const OrderHistorryScreen = () => {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: "",
        orders: [],
    });
    const api = useOrder();

    const [paidValue, setPaidValue] = useState("");
    const [deliveredValue, setDeliveredValue] = useState("");

    const handlePaidChange = (event) => {
        setPaidValue(event.target.value);
    };

    const handleDeliveredChange = (event) => {
        setDeliveredValue(event.target.value);
    };

   const filterOrders = async () => {
        console.log('clicou')
        const { token } = userInfo;

        const filters = {
            isPaid: paidValue,
            isDelivered: deliveredValue,
        };
        dispatch({ type: "FETCH_REQUEST" });
        const response = await api.orderQuery(token, filters);
        console.log(response);
        if (response.data) {
            const { orders } = response.data;
            dispatch({ type: "FETCH_SUCCESS", payload: orders });
        }
        if (!response) {
            dispatch({ type: "FETCH_FAIL", payload: response });
            toast.error("Problem is search orders");
        }
    }; 

    const ordersRequest = async () => {
        const { token } = userInfo;

        dispatch({ type: "FETCH_REQUEST" });
        const response = await api.getHistory(token);
        console.log(response.data);
        if (response.data) {
            const { orders } = response.data;
            dispatch({ type: "FETCH_SUCCESS", payload: orders });
        }
        if (!response) {
            dispatch({ type: "FETCH_FAIL", payload: response });
            toast.error("Problem is search orders");
        }
    };

    useEffect(() => {
        ordersRequest();
    }, [userInfo]);

    return (
        <div className="d-flex flex-column site-container">
            <TitlePage props="History"></TitlePage>
            <header>
                <NavBar isShowIcons={true} />
            </header>

            {loading ? (
                <div className="d- flex justify-content-center">
                    <LoadingBox />
                </div>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <Container className="d-wrap mb-3">
                    <h1>Order History</h1>

                    <h5>Filter</h5>
                    <Row>
                        <Col md={3}>
                            <Form.Select
                                aria-label="Default select example"
                                value={paidValue}
                                onChange={handlePaidChange}
                            >
                                <option>Paid</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </Form.Select>
                        </Col>
                        <Col md={3}>
                            <Form.Select
                                aria-label="Default select example"
                                value={deliveredValue}
                                onChange={handleDeliveredChange}
                            >
                                <option>Delivered</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </Form.Select>
                        </Col>
                        <Col md={3}>
                            <Button
                                variant="dark"
                                onClick={() => {
                                  filterOrders();
                                }}
                            >
                                Filter
                            </Button>
                        </Col>
                    </Row>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>
                                        {order.isPaid
                                            ? order.paisAt.substring(0, 10)
                                            : "No"}
                                    </td>
                                    <td>
                                        {order.isDelivered
                                            ? order.deliveredAt.substring(0, 10)
                                            : "No"}
                                    </td>
                                    <Button
                                        type="button"
                                        variant="light"
                                        onClick={() => {
                                            navigate(`/order/${order._id}`);
                                        }}
                                    >
                                        Details
                                    </Button>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Container>
            )}
        </div>
    );
};

export default OrderHistorryScreen;
