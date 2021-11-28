import React from 'react';
import {Button, Form, FormControl, Modal} from "react-bootstrap";

const AddBrand = ({show, onHide}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl
                        placeholder="Enter name new brand..."
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

export default AddBrand;