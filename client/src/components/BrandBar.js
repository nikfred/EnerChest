import React, {useContext} from 'react';
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const BrandBar = observer(() => {
    const {product} = useContext(Context)
    return (
        <ListGroup className="mt-3" style={{boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            {product.brands.map(brand =>
                <ListGroup.Item key={brand._id}
                                active={brand._id === product.selectedBrand._id}
                                onClick={() => product.setSelectedBrand(brand)}
                                style={{
                                    fontFamily: 'Montserrat Alternates',
                                    backgroundColor: '#C4C4C4', textAlign: 'center',
                                    cursor: 'pointer'
                                }} className="align-self-auto">
                    {brand.brand}
                </ListGroup.Item>)}
        </ListGroup>
    );
});

export default BrandBar;