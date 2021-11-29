import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import BrandBar from "../components/BrandBar";
import SizeBar from "../components/SizeBar";
import ProductList from "../components/ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchProducts, fetchSize} from "../http/productAPI";


const Shop = observer(() => {
    const {product} = useContext(Context)

    useEffect(()=> {
        fetchBrands().then(data => product.setBrands(data))
        fetchSize().then(data => product.setSizes(data))
        fetchProducts().then(data => product.setProducts(data))
    })


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
});

export default Shop;