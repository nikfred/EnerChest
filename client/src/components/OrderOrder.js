import React, {useEffect, useState} from 'react';
import {fetchAllOrders} from "../http/statsAPI";
import {Accordion, Pagination, Table} from "react-bootstrap";

const OrderOrder = () => {

    const [allOrders, setAllOrders] = useState([])

    useEffect(() => {
        fetchAllOrders().then(data => setAllOrders(data))
    }, [])


    return (
        <div>
            <Accordion defaultActiveKey="0">
                {allOrders.map(item =>
                    <Accordion.Item eventKey={item.order.id} key={item.order.id}>
                        <Accordion.Header>
                            {item.order.date?.substring(0, 20)}, Status:
                            {item.order.status === 'Ready' ?
                                <b style={{backgroundColor: 'yellow'}}>{item.order.status}</b>
                                :
                                item.order.status === 'Cancel' ?
                                    <b style={{backgroundColor: 'red'}}>{item.order.status}</b>
                                    :
                                    <b style={{backgroundColor: 'green'}}>{item.order.status}</b>
                            }
                        </Accordion.Header>
                        <Accordion.Body>
                            {item.order.firstname} cмокче хуяку за обидві щоки
                        </Accordion.Body>
                    </Accordion.Item>
                )}
            </Accordion>
        </div>

    );
};

export default OrderOrder;