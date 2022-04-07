import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row, Table} from "react-bootstrap";
import {statsDispensers, statsOrder, statsProduct} from "../http/statsAPI";
import data from "bootstrap/js/src/dom/data";
import ProductItem from "./ProductItem";
import Image from "react-bootstrap/Image";
import {PRODUCT_ROUTE} from "../utils/consts";

const Monitoring = () => {

    const [orderStats, setOrderStats] = useState({})
    const [dispenserStats, setDispenserStats] = useState([])
    const [productStats, setProductStats] = useState([])

    useEffect(() => {
        statsOrder().then(data => setOrderStats(data))
        statsDispensers().then(data => setDispenserStats(data))
        statsProduct().then(data => setProductStats(data))
    }, [])


    return (
        <div>
            <Container>
                <Row className='d-flex justify-content-between'>
                    <Col md={4} style={{background:'#C4C4C4'}}>
                        <div style={{
                            width: '100%',
                            background: 'purple',
                            fontFamily: 'Bebas Neue',
                            fontSize: '20px',
                            color: 'white'
                        }} className='mt-2 align-items-center'>
                            STATS
                        </div>
                        <Table striped bordered hover size='sm'>
                            <tbody>
                            <tr>
                                <th>Complete Total</th>
                                <th>{orderStats.completeTotal} UAH</th>
                            </tr>

                            <tr>
                                <th>Complete Count</th>
                                <th>{orderStats.completeCount}</th>
                            </tr>
                            <tr>
                                <th>Cancel Total</th>
                                <th>{orderStats.cancelTotal} UAH</th>
                            </tr>
                            <tr>
                                <th>Cancel Count</th>
                                <th>{orderStats.cancelCount}</th>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col md={7} style={{background:'#C4C4C4'}}>
                        <div style={{
                            width: '100%',
                            background: 'purple',
                            fontFamily: 'Bebas Neue',
                            fontSize: '20px',
                            color: 'white'
                        }} className='mt-2 align-items-center'>
                            DISPENSER
                        </div>
                        <div  style={{overflowY: 'scroll', maxHeight: '400px'}}>
                        <Table striped bordered hover size='sm'>
                            <tbody >
                            {dispenserStats.map(item =>
                                <tr key={item._id}>
                                    <th>{item.address}</th>
                                    <th>{item.quantity}</th>
                                </tr>)

                            }
                            </tbody>
                        </Table>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <div style={{
                        width: '100%',
                        background: 'purple',
                        fontFamily: 'Bebas Neue',
                        fontSize: '20px',
                        color: 'white'
                    }} className='mt-2 align-items-center'>
                        PRODUCT
                    </div>
                    <Col  style={{overflowX: 'scroll', maxWidth: '1000px', background: "#818181"}}>
                            {productStats.map(item =>
                                <th className='p-3'>
                                    <Card style={{
                                        width: '250px', cursor: 'pointer', backgroundColor: '#656565',
                                        boxShadow: '0px 3px 15px 1px rgba(0, 0, 0, 0.92) inset'
                                    }} className='mt-3'>
                                        <div className="d-flex justify-content-center">
                                            <Image height={100} className="mt-3"
                                                   src={item.imageUrl || "https://storage.googleapis.com/multi-static-content/previews/artage-io-thumb-38074b7b27e6dbc574938e81868f435d.png"}/>
                                        </div>
                                        <div style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                                            <div className='d-flex justify-content-center' style={{
                                                color: 'green',
                                                backgroundColor: '#C4C4C4',
                                                fontSize: '18px',
                                                fontFamily: 'Montserrat Alternates',
                                                borderRadius: '79px 79px 0px 0px / 42px 32px 0px 0px'
                                            }}>{item.brand} {item.name}</div>
                                            <div className="d-flex justify-content-between"
                                                 style={{
                                                     backgroundColor: '#C4C4C4',
                                                     color: '#536872',
                                                     fontSize: '20px',
                                                     fontFamily: 'Bebas Neue'
                                                 }}>
                                                <div>{item.size}</div>
                                                <div style={{color: 'red', fontSize: '30px'}}>{item.quantity}</div>
                                                <div>{item.price} UAH</div>
                                            </div>
                                        </div>
                                    </Card>
                                </th>
                            )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Monitoring;