import React, {useState} from 'react';
import {addBrandAction, deleteBrandAction} from "../store/productReducer";
import {Pressable, StyleSheet, Text} from "react-native";
import {COLORS} from "../utils/consts";
import {useDispatch} from "react-redux";

const BrandItem = ({brandItem}) => {
    const [press, setPress] = useState(false)
    const dispatch = useDispatch()

    const onPress = () => {
        console.log(press)
        if (press) {
            setPress(false)
            console.log(`REMOVE ${brandItem.brand}`)
            dispatch(deleteBrandAction(brandItem.brand))
        } else {
            setPress(true)
            console.log(`ADD ${brandItem.brand}`)
            dispatch(addBrandAction(brandItem.brand))
        }
    }

    return (
        <Pressable style={{...styles.item, borderColor: press ? COLORS.green : COLORS.darkgray}}
                   onPress={onPress}>
            <Text>{brandItem.brand}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        width: "30%",
        alignItems: "center",
        margin: 16,
        padding: 8,
        backgroundColor: COLORS.gray,
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: "solid"
    }
})

export default BrandItem;