import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";

const Navbars = () => {
    return (
        <Navbar variant="dark" style={{backgroundColor: '#F3A055', borderRadius: '0px 0px 20px 20px', fontSize: '28px'}}>
            <Container>
                <NavLink to={SHOP_ROUTE} style={{fontFamily: 'Impact', textDecoration: 'none'}}>EnerChest</NavLink>
                <Nav className="ml-auto" style={{position: 'right', color: 'green'}}>
                    <Nav.Link href="#dfdsfdsfsdf">Аккаунт</Nav.Link>
                    <Nav.Link href="#features">Корзина </Nav.Link>

                </Nav>
            </Container>
        </Navbar>
    );
};


export default Navbars;