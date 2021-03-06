import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Form, FormControl, Modal} from "react-bootstrap";
import {addToDispenser, connectProducts, fetchDispensers} from "../../http/productAPI";
import {observer} from "mobx-react-lite";


const AddToDispenser = observer(({show, onHide}) => {

    const [dispenser, setDispenser] = useState({})
    const [dispensers, setDispensers] = useState([])
    const [product, setProduct] = useState(null)
    const [products, setProducts] = useState([])
    const [quantityAdd, setQuantityAdd] = useState('')

    useEffect(() => {
        connectProducts().then(data => setProducts(data))
        fetchDispensers().then(data => setDispensers(data))
    }, [])

    const add = () => {
        const body = {
            dispenser_id: dispenser._id,
            product_id: product.id,
            quantityAdd
        }
        addToDispenser(body).then(data => alert("Complete"))
        clear()
    }

    const clear = () => {
        setProduct(null)
        setDispenser({})
        setQuantityAdd('')
    }


    return (
        <Form>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>{!product ? "Select product..." : `${product.brand} ${product.name} ${product.size}`}</Dropdown.Toggle>
                <Dropdown.Menu style={{overflowY: 'scroll', maxHeight: '180px'}}>
                    {products.map(item =>
                        <Dropdown.Item
                            onClick={() => setProduct(item)}
                            key={item.id}
                        >
                            {item.brand} {item.name}, {item.size} {item.price} UAH
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>{dispenser.address || "Select dispenser..."}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {dispensers.map(item =>
                        <Dropdown.Item
                            onClick={() => setDispenser(item)}
                            key={item._id}
                        >
                            {item.address}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            <FormControl
                value={quantityAdd}
                onChange={e => setQuantityAdd(e.target.value)}
                className="mt-3"
                placeholder="Enter quantity product..."
                type="number"
            />
            <div className="d-flex justify-content-between  mt-3" style={{fontSize:'40px'}}>
                <Button variant="success" onClick={add}>Add</Button>
                <Button variant="danger" onClick={clear}>Clear</Button>
            </div>
        </Form>
    );
});

export default AddToDispenser;