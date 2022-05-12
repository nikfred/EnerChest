import React from 'react';
import {addBrandAction, deleteBrandAction} from "../store/productReducer";
import {Pressable, StyleSheet, Text} from "react-native";
import {COLORS} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";

const BrandItem = ({brandItem}) => {

    const dispatch = useDispatch()
    const {selectedBrands} = useSelector(state => state.product)

    const press = () => {
        return selectedBrands.indexOf(brandItem.brand) !== -1
    }

    const onPress = () => {
        if (press()) {
            dispatch(deleteBrandAction(brandItem.brand))
        } else {
            dispatch(addBrandAction(brandItem.brand))
        }
    }

    return (
        <Pressable style={{...styles.item, borderColor: press() ? COLORS.green : COLORS.darkgray}}
                   onPressIn={onPress}>
            <Text>{brandItem.brand}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        width: "30%",
        alignItems: "center",
        margin: 8,
        padding: 16,
        backgroundColor: COLORS.gray,
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: "solid"
    }
})

export default BrandItem;