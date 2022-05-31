import React, {useEffect, useState} from 'react';
import {Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {COLORS} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import ProductModal from "./ProductModal";
import {setDispensersInfoAction, setModalVisibleAction, setProductAction} from "../store/productReducer";

const ProductItem = ({product, navigate}) => {

    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)


    const onHide = () => {
        setModalVisible(false)
        dispatch(setProductAction({}))
        dispatch(setDispensersInfoAction([]))
    }

    const onPress = () => {
        setModalVisible(true)
        dispatch(setProductAction(product))
    }

    return (
        <Pressable style={styles.item} onPress={onPress}>
            <Image source={{uri: product.imageUrl}} style={styles.image}/>
            <Text style={styles.name}>{product.brand} {product.name}</Text>

            <View style={styles.infoCon}>
                <Text style={styles.info}>{product.size} </Text>
                <Text style={styles.info}>{product.price} UAH</Text>
            </View>

            {product.quantityFree &&
                <Text>
                    {product.quantityFree}/{product.quantityAll}
                </Text>
            }

            <ProductModal navigate={navigate} show={modalVisible} onHide={onHide}/>

        </Pressable>
    );
};

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        // marginHorizontal: 'auto',
        marginVertical: 10,
        padding: 8,
        borderRadius: 10,
        backgroundColor: COLORS.gray
    },
    name: {
        color: COLORS.green,
        fontWeight: "bold",
        fontSize: 18,
    },
    infoCon: {
        display: 'flex',
        width: '85%',
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    info: {
        color: 'white',
        fontSize: 16
    },
    image: {
        height: 200,
        width: 100,
        resizeMode: "contain"
    }
});

export default ProductItem;