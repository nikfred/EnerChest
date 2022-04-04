import React, {useState} from 'react';
import {Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const ProductItem = ({product}) => {

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <Pressable style={styles.item} onPress={() => setModalVisible(!modalVisible)}>
            <Image source={{uri: product.imageUrl}} style={styles.image}/>
            <Text style={styles.name}>{product.brand} {product.name}</Text>

            <View style={styles.infoCon}>
                <Text style={styles.info}>{product.size} </Text>
                <Text style={styles.info}>{product.price} UAH</Text>
            </View>


            <Modal
                animationType="fade"
                presentationStyle="overFullScreen"
                visible={modalVisible}
            >
                <SafeAreaView style={modalStyles.modal}>
                    <Text style={modalStyles.close} onPress={() => setModalVisible(!modalVisible)}> &times; </Text>

                    <SafeAreaView style={modalStyles.content}>
                        <Text style={modalStyles.name}>{product.brand} {product.name}</Text>
                        <Image source={{uri: product.imageUrl}} style={modalStyles.image}/>
                        <View style={modalStyles.infoCon}>
                            <Text style={modalStyles.info}>{product.size}</Text>
                            <Text style={modalStyles.info}>{product.price} UAH</Text>
                        </View>

                        <Text style={modalStyles.description}>{product.description}</Text>
                    </SafeAreaView>
                </SafeAreaView>

            </Modal>

        </Pressable>
    );
};

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: 16,
        marginTop: 16,
        padding: 8,
        borderRadius: 10,
        backgroundColor: '#C4C4C4'
    },
    name: {
        color: '#008000',
        fontWeight: "bold",
        fontSize: 18,
    },
    infoCon: {
        display: 'flex',
        width: '80%',
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
        margin: 25,
        backgroundColor: '#C4C4C4',
        borderRadius: 10,
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
        display: 'flex',
        width: '80%',
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: 'space-around',
        // marginBottom: 16,
        backgroundColor: '#1B1B1B'
    },
    name: {
        fontSize: 40,
        color: '#008000',
        fontWeight: "bold",
        textShadowColor: '#00D000',
        textShadowRadius: 15
    },
    info: {
        fontSize: 30,
        color: 'white'
    },
    description: {
        fontSize: 16,
        color: 'white',
        padding: 16
    },
    image: {
        height: 340,
        width: 180,
        resizeMode: "contain",
        display: "flex",
        alignSelf: "center",
        margin: 10
    },
})

export default ProductItem;