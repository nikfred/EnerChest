import React, {useContext} from 'react';
import {Context} from "../index";
import { ListGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const SizeBar = observer(() => {
    const {product} = useContext(Context)

    return (
        <ListGroup className="mt-3" style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            {product.sizes.map(size =>
                <ListGroup.Item key={size._id}
                                active={size._id === product.selectedSize._id}
                                onClick={() => product.setSelectedSize(size)}
                                style={{
                                    fontFamily: 'Montserrat Alternates',
                                    backgroundColor: '#C4C4C4', textAlign: 'center',
                                    cursor: 'pointer'
                                }} className="align-self-auto">
                    {size.value}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default SizeBar;