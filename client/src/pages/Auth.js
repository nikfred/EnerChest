import React from 'react';
import {Button, Card, Container, Form, FormControl, Row} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";

const Auth = () => {
    const isLogin = useLocation().pathname === LOGIN_ROUTE
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: '600px', borderRadius: '20px', backgroundColor: '#C4C4C4',
                boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)'}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
                <Form className="d-flex flex-column">
                    <FormControl
                        className="mt-3"
                        placeholder="Enter e-mail..."
                    />
                    <FormControl
                        className="mt-3"
                        placeholder="Enter password..."
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Don't have an account? <NavLink to={REGISTRATION_ROUTE}>Register...</NavLink>
                            </div>
                            :
                            <div>
                                Have an account?  <NavLink to={LOGIN_ROUTE}> Sign in...</NavLink>
                            </div>
                        }
                        <Button variant="outline-success" className="mt-3">
                            {isLogin ? 'Log in' : 'Register'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
};

export default Auth;