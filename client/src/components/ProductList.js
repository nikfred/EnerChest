import React, {useContext} from 'react';
import {Context} from "../index";
import {Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import ProductItem from "./ProductItem";

const ProductList = observer (() => {
    const {product} = useContext(Context)
    return (
        <Row className="d-flex">
            {product.products.map(product =>
            <ProductItem key={product.id} product={product}/>
            )}
        </Row>
    );
});

export default ProductList;