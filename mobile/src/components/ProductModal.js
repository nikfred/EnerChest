import React from 'react';
import {Image, Modal, SafeAreaView, StyleSheet, Text, View} from "react-native";
import BuyControl from "./BuyControl";
import {useSelector} from "react-redux";
import {COLORS} from "../utils/consts";

const ProductModal = ({show, onHide, navigate}) => {

    const {product} = useSelector(state => state.product)

    return (
        <Modal
            animationType="slide"
            presentationStyle="overFullScreen"
            visible={show}
            onRequestClose={onHide}
        >
            <SafeAreaView style={styles.modal}>
                <SafeAreaView>
                    <Text style={styles.close} onPress={onHide}> &times; </Text>

                    <SafeAreaView style={styles.content}>
                        <Text style={styles.name}>{product.brand} {product.name}</Text>
                        <Image source={{uri: product.imageUrl}} style={styles.image}/>

                        <View style={styles.infoCon}>
                            <View style={styles.info}>
                                <Text style={styles.infoText}>{product.size}</Text>
                                <Text style={styles.infoText}>{product.price} ₴</Text>
                            </View>
                            <View style={styles.hr}/>
                            <Text style={styles.text}>{product.description}</Text>
                        </View>
                    </SafeAreaView>

                </SafeAreaView>
                <BuyControl onHide={onHide}
                            quantityAll={product?.quantityAll}
                            quantityFree={product?.quantityFree}
                            navigate={navigate}/>
            </SafeAreaView>

        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        // margin: 25,
        height: "100%",
        backgroundColor: COLORS.gray,
        borderRadius: 10,
        flex: 1,
        // justifyContent: "space-between"
    },
    close: {
        fontSize: 30,
        paddingHorizontal: 4,
        textAlign: "right"
    },
    content: {
        alignItems: 'center',
    },
    infoCon: {
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.darkgray,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24,
        alignItems: 'center',
        padding: 8,

    },
    info: {
        display: 'flex',
        width: '80%',
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: 'space-around',
    },
    name: {
        fontSize: 40,
        color: COLORS.green,
        fontWeight: "bold",
    },
    infoText: {
        fontSize: 30,
        color: COLORS.white
    },
    text: {
        fontSize: 16,
        color: COLORS.white,
        paddingHorizontal: 8
    },
    image: {
        height: 340,
        width: 180,
        resizeMode: "contain",
        display: "flex",
        alignSelf: "center",
        margin: 10
    },
    dispenser: {
        width: '100%',
        alignItems: "center"
    },
    hr: {
        borderBottomColor: COLORS.green,
        width: "100%",
        borderBottomWidth: 3,
        borderStyle: "dotted",
        marginVertical: 4,
        borderRadius: 10,
    }
})

export default ProductModal;