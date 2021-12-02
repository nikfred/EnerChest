import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import AddProduct from "../components/modals/addProduct";
import AddToDispenser from "../components/modals/addToDispenser";


const AdminPanel = () => {
    const [productVisible, setProductVisible] = useState(false)
    const [toDispenserVisible, setToDispenserVisible] = useState(false)

    return (
        <Container className="d-flex flex-column mt-3">
            <Button className= "mt-2" onClick={() => setProductVisible(true)}> <h1>Add product </h1>  </Button>
            <AddProduct  show={productVisible} onHide={() => setProductVisible(false)}/>

            <Button className= "mt-2" onClick={() => setToDispenserVisible(true)}> <h1>Add Product to Dispenser</h1>  </Button>
            <AddToDispenser  show={toDispenserVisible} onHide={() => setToDispenserVisible(false)}/>
        </Container>
    );
};

export default AdminPanel;