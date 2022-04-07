import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ProductList from "../components/ProductList";

const Catalog = ({products}) => {

    return (
        <View style={styles.container}>
            <ProductList products={products}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        color: '#C4C4C4'
    }
});

export default Catalog;