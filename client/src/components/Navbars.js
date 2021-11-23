import React, {useContext} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {ACCOUNT_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const mystyle = {
    fontFamily: 'Montserrat Alternates',
    textDecoration: 'none',
    color: 'green',
    paddingLeft: '20px',
    paddingRight: '6px',
    fontSize: '28px'
};

const Navbars = observer(() => {
    const {user} = useContext(Context)
    return (
        <Navbar variant="dark"
                style={{backgroundColor: '#F3A055', borderRadius: '0px 40px 40px 0px',
                    boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <Container>
                <NavLink to={SHOP_ROUTE} style={mystyle}>EnerChest</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <NavLink to={ACCOUNT_ROUTE} style={mystyle}>Account</NavLink>
                        <NavLink to={BASKET_ROUTE} style={mystyle}>Basket</NavLink>
                    </Nav>
                    :
                    <Nav className="ml-auto" >
                        <NavLink to={LOGIN_ROUTE} style={mystyle}>Log in</NavLink>
                        <NavLink to={REGISTRATION_ROUTE} style={mystyle}>Sign up</NavLink>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});


export default Navbars;