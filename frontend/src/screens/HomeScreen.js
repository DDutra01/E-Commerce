import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return {
                ...state,
                products: action.payload, //all products
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

const HomeScreen = () => {
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        products: [],
        loading: true,
        error: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "FETCH_REQUEST" });

            try {
                const result = await axios.get("/products/products");
                dispatch({ type: "FETCH_SUCCESS", payload: result.data });
            } catch (error) {
                console.log("bateu o erro");
                dispatch({ type: "FETCH_FAIL", payload: error.message });
            }
        };

        fetchData();
    }, []);

    return (
        //<div className="d-flex flex-column site-container">
        <div>
            <Helmet>
                <title>Amazona</title>
            </Helmet>
            <header>
                <NavBar />
            </header>
            <Container className="mt-3">
                <main>
                    <h1>Featured Products</h1>
                    <div className="products">
                        {loading ? (
                            <LoadingBox />
                        ) : error ? (
                            <MessageBox variant="danger">{error}</MessageBox>
                        ) : (
                            <Row>
                                {products.map((product) => (
                                    <Col
                                        key={product.slug}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        className="mb-3"
                                    >
                                        <Product product={product}></Product>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </div>
                </main>
            </Container>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default HomeScreen;
