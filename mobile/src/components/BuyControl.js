import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {COLORS} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {fetchDispensersWithProduct} from "../http/dispenserAPI";
import {setDispensersInfoAction, setProductAction} from "../store/productReducer";
import {addToCart} from "../http/userAPI";
import {fetchingCart} from "../store/basketReducer";

const BuyControl = ({onHide, quantityAll = 0, quantityFree = 0, navigate}) => {

    const dispatch = useDispatch()
    const {dispenser, product} = useSelector(state => state.product)
    const [quantity, setQuantity] = useState(1)

    const checkMin = () => quantity === 1
    const checkMax = () => quantity >= quantityFree

    const onPress = () => {
        fetchDispensersWithProduct(product.id).then(data => {
            onHide()
            dispatch(setProductAction(product))
            dispatch(setDispensersInfoAction(data?.filter(i => i.status)))
            navigate("Maps")
        })
    }

    const buy = () => {
        addToCart({product_id: product.id ,dispenser_id: dispenser._id, quantity}).then(data => {
            dispatch(fetchingCart())
            onHide()
        })
    }

    const decrement = () => {
        if (!checkMin()) setQuantity(quantity - 1)
    }

    const increment = () => {
        if (!checkMax()) setQuantity(quantity + 1)
    }

    return (
        <SafeAreaView style={styles.control}>

            <SafeAreaView style={styles.quantity}>
                <Pressable onPress={decrement}>
                    <AntDesign name="minuscircle" size={36} color={checkMin() ? COLORS.gray : COLORS.green} />
                </Pressable>
                <Text style={styles.buttonText}>{quantity}</Text>
                <Pressable onPress={increment}>
                    <AntDesign name="pluscircle" size={36} color={checkMax() ? COLORS.gray : COLORS.green} />
                </Pressable>
            </SafeAreaView>
            {dispenser &&
                <Text>{quantityFree}/{quantityAll}</Text>
            }

            {dispenser
                ?
                <Pressable style={styles.button} onPress={buy}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </Pressable>
                :
                <Pressable style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>Select Dispenser</Text>
                </Pressable>
            }

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    control: {
        height: "10%",
        width: "100%",
        backgroundColor: COLORS.black,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-around",
        paddingHorizontal: 8,
        position: "absolute",
        top: "90%",
    },
    quantity: {
        width: "35%",
        backgroundColor: COLORS.darkgray,
        borderRadius: 36,
        padding: 6,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 6,
        // paddingBottom: 8,
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 36,
        elevation: 3,
        backgroundColor: COLORS.green,
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    }
})

export default BuyControl;