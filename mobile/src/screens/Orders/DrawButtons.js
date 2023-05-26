import React from 'react';
import {cancelOrder, completeOrder} from "../../store/orderReducer";
import {Pressable, Text, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {COLORS} from "../../utils/consts";
import {styles} from "./styles";
import {useDispatch} from "react-redux";

const DrawButtons = ({item}) => {
    const dispatch = useDispatch()
    const completeOrderRequest = (orderId) => {
        dispatch(completeOrder(orderId))
    }
    const cancelOrderRequest = (orderId) => {
        dispatch(cancelOrder(orderId))
    }

    if (item.status === 'Ready') {
        return <View style={styles.totalPriceWithStatusWrapper}>
            <Pressable style={{...styles.button, ...styles.buttonComplete}}
                       onPress={() => completeOrderRequest(item.id)}>
                <Text style={styles.textButton}>
                    Complete <AntDesign name="check" size={20} color={COLORS.white}/></Text>
            </Pressable>
            <Pressable style={{...styles.button, ...styles.buttonCancel}}
                       onPress={() => {
                           cancelOrderRequest(item?.id)
                           console.log(item.id)
                       }}>
                <Text style={styles.textButton}>
                    Cancel <AntDesign name="close" size={20} color={COLORS.white}/></Text>
            </Pressable>
        </View>
    } else {
        return <></>
    }

};

export default DrawButtons;