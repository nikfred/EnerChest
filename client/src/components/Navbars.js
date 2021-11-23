import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";

const Navbars = () => {
    return (
        <Navbar variant="dark" style={{backgroundColor: '#F3A055'}}>
            <Container>
                <NavLink to={SHOP_ROUTE}>EnerChest</NavLink>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};


export default Navbars;