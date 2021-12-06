import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Accordion, Button, Modal} from "react-bootstrap";
import {fetchOneProduct} from "../../http/productAPI";
import {canceledOrder, completionOrder, fetchOrder} from "../../http/userAPI";
import data from "bootstrap/js/src/dom/data";

const OrderHistory = observer(({show, onHide}) => {

    const [orders, setOrder] = useState([])

    useEffect(() => {
        fetchOrder().then(data => setOrder(data))
    }, [show])

    const complete = (id) => {
        completionOrder(id).then(data => onHide())
    }

    const canceled =(id) => {
        canceledOrder(id).then(data => onHide())
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
                    Order History
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion>
                    {orders.map(orders =>
                    <Accordion.Item eventKey={orders.order.id} >
                        <Accordion.Header>
                            {orders.order.date?.substring(0, 20)}, Status:
                            {orders.order.status === 'Ready' ?
                            <b style={{backgroundColor: 'yellow'}}>{orders.order.status}</b>
                                :
                                orders.order.status === 'Cancel' ?
                                    <b style={{backgroundColor: 'red'}}>{orders.order.status}</b>
                                :
                                    <b style={{backgroundColor: 'green'}}>{orders.order.status}</b>
                            }

                        </Accordion.Header>
                        <Accordion.Body>
                           <p>Quantity: {orders.order.quantity}</p>
                            <p>Total price: {orders.order.total} UAH</p>
                            <p>Address: {orders.order.address}</p>
                            <p>Status: {orders.order.status}</p>
                            {orders.order.status === 'Ready' ?
                                <div>
                                <Button variant="success" className='m-lg-2'
                                        onClick={() => complete(orders.order.id)}>Completion</Button>
                                <Button variant="danger" onClick={() => canceled(orders.order.id)}>Canceled</Button>
                                </div>
                                :
                                ' '
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                    )}
                </Accordion>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default OrderHistory;