import React, { useEffect, useReducer, useState } from "react";
import { useProduct } from "../../hooks/useProducts";
import TitlePage from "../../components/Title-page";
import NavBar from "../../components/NavBar";
import { Divider, Typography } from "@mui/material";
import { Button, Col, Nav, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Rating from "../../components/Rating";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import Product from "../../components/Product";
import { LinkContainer } from "react-router-bootstrap";

export const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return {
                ...state,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
                countProducts: action.payload.countProducts,
                loading: false,
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export const prices = [
    {
        name: "$1 to $50",
        value: 1 - 50,
    },
    {
        name: "$51 to $200",
        value: "51-200",
    },
    {
        name: "$201 to $1000",
        value: "201-1000",
    },
];

export const ratings = [
    {
        name: "4stars & up",
        rating: 4,
    },

    {
        name: "3stars & up",
        rating: 3,
    },

    {
        name: "2stars & up",
        rating: 2,
    },

    {
        name: "1stars & up",
        rating: 1,
    },
];

const SearchPage = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const api = useProduct();
    const [categories, setCategories] = useState([]);
    const searchParams = new URLSearchParams(search);
    const category = searchParams.get("category") || "";
    const query = searchParams.get("query") || "";
    const price = searchParams.get("price") || "";
    const rating = searchParams.get("rating") || "";
    const order = searchParams.get("order") || "newest";
    const page = searchParams.get("page") || 1;
    const [{ loading, error, products, pages, countProducts }, dispatch] =
        useReducer(reducer, {
            loading: true,
            error: "",
        });

    const fecthData = async () => {
        const response = await api.getSearch(
            page,
            query,
            category,
            price,
            rating,
            order
        );

        if (error) {
            toast.error("Something was wrong, try again");
            dispatch({
                type: "FETCH_FAIL",
                payload: error,
            });
        }
        dispatch({ type: "FETCH_SUCCESS", payload: response });

        const responseCategories = await api.getAllCategories();
        if (error.type === "AllCategories") {
            toast.error("It's not possible to get categories.");
        }
        setCategories(responseCategories);
    };
    const getFilterUrl = (filter, skipPathname) => {
        const filterPage = filter.page || page;
        const filterCategory = filter.category || category;
        const filterQuery = filter.query || query;
        const filterRating = filter.rating || rating;
        const filterPrice = filter.price || price;
        const sortOrder = filter.order || order;
        return `${
            skipPathname ? "" : "/search?"
        }category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
    };

    useEffect(() => {
        fecthData();
    }, [page, query, category, price, rating, order]);

    const [sideBarOn, setSideBarOn] = useState(false);

    //get isOpen of the sideBar
    const handleSideBarData = () => {
        setSideBarOn(!sideBarOn);
    };
    return (
        <div
            className={
                sideBarOn
                    ? "site-container d-flex flex-column active-cont"
                    : "site-container d-flex flex-column"
            }
        >
            <header>
                <TitlePage title="Search" />
                <NavBar
                    isShowIcons={true}
                    onSideBar={sideBarOn}
                    onToggle={handleSideBarData}
                />
            </header>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox varinat="danger">{error}</MessageBox>
            ) : (
                <>
                    {/* sideBar */}
                    <div
                        className={
                            sideBarOn
                                ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
                                : "side-navbar d-flex justify-content-between flex-wrap flex-column"
                        }
                    >
                        <Nav className="flex-column text-white w-100">
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
                    <div className="site-container-content">
                        <Row>
                            <Col md={3} mt={5}>
                                <Typography variant="h6">
                                    Departament
                                </Typography>
                                <div>
                                    <ul>
                                        {categories ? (
                                            categories.map((itemCat) => (
                                                <li key={itemCat}>
                                                    <Link
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                        className={
                                                            itemCat === category
                                                                ? "text-bold"
                                                                : ""
                                                        }
                                                        to={getFilterUrl({
                                                            category: itemCat,
                                                        })}
                                                    >
                                                        {itemCat}
                                                    </Link>
                                                </li>
                                            ))
                                        ) : (
                                            <li>
                                                <Link
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                    className={
                                                        "all" === category
                                                            ? "text-bold"
                                                            : ""
                                                    }
                                                    to={getFilterUrl({
                                                        category: "",
                                                    })}
                                                ></Link>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div>
                                    <Typography variant="h6">Price</Typography>
                                    <ul>
                                        {prices.map((itemPrice) => (
                                            <li key={itemPrice.value}>
                                                <Link
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                    className={
                                                        itemPrice.value ===
                                                        price
                                                            ? "text-bold"
                                                            : ""
                                                    }
                                                    to={getFilterUrl({
                                                        price: itemPrice.value,
                                                    })}
                                                >
                                                    {itemPrice.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <Typography variant="h6">
                                        Rating review
                                    </Typography>
                                    <ul>
                                        {ratings.map((itemRating) => (
                                            <li key={itemRating.name}>
                                                <Link
                                                    className={
                                                        `${itemRating.rating}` ===
                                                        `${rating}`
                                                            ? "text-bold"
                                                            : ""
                                                    }
                                                    to={getFilterUrl({
                                                        rating: itemRating.rating,
                                                    })}
                                                >
                                                    <Rating
                                                        caption={" & up"}
                                                        rating={
                                                            itemRating.rating
                                                        }
                                                    />
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <Link
                                                className={
                                                    "all" === rating
                                                        ? "text-bold"
                                                        : ""
                                                }
                                                to={getFilterUrl({
                                                    rating: "0",
                                                })}
                                            >
                                                <Rating
                                                    caption={" & up"}
                                                    rating={0}
                                                ></Rating>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>{" "}
                            </Col>
                            <Col md={9}>
                                <div>
                                    <Row className="justify-content-between mb-3">
                                        <Col md={6}>
                                            <div>
                                                <Typography varinat="">
                                                    Results :
                                                    {countProducts === 0
                                                        ? "No"
                                                        : countProducts}
                                                </Typography>
                                            </div>
                                            <div className="d-flex flex-row align-items-center">
                                                <Typography varinat="">
                                                    to : 
                                                    {query !== "" && "" + query}
                                                    {category !== "" &&
                                                        "," + category}
                                                    {price !== "" &&
                                                        ",$ " + price}
                                                </Typography>
                                                {query !== "" ||
                                                category !== "" ||
                                                rating !== "" ||
                                                price !== "" ? (
                                                    <Button
                                                        variant="light"
                                                        onClick={() =>
                                                            navigate("/search")
                                                        }
                                                    >
                                                        <i className="fas fa-times-circle"></i>
                                                    </Button>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col className="text-end">
                                            Sort by{" "}
                                            <select
                                                value={order}
                                                onChange={(e) => {
                                                    navigate(
                                                        getFilterUrl({
                                                            order: e.target
                                                                .value,
                                                        })
                                                    );
                                                }}
                                            >
                                                <option value="newest">
                                                    Newest Arrivals
                                                </option>
                                                <option value="lowest">
                                                    Price: Low to High
                                                </option>
                                                <option value="highest">
                                                    Price: High to Low
                                                </option>
                                                <option value="toprated">
                                                    Avg. Customer Reviews
                                                </option>
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {products ? (
                                            products.map((product) => (
                                                <Col
                                                    sm={6}
                                                    md={4}
                                                    lg={3}
                                                    className="mb-3"
                                                    key={product._id}
                                                >
                                                    <Product
                                                        product={product}
                                                    ></Product>
                                                </Col>
                                            ))
                                        ) : (
                                            <div>
                                                <MessageBox>
                                                    No Product Found
                                                </MessageBox>
                                            </div>
                                        )}
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={3}>
                                {[...Array(pages).keys()].map((x) => (
                                    <LinkContainer
                                        key={x + 1}
                                        className="mx-1"
                                        to={{
                                            pathname: "/search",
                                            seacrh: getFilterUrl(
                                                { page: x + 1 },
                                                true
                                            ),
                                        }}
                                    >
                                        <Button
                                            className={
                                                Number(page) === x + 1
                                                    ? "text-bold"
                                                    : ""
                                            }
                                            variant="light"
                                        >
                                            {x + 1}
                                        </Button>
                                    </LinkContainer>
                                ))}
                            </Col>
                        </Row>
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchPage;
