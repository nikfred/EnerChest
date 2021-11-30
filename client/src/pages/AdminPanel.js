import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import AddProduct from "../components/modals/addProduct";


const AdminPanel = () => {
    const [productVisible, setProductVisible] = useState(false)

    return (
        <Container className="d-flex flex-column mt-3">
            <Button className= "mt-2" onClick={() => setProductVisible(true)}> <h1>Add product </h1>  </Button>
            <AddProduct  show={productVisible} onHide={() => setProductVisible(false)}/>

        </Container>
    );
};

export default AdminPanel;