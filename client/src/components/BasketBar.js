import React, {useEffect, useState} from 'react';
import {Accordion, Button, Offcanvas} from "react-bootstrap";
import {deleteProductFromCard, fetchCart} from "../http/userAPI";


const customStyle = {
    fontFamily: 'Bebas Neue',
    color: 'green',
    fontSize: '28px'
}

const BasketBar = () => {

    const [show, setShow] = useState(false);
    const [cart, setCart] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [removeItem, setRemoveItem] = useState([]);

    let tmp;

    useEffect(()=>{
        fetchCart().then(data => {
            let {quantity} = data.cart
            let total = data.cart.total.$numberDecimal
            setCart({quantity, total})
            setCartItems(data.products)
            console.log(cartItems)
        })
    }, [show, removeItem, cart.quantity])

    const handleClose = () => setShow(false);
    const handleShow = () => {

        setShow(true);}

    const remove = () => {
        console.log(cartItems)
        console.log(removeItem)
        console.log(`tmp = `)
        console.log(tmp)
        deleteProductFromCard(tmp.id).then()
    }

    const setItem = () => {
        console.log(removeItem)
        remove()
        handleClose()
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
                    <div style={customStyle}> Total quantity: {cart.quantity}</div>
                    <div style={customStyle}> Total price: {cart.total} UAH</div>

                    <Accordion >
                        {cartItems.map(product =>
                            <Accordion.Item eventKey={product.id}>
                                <Accordion.Header>{product.brand}</Accordion.Header>
                                <Accordion.Body>
                                    <p>Name: {product.name} </p>
                                    <p>Size: {product.size}</p>
                                    <p>Price: {product.price} UAH</p>
                                    <p>Quantity: {product.quantity} </p>
                                    <p><Button variant='danger' onClick={() => {
                                        setRemoveItem(product)
                                        tmp = product
                                        setItem()
                                    }}>Delete</Button></p>
                                </Accordion.Body>
                            </Accordion.Item>
                        )}
                    </Accordion>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};


export default BasketBar;