import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {COLORS} from "../utils/consts";

const BuyControl = ({onPress}) => {

    const [quantity, setQuantity] = useState(1)

    const decrement = () => {
        if (quantity > 0) setQuantity(quantity - 1)
    }

    const increment = () => {
        setQuantity(quantity + 1)
    }

    return (
        <SafeAreaView style={styles.control}>

            <SafeAreaView style={styles.quantity}>
                <Pressable onPress={decrement}>
                    <AntDesign name="minuscircle" size={36} color={COLORS.green} />
                </Pressable>
                <Text style={styles.buttonText}>{quantity}</Text>
                <Pressable onPress={increment}>
                    <AntDesign name="pluscircle" size={36} color={COLORS.green} />
                </Pressable>
            </SafeAreaView>

            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </Pressable>
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