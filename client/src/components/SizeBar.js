import React, {useContext} from 'react';
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const SizeBar = observer(() => {
    const {product} = useContext(Context)
    return (
        <Row className="d-flex mt-3">
            {product.sizes.map(size =>
                <Card key={size.id}
                      className="mt-2"
                      onClick={() => product.setSelectedSize(size)}
                      border={size.id === product.selectedSize.id ? 'danger' : 'light'}
                      style={{
                          fontFamily: 'Montserrat Alternates',
                          backgroundColor: '#C4C4C4',
                          cursor: 'pointer'
                      }}>
                    {size.name}
                </Card>
            )}
        </Row>
    );
});

export default SizeBar;