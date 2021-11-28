import React, {useContext} from 'react';
import {Button, Container, Image, ListGroup, Row} from "react-bootstrap";
import BasketBar from "../components/BasketBar";
import {Context} from "../index";
import {useHistory} from "react-router-dom"
import {ADMIN_ROUTE, LOGIN_ROUTE} from "../utils/consts";

const Account = () => {
    const {user} = useContext(Context)
    const history = useHistory()
    const users = {
        "id": "6184948d16b1dd7ba58e0e63",
        "email": "priymak678@gmail.com",
        "firstname": "Дмитрий",
        "lastname": "Приймак",
        "phone": "+380500496028",
        "imageUrl": "",
        "birth_date": "07.03.2001",
        "gender": "Мужской",
        "isActivated": true,
        "role": "ADMIN"
    }

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center">
            <Row>
                <div className='d-flex justify-content-center mt-3 ' style={{
                    background: 'linear-gradient(90deg, #1b1c55,#2f2888)',
                    borderRadius: '90px 90px 90px 90px',
                    width: ' 300px'
                }}>
                    <Image height={300} width={200} src='https://svgsilh.com/svg/159847-9e9e9e.svg'/>
                </div>
            </Row>
            <Row>
                <ListGroup className="mt-3 justify-content-center" style={{
                    background: 'linear-gradient(90deg, #c94db4,#0f207a)',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    fontFamily: 'Montserrat Alternates',
                    fontSize: '20px',
                    borderRadius: '10px',
                    textAlign: 'center',
                }}>
                    <ListGroup.Item> {users.firstname} </ListGroup.Item>
                    <ListGroup.Item> {users.lastname} </ListGroup.Item>
                    <ListGroup.Item> {users.birth_date} </ListGroup.Item>
                    <ListGroup.Item> {users.gender} </ListGroup.Item>
                    <ListGroup.Item> {users.email} </ListGroup.Item>
                    <ListGroup.Item> {users.phone} </ListGroup.Item>
                    <ListGroup.Item> <BasketBar/> </ListGroup.Item>
                    {user.isAdmin ? <ListGroup.Item>
                            <div className="d-grid gap-2">
                                <Button variant="success"
                                        style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
                                onClick={() => history.push(ADMIN_ROUTE)}>
                                    Admin Panel
                                </Button>
                            </div>
                        </ListGroup.Item>
                        :
                        <ListGroup.Item>
                        </ListGroup.Item>}
                    <ListGroup.Item> <Button variant="success"
                                             style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
                                             onClick={() => history.push(LOGIN_ROUTE)}>
                        Log out
                    </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Row>
        </Container>
    );
};

export default Account;