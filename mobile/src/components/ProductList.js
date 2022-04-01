import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ProductItem from "./ProductItem";

const ProductList = ({products}) => {
    return (
        <View>
            <FlatList
            columnWrapperStyle={{flex: 1, justifyContent: "space-around"}}
            numColumns={2}
            contentContainerStyle={{paddingBottom: 16, paddingHorizontal: 8}}
            data={products}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <ProductItem product={item}/>
            )}
            />
        </View>
    );
};

export default ProductList;