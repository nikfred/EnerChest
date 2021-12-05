import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Dropdown, DropdownButton, Image, ListGroup, Row} from "react-bootstrap";
import {Context} from "../index";
import {BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {fetchDispensersWithProduct, fetchOneProduct} from "../http/productAPI";
import {addToCart, fetchCart} from "../http/userAPI";
import {useHistory, useParams} from "react-router-dom"
import {observer} from "mobx-react-lite";


const Product = observer(() => {
    const {user} = useContext(Context)
    const [product, setProduct] = useState(' ')
    const [dispensers, setDispensers] = useState([])
    const [selectedDispenser, setSelectedDispenser] = useState({})
    const [quantity, setQuantity] = useState('')

    const {id} = useParams()

    const history = useHistory()

    const buy = () => {
        if (!selectedDispenser.dispenser_id) {
            alert("No dispenser selected")
            return
        }
        const cartItem = {
            product_id: id,
            dispenser_id: selectedDispenser.dispenser_id,
            quantity: quantity || 1
        }
        addToCart(cartItem).then(data => console.log("Product added to cart"))
    }


    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
        fetchDispensersWithProduct(id).then(data => setDispensers(data))
        fetchCart().then()
    }, [])

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Card style={{
                        height: '400px', cursor: 'pointer', backgroundColor: '#AB97C2',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                    }} className='mt-3'>
                        <div className="d-flex justify-content-center">
                            <Image style={{height: '350px'}} className="mt-2"
                                   src={product.imageUrl || "https://storage.googleapis.com/multi-static-content/previews/artage-io-thumb-38074b7b27e6dbc574938e81868f435d.png"}/>
                        </div>
                    </Card>
                </Col>
                <Col md={4} style={{
                    fontSize: '34px',
                    fontFamily: 'Montserrat Alternates',
                    color: '#508852'
                }}>
                    <div className="d-flex justify-content-center mt-3">
                        {product.brand} {product.name}, {product.size}
                    </div>
                    <div className="d-flex justify-content-center mt-3" style={{
                        color: '#39C829'
                    }}>
                        {product.price} UAH
                    </div>

                    {dispensers.length !== 0 ?
                        <ListGroup className="mt-3" style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                            {dispensers.map(dispenser =>
                                <ListGroup.Item key={dispenser.dispenser_id}
                                                active={dispenser.dispenser_id === selectedDispenser.dispenser_id}
                                                onClick={() => setSelectedDispenser(dispenser)}
                                                style={{
                                                    fontFamily: 'Montserrat Alternates',
                                                    fontSize: '30px',
                                                    backgroundColor: '#C4C4C4', textAlign: 'center',
                                                    cursor: 'pointer'
                                                }} className="align-self-auto">
                                    <p>{dispenser.address}</p>
                                    <b style={{color: 'green'}}>{dispenser.quantityFree}</b>/
                                    <b style={{color: 'grey'}}>{dispenser.quantityAll}</b>
                                </ListGroup.Item>)}
                            <div>
                                {user.isAuth ?
                                    <div className="d-grid gap-2 mt-3">
                                        <Button variant="success" style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
                                                // to={BASKET_ROUTE}>Add to Basket</Button>
                                                onClick={() => {
                                                    buy()
                                                    history.push(SHOP_ROUTE)
                                                }}>Add to Basket</Button>
                                    </div>
                                    :
                                    <div className="d-grid gap-2 mt-3">
                                        <Button variant="success" style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
                                                onClick={() => history.push(LOGIN_ROUTE)}>Buy now</Button>
                                    </div>
                                }
                            </div>
                        </ListGroup>
                        :
                        <div className="d-grid gap-2 mt-3">
                            Not available
                        </div>

                    }

                </Col>
                <Col md={4}>
                    <Card className="mt-3" style={{
                        backgroundColor: '#C4C4C4',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', fontFamily: 'Open Sans Condensed'
                    }}>
                        <h1>Description: </h1>
                        <h2>{product.description}</h2>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
});

export default Product;