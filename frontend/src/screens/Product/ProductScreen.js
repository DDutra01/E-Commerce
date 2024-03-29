import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../../components/Rating";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/esm/Button";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { getError } from "../../utils";
import { Store } from "../../Context/Store/StoreContext";
import NavBar from "../../components/NavBar";
import { Container } from "react-bootstrap";
import TitlePage from "../../components/Title-page";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return {
                ...state,
                product: action.payload, //One products
                loading: false,
            };
        case "FECTH_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default function ProductScreen() {
    const params = useParams();
    const navigate = useNavigate();
    const { slug } = params;
    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: "",
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "FETCH_REQUEST" });

            try {
                const result = await axios.get(`/products/slug/${slug}`);
                dispatch({ type: "FETCH_SUCCESS", payload: result.data });
            } catch (error) {
                dispatch({ type: "FETCH_FAIL", payload: getError(error) });
            }
        };

        fetchData();
    }, [slug]);

    const { state, dispatch: cxtDispatch } = useContext(Store);
    const { cart } = state;

    const addToCartHandler = async () => {
        //verificar porque não está enviando o id para o backend
        const isItemExist = cart.cartItems.find((x) => x._id === product._id);
        const quantity = isItemExist ? isItemExist.quantity + 1 : 1;
        const { data } = await axios.get(`/products/${product._id}`);
        if (data.countInStock < quantity) {
            window.alert("Sorry, Product is out of sotck");
            return;
        }

        cxtDispatch({
            type: "CART_ADD_ITEM",
            payload: {
                ...product,
                quantity,
            },
        });

        navigate("/cartShop");
    };

    return (
        <div className="d-flex flex-column site-container">
            <TitlePage title="Amazona"></TitlePage>
            <header>
                <NavBar isShowIcons={true} />
            </header>
            <Container className="mt-3">
                <main>
                    {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <img
                                        className="img-large"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Helmet>
                                                <title>{product.name}</title>
                                            </Helmet>
                                            <h1>{product.name}</h1>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Rating
                                                rating={product.rating}
                                                numReviews={product.numReviews}
                                            />
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Price : $ {product.price}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description :
                                            <p>{product.description}</p>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <Card.Body>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Price :</Col>
                                                        <Col>
                                                            $ {product.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>

                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Status :</Col>
                                                        <Col>
                                                            {product.countInStock >
                                                            0 ? (
                                                                <Badge bg="success">
                                                                    In Stock
                                                                </Badge>
                                                            ) : (
                                                                <Badge bg="danger">
                                                                    Unavailable
                                                                </Badge>
                                                            )}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>

                                                {product.countInStock > 0 && (
                                                    <ListGroup.Item>
                                                        <div className="d-grid">
                                                            <Button
                                                                onClick={
                                                                    addToCartHandler
                                                                }
                                                                variant="primary"
                                                            >
                                                                Add to cart
                                                            </Button>
                                                        </div>
                                                    </ListGroup.Item>
                                                )}
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    )}
                </main>
            </Container>
            {/*   <footer>
                <Footer />
            </footer> */}
        </div>
    );
}
