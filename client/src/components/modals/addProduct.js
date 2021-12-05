import React, {useContext, useState} from 'react';
import {Button, Form, FormCheck, FormControl, Modal} from "react-bootstrap";
import {createProducts} from "../../http/productAPI";
import {observer} from "mobx-react-lite";


const AddProduct = observer(({show, onHide}) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState(' ')
    const [size, setSize] = useState(' ')
    const [newBrand, setNewBrand] = useState( false)
    const [newSize, setNewSize] = useState( false)


    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const add = () =>{
        console.log('newBrand = ' + newBrand)
        console.log('newSize = ' + newSize)
        const formData = new FormData()
        formData.append('brand', brand)
        formData.append('size', size)
        formData.append('newBrandFlag',newBrand.toString())
        formData.append('newSizeFlag',newSize.toString())
        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('img', file)
        createProducts(formData).then(data => onHide())
    }


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
                    <FormControl
                        className="mt-3"
                        placeholder="Enter brand..."
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                    />
                       <FormCheck onClick={e => setNewBrand(!newBrand)} label='New brand' />
                    <FormControl
                        className="mt-3"
                        placeholder="Enter size..."
                        value={size}
                        onChange={e => setSize(e.target.value)}
                    />
                        <FormCheck onClick={e => setNewSize(!newSize)} label='New size' />
                    <FormControl
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Enter name product..."
                    />
                    <FormControl
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="mt-3"
                        placeholder="Enter price  product..."
                        type="number"
                    />
                    <FormControl
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <FormControl
                        className="mt-3"
                        placeholder="Enter discription product..."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={add}>Add</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddProduct;