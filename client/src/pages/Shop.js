import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import BrandBar from "../components/BrandBar";
import SizeBar from "../components/SizeBar";
import ProductList from "../components/ProductList";

const Shop = () => {
    return (
        <Container>
            <Row className="mt-3">
                <Col md={2}>
                    <BrandBar/>
                    <SizeBar/>
                </Col>
                <Col md={10}>
                    <ProductList/>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;