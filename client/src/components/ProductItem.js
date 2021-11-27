import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useHistory} from "react-router-dom"
import {PRODUCT_ROUTE} from "../utils/consts";

const ProductItem = ({product}) => {
    const history = useHistory()
    console.log(history)

    return (
        <Col md={3} onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}>
            <Card style={{
                width: '150 px', cursor: 'pointer', backgroundColor: '#C4C4C4',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
            }} className='mt-3'>
                <div className="d-flex justify-content-center">
                    <Image height={150} width={75}
                           src={product.imageUrl || "https://memegenerator.net/img/instances/41037355.jpg"}/>
                </div>
                <div className="d-flex justify-content-between" style={{
                    backgroundColor: '#C49FC4', fontSize: '18px',
                    fontFamily: 'Montserrat Alternates'
                }}>
                    <div style={{color: 'green'}}>{product.name}</div>
                    <div style={{color: '#536872'}}>{product.price} UAH</div>
                </div>
                <div style={{backgroundColor: '#C49FC4'}}>{product.brand}, {product.size}</div>
            </Card>
        </Col>
    );
};

export default ProductItem;