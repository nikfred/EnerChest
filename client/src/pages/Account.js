import React, {useContext, useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import {NavLink} from "react-router-dom"
import {ADMIN_ROUTE} from "../utils/consts";
import {fetchUser, logout} from "../http/userAPI";
import {Context} from "../index";
import UpdateProfile from "../components/modals/updateProfile";
import OrderHistory from "../components/modals/orderHistory";

const Account = () => {
    const {user} = useContext(Context)
    const [profile, setProfile] = useState(' ')
    const [updateVisible, setUpdateVisible] = useState(false)
    const [orderVisible, setOrderVisible] = useState(false)



    useEffect(() => {
        fetchUser().then(data => {
            setProfile(data)
        })
    }, [])


    const logOut = () => {
        logout().then(r => console.log(r))
        user.setUser({})
        //setProfile({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
    }


    return (
        <>
            <Container>
                <Row>
                    <div className='d-flex justify-content-center mt-3 align-items-center '>
                        {<Image style={{
                            background: 'linear-gradient(90deg, #1b1c55,#2f2888)',
                            borderRadius: '90px 90px 90px 90px',
                            width: ' 300px'
                        }} height={200} width={200}
                                src={profile.imageUrl || 'https://svgsilh.com/svg/159847-9e9e9e.svg'}/>}
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
                        <ListGroup.Item> {profile.firstname} </ListGroup.Item>
                        <ListGroup.Item> {profile.lastname} </ListGroup.Item>
                        <ListGroup.Item> {profile.birth_date?.substring(0, 10)} </ListGroup.Item>
                        <ListGroup.Item> {profile.gender} </ListGroup.Item>
                        <ListGroup.Item> {profile.email} </ListGroup.Item>
                        <ListGroup.Item> {profile.phone} </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-grid gap-2">
                                <Button variant="success" style={{
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                    fontSize: '20px'
                                }}
                                        onClick={() => {
                                            setUpdateVisible(true)
                                        }}>
                                    Edit profile
                                </Button>
                                <UpdateProfile show={updateVisible} onHide={() => setUpdateVisible(false)}/>
                            </div>
                        </ListGroup.Item>
                        {user.isAdmin ? <ListGroup.Item>
                                <div className="d-grid gap-2">
                                    {/*<Button variant="success"*/}
                                    {/*        style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}*/}
                                    {/*onClick={() => history.push(ADMIN_ROUTE)}>*/}
                                    {/*    Admin Panel*/}
                                    {/*</Button>*/}
                                    <NavLink to={ADMIN_ROUTE} style={{
                                        fontFamily: 'Bebas Neue',
                                        textDecoration: 'none',
                                        backgroundColor: 'green',
                                        color: 'white',
                                        paddingLeft: '20px',
                                        paddingRight: '6px',
                                        fontSize: '28px'
                                    }}>Admin panel</NavLink>
                                </div>
                            </ListGroup.Item>
                            : <div className="d-grid gap-2">
                                <Button variant="success" style={{
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                    fontSize: '20px'
                                }}
                                        onClick={() => setOrderVisible(true)}>
                                    Order history
                                </Button>
                                <OrderHistory show={orderVisible} onHide={() => setOrderVisible(false)}/>
                            </div>
                        }
                        <ListGroup.Item>
                            <Button variant="success"
                                    style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
                                    onClick={() => {
                                        logOut()
                                        window.location.reload()
                                    }}>LogOut</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Row>
            </Container>
        </>
    );
};

export default Account;