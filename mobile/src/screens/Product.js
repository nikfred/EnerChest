import React from 'react';
import {Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const Product = ({product}) => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.content}>
                <Text style={styles.name}>{product.brand} {product.name}</Text>
                <Image source={{uri: product.imageUrl}} style={styles.image}/>
                <View style={styles.infoCon}>
                    <Text style={styles.info}>{product.size}</Text>
                    <Text style={styles.info}>{product.price} UAH</Text>
                </View>

                <Text style={styles.description}>{product.description}</Text>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default Product;