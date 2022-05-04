import React, {useState} from 'react';
import {Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {COLORS} from "../utils/consts";
import BuyControl from "./BuyControl";

const ProductItem = ({product, index}) => {

    const [modalVisible, setModalVisible] = useState(false)

    const buy = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <Pressable style={styles.item} onPress={() => setModalVisible(!modalVisible)}>
            <Image source={{uri: product.imageUrl}} style={styles.image}/>
            <Text style={styles.name}>{product.brand} {product.name}</Text>

            <View style={styles.infoCon}>
                <Text style={styles.info}>{product.size} </Text>
                <Text style={styles.info}>{product.price} UAH</Text>
            </View>


            <Modal
                animationType="slide"
                presentationStyle="overFullScreen"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <SafeAreaView style={modalStyles.modal}>
                    <SafeAreaView>
                        <Text style={modalStyles.close} onPress={() => setModalVisible(!modalVisible)}> &times; </Text>

                        <SafeAreaView style={modalStyles.content}>
                            <Text style={modalStyles.name}>{product.brand} {product.name}</Text>
                            <Image source={{uri: product.imageUrl}} style={modalStyles.image}/>

                            <View style={modalStyles.infoCon}>
                                <View style={modalStyles.info}>
                                    <Text style={modalStyles.infoText}>{product.size}</Text>
                                    <Text style={modalStyles.infoText}>{product.price} ₴</Text>
                                </View>
                                <View style={modalStyles.hr}/>
                                <Text style={modalStyles.description}>{product.description}</Text>
                            </View>
                        </SafeAreaView>

                    </SafeAreaView>
                    <BuyControl onPress={buy}/>
                </SafeAreaView>

            </Modal>

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
    },

});

const modalStyles = StyleSheet.create({
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
        // marginBottom: 16,
        // backgroundColor: COLORS.black
    },
    name: {
        fontSize: 40,
        color: COLORS.green,
        fontWeight: "bold",
        textShadowColor: '#00D000',
        textShadowRadius: 15
    },
    infoText: {
        fontSize: 30,
        color: 'white'
    },
    description: {
        fontSize: 16,
        color: 'white',
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
    hr: {
        borderBottomColor: COLORS.green,
        width: "100%",
        borderBottomWidth: 3,
        borderStyle: "dotted",
        marginVertical: 4,
        borderRadius: 10,
    }
})

export default ProductItem;