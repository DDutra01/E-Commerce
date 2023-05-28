import React, { useEffect, useReducer, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../../components/Product";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import {Button, Nav } from "react-bootstrap";
import TitlePage from "../../components/Title-page";
import { Typography } from "@mui/material";
import { LinkContainer } from "react-router-bootstrap";
import { useProduct } from "../../hooks/useProducts";
import { toast } from "react-toastify";

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
    const api = useProduct();

    const [sideBarOn, setSideBarOn] = useState(false);
    const [categories, setCategories] = useState([]);

    //get isOpen of the sideBar
    const handleSideBarData = () => {
        setSideBarOn(!sideBarOn);
    };

    const fetchDataHome = async () => {
        dispatch({ type: "FETCH_REQUEST" });
        const response = await api.getAllProducts();
        if (error.type === "AllProducts") {
            toast.error("It's not possible to get products.");
            dispatch({ type: "FETCH_FAIL", payload: error.message });
        }
        dispatch({ type: "FETCH_SUCCESS", payload: response });

        const responseCategories = await api.getAllCategories();
        if (error.type === "AllCategories") {
            toast.error("It's not possible to get categories.");
        }
        setCategories(responseCategories);
    };

    useEffect(() => {
        fetchDataHome();
    }, []);

    return (
        <div
            className={
                sideBarOn
                    ? "site-container d-flex flex-column active-cont"
                    : "site-container d-flex flex-column"
            }
        >
            <TitlePage title="Amazona"></TitlePage>
            <header>
                <NavBar
                    isShowIcons={true}
                    onSideBar={sideBarOn}
                    onToggle={handleSideBarData}
                />
            </header>
            {/* sideBar */}
            <div
                className={
                    sideBarOn
                        ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
                        : "side-navbar d-flex justify-content-between flex-wrap flex-column"
                }
            >
                <Nav className="flex-column text-white w-100 p-2">
                    <div className="d-flex justify-content-between p-2">
                        <Nav.Item>
                            <Typography variant="h5" component="h2">
                                Categories
                            </Typography>
                        </Nav.Item>
                        <Nav.Item>
                            <Button
                                variant="secundary"
                                size="md"
                                onClick={() => setSideBarOn(false)}
                            >
                                <i className="fas fa-times-circle"></i>
                            </Button>
                        </Nav.Item>
                    </div>

                    {categories.map((category) => (
                        <Nav.Item key={category}>
                            <LinkContainer
                                to={{
                                    pathname: "/search",
                                    search: `category=${category}`,
                                }}
                                onClick={() => setSideBarOn(false)}
                            >
                                <Nav.Link className="text-nav-sidebar">
                                    {category}
                                </Nav.Link>
                            </LinkContainer>
                            <div class="border-bottom mb-1 p-0"></div>
                        </Nav.Item>
                    ))}
                </Nav>
            </div>
            <main>
                <div className="site-container justify-content-center d-flex flex-column">
                    <Typography variant="h1" component="h2">
                        Products
                    </Typography>
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
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default HomeScreen;
