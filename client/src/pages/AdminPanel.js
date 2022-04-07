import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import AddProduct from "../components/modals/addProduct";
import AddToDispenser from "../components/modals/addToDispenser";
import Monitoring from "../components/Monitoring";
import AllOrder from "../components/AllOrder";


const AdminPanel = () => {
    const [page, setPage] = useState('')


    return (
        <Container>
            <Row>
                <Col md={2}>
                    <Container className="d-flex flex-column mt-3">
                        <Button className="mt-2" onClick={() => setPage('Add Product')}>
                            Add product</Button>
                        <Button className="mt-2" onClick={() => setPage('Add To Dispenser')}>
                            Add Product to Dispenser</Button>
                        <Button className="mt-2" onClick={() => setPage('Monitoring')}>
                            Monitoring</Button>
                        <Button className="mt-2" onClick={() => setPage('All Order')}>
                            All Order</Button>
                    </Container>
                </Col>
                <Col md={10} className="d-flex justify-content-center mt-4">
                    <Container>
                    <div className="mt-2 align-items-center "
                         style={{ height: '110 %', background: "#C4C4C4", borderRadius: '10px', padding:" 10px 10px 10px 10px"}}>
                        <div style={{width:"100 %", background: 'purple', fontSize:'30px', color:"white", textAlign:"center", fontFamily: 'Bebas Neue'}}>
                            {page}
                        </div>
                        {page === 'Add Product' ?
                            <AddProduct/>
                            : page === 'Add To Dispenser' ?
                                <AddToDispenser/>
                                : page === 'All Order' ?
                                    <AllOrder/>
                                    : page === 'Monitoring' ?
                                        <Monitoring/>
                                        : 'SELECT PARAM'
                        }
                    </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminPanel;