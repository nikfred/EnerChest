import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, FormControl, Row} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Auth = observer(()=> {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    const click = async () =>{
        try {
            let data;
            if (isLogin){
                data = await login(email, password);
            } else {
                data = await registration(email, password, phone, firstname, lastname);
            }
            console.log(data)
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)

        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: '600px', borderRadius: '20px', backgroundColor: '#C4C4C4',
                boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)'}}  className="p-5">
                <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
                <Form className="d-flex flex-column">
                    <FormControl
                        className="mt-3"
                        placeholder="Enter e-mail..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <FormControl
                        className="mt-3"
                        placeholder="Enter password..."
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {isLogin ? ' ' : <div>
                    <FormControl
                        className="mt-3"
                        placeholder="Enter phone..."
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                        <FormControl
                        className="mt-3"
                        placeholder="Enter first name ..."
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}
                        />
                        <FormControl
                        className="mt-3"
                        placeholder="Enter last name ..."
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                        />
                    </div>
                    }
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
                        <Button variant="outline-success" className="mt-3" onClick={click}>
                            {isLogin ? 'Log in' : 'Register'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;