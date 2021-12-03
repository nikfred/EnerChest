import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import BrandBar from "../components/BrandBar";
import SizeBar from "../components/SizeBar";
import ProductList from "../components/ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {connectProduct, fetchBrands, fetchSize} from "../http/productAPI";
import Pages from "../components/Pages";


const Shop = observer(() => {
    const {product} = useContext(Context)


    useEffect(() => {
        fetchBrands().then(data => product.setBrands(data))
        fetchSize().then(data => product.setSizes(data))
        connectProduct(null, null, 1, 3).then(data => {
            product.setProducts(data)
            product.setTotalCount(data.length)
        })
    }, [])


    return (
        <Container>
            <Row className="mt-3">
                <Col md={2}>
                    <BrandBar/>
                    <SizeBar/>
                </Col>
                <Col md={10}>
                    <ProductList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;