import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {BASKET_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {fetchOneProduct} from "../http/productAPI";
import {useParams} from "react-router-dom"
import {observer} from "mobx-react-lite";


const Product = observer(() => {
    const {user} = useContext(Context)
    const [product, setProduct] = useState(' ')

    const {id} = useParams()


    useEffect(()=> {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [])

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Card style={{
                        width: '150 px', cursor: 'pointer', backgroundColor: '#AB97C2',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                    }} className='mt-3'>
                        <div className="d-flex justify-content-center">
                            <Image height={600}
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
                    {user.isAuth ?
                        <div className="d-grid gap-2 mt-3">
                            <Button variant="success" style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
                                    to={BASKET_ROUTE}>Add to Basket</Button>
                        </div>
                        :
                        <div className="d-grid gap-2 mt-3">
                            <Button variant="success" style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
                                    to={LOGIN_ROUTE}>Buy now</Button>
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