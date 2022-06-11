import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fetchOrder} from "../http/userAPI";

const Orders = () => {
    useEffect(()=>{
        fetchOrder().then(response=>{
            console.log(response)
        })
    },[])
    return (
        <View style={styles.container}>
            <Text style={styles.content}>Orders</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        color: '#C4C4C4'
    }
});

export default Orders;