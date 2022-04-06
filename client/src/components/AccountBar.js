import React from 'react';
import {Offcanvas} from "react-bootstrap";
import {BsPersonFill} from "react-icons/bs"
import Account from "../pages/Account";
import {observer} from "mobx-react-lite";

const AccountBar = observer(({show, onHide}) => {
    return (
        <>
            <Offcanvas show={show} onHide={onHide} placement={'end'} className='bg-dark'>
                <Offcanvas.Header closeButton style={{ color: 'green'}}>
                    <Offcanvas.Title><BsPersonFill/> ACCOUNT</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                   <Account/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
});

export default AccountBar;