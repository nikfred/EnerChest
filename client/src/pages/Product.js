import React, {useContext} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {BASKET_ROUTE, LOGIN_ROUTE} from "../utils/consts";

const Product = () => {
    const {user} = useContext(Context)
    const product = {
        id: 3,
        name: "jungle",
        brand: "Hell",
        size: "500 ml",
        price: 22,
        discount: 0,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci animi architecto blanditiis consectetur culpa dolorem doloremque dolores earum eligendi enim exercitationem expedita fugiat, id ipsa iste magnam minus, molestiae nobis nulla omnis perferendis perspiciatis placeat quaerat quas quia ratione sed tenetur vel velit voluptatem.",
        imageUrl: "http://20.52.25.145:5000/2fbb2c17-f7b6-40e1-b062-a0d318996ebb.jpg",
        active: true
    }

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
                                   src={product.imageUrl || "https://memegenerator.net/img/instances/41037355.jpg"}/>
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
};

export default Product;