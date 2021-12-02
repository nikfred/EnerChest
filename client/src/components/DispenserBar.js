import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {fetchDispensers, fetchOneProduct} from "../http/productAPI";

const BrandBar = observer(() => {
    const {product} = useContext(Context)
    const [dispensers, setDispensers] = useState([ ])



    useEffect(()=> {
        fetchDispensers(id).then(data => setDispensers(data))
    }, [])

    return (
        <ListGroup className="mt-3" style={{boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            {dispensers.map(dispenser =>
                <ListGroup.Item key={dispenser.dispenser_id}
                                active={dispenser.dispenser_id === product.selectedDispenser.dispenser_id}
                                onClick={() => product.setSelectedDispenser(dispenser)}
                                style={{
                                    fontFamily: 'Montserrat Alternates',
                                    fontSize: '30px',
                                    backgroundColor: '#C4C4C4', textAlign: 'center',
                                    cursor: 'pointer'
                                }} className="align-self-auto">
                    <p>{dispenser.address}</p>
                    <b style={{color: 'green'}}>{dispenser.quantityFree}</b>/
                    <b style={{color: 'grey'}}>{dispenser.quantityAll}</b>
                </ListGroup.Item>)}
        </ListGroup>
    );
});

export default BrandBar;