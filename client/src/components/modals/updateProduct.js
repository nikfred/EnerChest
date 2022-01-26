import React, {useEffect, useState} from 'react';
import {Button, Form,FormControl, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {fetchOneProduct, updateProduct} from "../../http/productAPI";
import {useParams} from "react-router-dom";

const UpdateProduct = observer(({show, onHide}) => {

    const {id} = useParams()
    console.log(id)

    const [product, setProduct] = useState([])

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)
    const [description, setDescription] = useState('')

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const upp = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('img', file)
        formData.append('description', description)
        updateProduct(id, formData).then(data => onHide())
        console.log(formData)
    }

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Name
                    <FormControl
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mb-3"
                        placeholder={product.name}
                    />
                    Prise
                    <FormControl
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="mb-3"
                        placeholder={product.price}
                        type="number"
                    />
                    Image
                    <FormControl
                        className="mb-3"
                        type="file"
                        placeholder='New image'
                        onChange={selectFile}
                    />
                    Description
                    <FormControl
                        className="mb-3"
                        placeholder={product.description}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={upp}>Update</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateProduct;