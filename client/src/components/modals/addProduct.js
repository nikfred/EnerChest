import React, {useContext} from 'react';
import {Button, Dropdown, Form, FormControl, Modal} from "react-bootstrap";
import {Context} from "../../index";

const AddProduct = ({show, onHide}) => {
    const {product} = useContext(Context)

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle>Select product brand</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.brands.map(brands =>
                                <Dropdown.Item key={brands.id}> {brands.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle>Select product size</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.sizes.map(sizes =>
                                <Dropdown.Item key={sizes.id}> {sizes.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <FormControl
                        className="mt-3"
                        placeholder="Enter name product..."
                    />
                    <FormControl
                        className="mt-3"
                        placeholder="Enter price  product..."
                        type="number"
                    />
                    <FormControl
                        className="mt-3"
                        type="file"
                    />
                    <FormControl
                        className="mt-3"
                        placeholder="Enter description product..."
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={onHide}>Add</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddProduct;