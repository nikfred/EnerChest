import React, {useContext} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {ACCOUNT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import BasketBar from "./BasketBar";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const mystyle = {
    fontFamily: 'Bebas Neue',
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
                style={{background: 'linear-gradient(171deg,#121212,#181818)', borderRadius: '0px 0px 15px 15px',
                    boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <Container>
                <NavLink to={SHOP_ROUTE} style={mystyle}>EnerChest</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <NavLink to='#' style={mystyle}><BasketBar/></NavLink>
                        <NavLink to={ACCOUNT_ROUTE} style={mystyle}>Account</NavLink>
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

