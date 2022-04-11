import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ProductList from "../components/ProductList";
import {useSelector} from "react-redux";

const Catalog = () => {
    const products = useSelector(state => state.product.products)

    return (
        <View style={styles.container}>
            {products.length > 0
                ?
                <ProductList products={products}/>
                :
                <View/>
            }
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