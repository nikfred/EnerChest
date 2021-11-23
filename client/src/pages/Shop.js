import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import BrandBar from "../components/BrandBar";
import SizeBar from "../components/SizeBar";

const Shop = () => {
    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <BrandBar/>
                </Col>
                <Col md={9}>
                    <SizeBar />
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;