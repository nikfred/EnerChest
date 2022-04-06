import React, {useContext, useState} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import BasketBar from "./BasketBar";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import AccountBar from "./AccountBar";
import img from "../img/logo5122.png"
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import {BsPersonFill} from "react-icons/bs";


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

    const [AccountVisible, setAccountVisible] = useState(false)


    return (
        <Navbar variant="dark"
                style={{
                    background: 'linear-gradient(171deg,#121212,#181818)', borderRadius: '0px 0px 15px 15px',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                }}>
            <Container>
                <a href={SHOP_ROUTE} style={mystyle}>EnerChest</a>
                <Image width={40} src={img}/>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        {user.isAdmin ?
                            ' '
                            :
                            <NavLink to='#' style={mystyle}><BasketBar/></NavLink>
                        }
                        <div>
                            <Button variant="success" style={{
                                fontSize: '16px',
                                fontFamily: 'Bebas Neue'
                            }}
                                    onClick={() => {
                                        setAccountVisible(true)
                                    }}>
                                <BsPersonFill/> Account
                            </Button>
                            <AccountBar show={AccountVisible} onHide={() => setAccountVisible(false)}/>
                        </div>

                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <NavLink to={LOGIN_ROUTE} style={mystyle}>Log in</NavLink>
                        <NavLink to={REGISTRATION_ROUTE} style={mystyle}>Sign up</NavLink>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});


export default Navbars;

