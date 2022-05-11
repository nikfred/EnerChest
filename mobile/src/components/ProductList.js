import React from 'react';
import {FlatList} from 'react-native';
import ProductItem from "./ProductItem";

const ProductList = ({products}) => {
    return (
        <FlatList
            columnWrapperStyle={{flex: 1, justifyContent: "space-around"}}
            numColumns={2}
            contentContainerStyle={{paddingBottom: 16, paddingHorizontal: 8}}
            data={products}
            keyExtractor={item => item.id}
            renderItem={({item, index}) =>
                <ProductItem product={item} index={index}/>
            }
        />
    );
};

export default ProductList;