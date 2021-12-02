import React, {useState} from 'react';
import {Accordion, Button, Offcanvas} from "react-bootstrap";

const castomStyle = {
    fontFamily: 'Bebas Neue',
    color: 'green',
    fontSize: '28px'
}


function Example() {

    const cartItem = {
        cart: {
            _id: "6184948e16b1dd7ba58e0e66",
            uid: "6184948d16b1dd7ba58e0e63",
            total: {
                $numberDecimal: "75"
            },
            __v: 0,
            quantity: 3
        },
        products: [
            {
                _id: "618db654bfb1df0799b562db",
                brand: "Hell",
                name: "Classic",
                price: {
                    "$numberDecimal": "25"
                },
                size: "500 ml",
                discount: {
                    "$numberDecimal": "0"
                },
                active: true,
                __v: 0,
                quantity: 3
            },
            {
                _id: "618db654bfb1df0hh799b562db",
                brand: "Non stop",
                name: "Jungle",
                price: {
                    "$numberDecimal": "22"
                },
                size: "500 ml",
                discount: {
                    "$numberDecimal": "0"
                },
                active: true,
                __v: 0,
                quantity: 1
            }
        ]
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Basket
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement={"start"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Basket</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                            <div style={castomStyle}> Total quantity:  {cartItem.cart.quantity}</div>
                            <div style={castomStyle}> Total price: {cartItem.cart.total.$numberDecimal} UAH</div>
                            <Accordion defaultActiveKey="0">
                                {cartItem.products.map(products =>
                                <Accordion.Item eventKey={products._id}>
                                    <Accordion.Header>{products.brand}</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Name: {products.name} </p>
                                        <p>Size: {products.size}</p>
                                        <p>Price: {products.price.$numberDecimal} UAH</p>
                                        <p>Quantity: {products.quantity} </p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                )}
                            </Accordion>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


export default Example;