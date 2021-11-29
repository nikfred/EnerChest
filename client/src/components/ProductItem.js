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
                           src={product.imageUrl || "https://storage.googleapis.com/multi-static-content/previews/artage-io-thumb-38074b7b27e6dbc574938e81868f435d.png"}/>
                </div>
                <div style={{
                    color: 'green', backgroundColor: '#C49FC4', fontSize: '18px',
                    fontFamily: 'Montserrat Alternates'
                }}>{product.brand} {product.name}</div>
                <div className="d-flex justify-content-between"
                     style={{backgroundColor: '#C49FC4', color: '#536872', fontSize: '20px', fontFamily: 'Bebas Neue'}}>
                    <div>{product.size}</div>
                    <div>{product.price} UAH</div>
                </div>

            </Card>
        </Col>
    );
};

export default ProductItem;