import React,{useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {COLORS} from "../utils/consts";
import ProductItem from "../components/ProductItem";
import {fetchProduct} from "../http/productAPI";
import {addProductsAction} from "../store/productReducer";
import {useIsFocused} from "@react-navigation/native";

const Catalog = ({ navigation: {navigate}}) => {
    const products1 = useSelector(state => state.product.products.filter((_, index) => index % 2 !== 0))
    const products2 = useSelector(state => state.product.products.filter((_, index) => index % 2 === 0))
    // const dispenser = useSelector(state => state.product.dispenser)
    const dispatch = useDispatch()
    const {actual, dispenser, selectedBrands, selectedSizes} = useSelector(state => state.product)
    const isFocused=useIsFocused()
    useEffect(() => {
        // if (!actual) {
        if (isFocused) {
            fetchProduct(selectedBrands, selectedSizes, dispenser?._id, 1, 16).then(data => {
                dispatch(addProductsAction(data.products))
                console.log('dispenser', dispenser)
            })
        }
    }, [actual, selectedBrands, selectedSizes,isFocused])


    return (
        <ScrollView style={styles.container}>

            <View style={styles.list}>
                <View style={styles.colum}>
                    <Pressable style={styles.item} onPress={() => navigate('Maps')}>
                        <Text style={styles.text}>{dispenser ? dispenser.address : 'Select dispenser'}</Text>
                    </Pressable>
                    {products1.map((product) =>
                        <ProductItem product={product} key={product.id} navigate={navigate}/>
                    )}
                </View>

                <View style={styles.colum}>
                    {products2.map((product) =>
                        <ProductItem product={product} key={product.id} navigate={navigate}/>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.darkgray,
    },
    list: {
        display: "flex",
        flexDirection: "row",
        paddingBottom: 16,
        paddingHorizontal: 8,
    },
    colum: {
        width: '50%',
        alignItems: "center"
    },
    item: {
        width: '90%',
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 16,
        paddingVertical: 4,
        backgroundColor: COLORS.gray,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.green,

    }
});

export default Catalog;