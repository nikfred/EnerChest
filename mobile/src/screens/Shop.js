import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {fetchBrands, fetchProduct, fetchSize} from "../http/productAPI";
import ProductList from "../components/ProductList";

const Shop = () => {

    const [brands, setBrands] = useState([])
    const [sizes, setSizes] = useState([])
    const [products, setProducts] = useState([{id: 1, brand: 'Non Stop'}])
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {
        fetchBrands().then(data => setBrands(data)).catch(e => console.log(e))
        fetchSize().then(data => setSizes(data)).catch(e => console.log(e))
        fetchProduct(null, null, 1, 12).then(data => {
            setProducts(data.products)
            setTotalCount(data.count)
        })
    }, [])

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

export default Shop;