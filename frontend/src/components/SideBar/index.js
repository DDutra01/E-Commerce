import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavDropdown, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Sidebar() {
    return (
        <Container>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown title="eletronics" id="Gift">
                            <NavDropdown.Item>Cell Phones</NavDropdown.Item>
                            <NavDropdown.Item>Tv's</NavDropdown.Item>
                            <NavDropdown.Item>Table's</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown id="costumers" title={""}>
                            <NavDropdown.Item>
                                Costumer Services
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown id="buy">
                            <NavDropdown.Item>Buy again</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown id="registry">
                            <NavDropdown.Item>Registry</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}
