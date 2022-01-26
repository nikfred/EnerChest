import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import {Offcanvas} from "react-bootstrap";
import {BsPersonFill} from "react-icons/bs"
import Account from "../pages/Account";

function AccountBar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                <BsPersonFill/> Account
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement={'end'} className='bg-dark'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{color: '#2D2781'}}>Account</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                   <Account/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default AccountBar;