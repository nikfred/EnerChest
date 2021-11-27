import React, {useContext} from 'react';
import {Context} from "../index";
import {Card, ListGroup, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const SizeBar = observer(() => {
    const {product} = useContext(Context)
    return (
        <ListGroup className="mt-3" style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            {product.sizes.map(size =>
                <ListGroup.Item key={size.id}
                                active={size.id === product.selectedSize.id}
                                onClick={() => product.setSelectedSize(size)}
                                style={{
                                    fontFamily: 'Montserrat Alternates',
                                    backgroundColor: '#C4C4C4', textAlign: 'center',
                                    cursor: 'pointer'
                                }} className="align-self-auto">
                    {size.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default SizeBar;