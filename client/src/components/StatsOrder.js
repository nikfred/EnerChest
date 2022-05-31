import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {statsDispensers, statsOrder, statsProduct} from "../http/statsAPI";

const StatsOrder = () => {

    const [orderStats, setOrderStats] = useState({})

    useEffect(() => {
        statsOrder().then(data => setOrderStats(data))
    }, [])

    return (
        <div>
            <div style={{
                width: '100%',
                background: 'purple',
                fontFamily: 'Bebas Neue',
                fontSize: '20px',
                color: 'white'
            }} className='mt-2 align-items-center'>
                STATS
            </div>
            <Table striped bordered hover size='sm'>
                <tbody>
                <tr>
                    <th>Complete Total</th>
                    <th>{orderStats.completeTotal} UAH</th>
                </tr>

                <tr>
                    <th>Complete Count</th>
                    <th>{orderStats.completeCount}</th>
                </tr>
                <tr>
                    <th>Cancel Total</th>
                    <th>{orderStats.cancelTotal} UAH</th>
                </tr>
                <tr>
                    <th>Cancel Count</th>
                    <th>{orderStats.cancelCount}</th>
                </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default StatsOrder;