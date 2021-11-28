import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import AddBrand from "../components/modals/addBrand";
import AddProduct from "../components/modals/addProduct";


const AdminPanel = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)

    return (
        <Container className="d-flex flex-column mt-3">
            <Button className= "mt-2" onClick={() => setProductVisible(true)}> <h1>Add product </h1>  </Button>
            <Button className= "mt-2"  onClick={() => setBrandVisible(true)}> <h1>Add brand </h1>  </Button>
            <AddBrand show={brandVisible}   onHide={() => setBrandVisible(false)}/>
            <AddProduct  show={productVisible} onHide={() => setProductVisible(false)}/>

        </Container>
    );
};

export default AdminPanel;