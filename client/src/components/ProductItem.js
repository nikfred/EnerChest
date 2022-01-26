import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useHistory} from "react-router-dom"
import {PRODUCT_ROUTE} from "../utils/consts";

const ProductItem = ({product}) => {
    const history = useHistory()

    return (
        <Col md={3} onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}>
            <Card style={{
                width: '150 px', cursor: 'pointer', backgroundColor: '#656565',
                boxShadow: '0px 3px 15px 1px rgba(0, 0, 0, 0.92) inset'
            }} className='mt-3'>
                <div className="d-flex justify-content-center">
                    <Image height={150}  className="mt-3"
                           src={product.imageUrl || "https://storage.googleapis.com/multi-static-content/previews/artage-io-thumb-38074b7b27e6dbc574938e81868f435d.png"}/>
                </div>
                <div style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                    <div className='d-flex justify-content-center' style={{
                        color: 'green', backgroundColor: '#C4C4C4', fontSize: '18px',
                        fontFamily: 'Montserrat Alternates', borderRadius: '79px 79px 0px 0px / 42px 32px 0px 0px'
                    }}>{product.brand} {product.name}</div>
                    <div className="d-flex justify-content-between"
                         style={{
                             backgroundColor: '#C4C4C4',
                             color: '#536872',
                             fontSize: '20px',
                             fontFamily: 'Bebas Neue'
                         }}>
                        <div>{product.size}</div>
                        <div>{product.price} UAH</div>
                    </div>
                </div>
            </Card>
        </Col>
    );
};

export default ProductItem;