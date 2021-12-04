import React, {useEffect, useState} from 'react';
import {Accordion, Button, Offcanvas} from "react-bootstrap";
import {fetchCart} from "../http/userAPI";

const customStyle = {
    fontFamily: 'Bebas Neue',
    color: 'green',
    fontSize: '28px'
}


function Example() {

    // const cartItem = {
    //     cart: {
    //         _id: "6184948e16b1dd7ba58e0e66",
    //         uid: "6184948d16b1dd7ba58e0e63",
    //         total: {
    //             $numberDecimal: "75"
    //         },
    //         __v: 0,
    //         quantity: 3
    //     },
    //     products: [
    //         {
    //             _id: "618db654bfb1df0799b562db",
    //             brand: "Hell",
    //             name: "Classic",
    //             price: {
    //                 "$numberDecimal": "25"
    //             },
    //             size: "500 ml",
    //             discount: {
    //                 "$numberDecimal": "0"
    //             },
    //             active: true,
    //             __v: 0,
    //             quantity: 3
    //         },
    //         {
    //             _id: "618db654bfb1df0hh799b562db",
    //             brand: "Non stop",
    //             name: "Jungle",
    //             price: {
    //                 "$numberDecimal": "22"
    //             },
    //             size: "500 ml",
    //             discount: {
    //                 "$numberDecimal": "0"
    //             },
    //             active: true,
    //             __v: 0,
    //             quantity: 1
    //         }
    //     ]
    // }

    const [show, setShow] = useState(false);
    const [cart, setCart] = useState({});
    const [cartItems, setCartItems] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        fetchCart().then(data => {
            let {quantity} = data.cart
            let total = data.cart.total.$numberDecimal
            setCart({quantity, total})
            setCartItems(data.products)
        })
        setShow(true);
    }

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
                            <div style={customStyle}> Total quantity:  {cart.quantity}</div>
                            <div style={customStyle}> Total price: {cart.total} UAH</div>

                            <Accordion defaultActiveKey="0">
                                {cartItems.map(product =>
                                <Accordion.Item eventKey={product._id}>
                                    <Accordion.Header>{product.brand}</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Name: {product.name} </p>
                                        <p>Size: {product.size}</p>
                                        <p>Price: {product.price} UAH</p>
                                        <p>Quantity: {product.quantity} </p>
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