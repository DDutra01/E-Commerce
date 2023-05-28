import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


export default function SearchBox() {
    const navigate = useNavigate();
    const [query, setQuery] = useState();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : `/search`);
    };
    return (
        <Form className="d-flex me-auto" onSubmit={submitHandler}>
            <InputGroup>
                <Form.Control
                    type="text"
                    id="query"
                    name="query"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search product.."
                    aria-label="Search product"
                    aria-describedby="button-search"
                ></Form.Control>
                <Button
                    variant="outline-primary"
                    type="submit"
                    id="button-search"
                >
                    <i className="fas fa-search"></i>
                </Button>
            </InputGroup>
        </Form>
    );
}
