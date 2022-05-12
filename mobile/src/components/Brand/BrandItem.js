import React from 'react';
import {addBrandAction, deleteBrandAction} from "../../store/productReducer";
import {Pressable, StyleSheet, Text} from "react-native";
import {COLORS} from "../../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {AntDesign} from "@expo/vector-icons";

const BrandItem = ({brandItem, width}) => {

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
        <Pressable style={{...styles.item, width: width ?? '100%'}}
                   onPressIn={onPress}>
            <Text style={styles.content}>{brandItem.brand}</Text>
            {press()
                ? <AntDesign name="checkcircle" size={30} color={COLORS.green} />
                : <AntDesign name="pluscircleo" size={30} color={COLORS.black} />
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 12,
        paddingHorizontal: 20,
        backgroundColor: COLORS.lightgray,
    },
    content: {
        fontSize: 18,
        fontWeight: "bold"
    }
})

export default BrandItem;