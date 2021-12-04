import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import BrandBar from "../components/BrandBar";
import SizeBar from "../components/SizeBar";
import ProductList from "../components/ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {connectProducts, fetchBrands, fetchProduct, fetchSize} from "../http/productAPI";
import Pages from "../components/Pages";
import Button from "react-bootstrap/Button";


const Shop = observer(() => {
    const {product} = useContext(Context)


    useEffect(() => {
        fetchBrands().then(data => product.setBrands(data))
        fetchSize().then(data => product.setSizes(data))
        fetchProduct(null, null, 1, 3).then(data => {
            product.setProducts(data.products)
            product.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchProduct(product.selectedBrand.brand, product.selectedSize.value, product.page, product.limit).then(data => {
            product.setProducts(data.products)
            product.setTotalCount(data.count)
        })

    }, [product.page, product.selectedBrand, product.selectedSize])


    return (
        <Container>
            <Row className="mt-3">
                <Col md={2}>
                    <BrandBar/>
                    <SizeBar/>
                    <Button variant="success"
                            className='mt-3'
                            style={{
                                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                width: '100%'
                            }}
                            onClick={() => {
                                product.setSelectedSize('')
                                product.setSelectedBrand('')
                            }}>remove selection</Button>
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