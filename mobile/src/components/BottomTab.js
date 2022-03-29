import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const BottomTab = () => {
    return (
        <View style={styles.tab}>
            <AntDesign name="bars" size={35} color="#C4C4C4" />
            <AntDesign name="shoppingcart" size={35} color="#C4C4C4" />
            <AntDesign name="book" size={35} color="#C4C4C4" />
            <AntDesign name="user" size={35} color="#C4C4C4" />
        </View>
    );
};

const styles = StyleSheet.create({
    tab: {
        height: 60,
        backgroundColor: '#131313',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignContent: 'space-around'
    },
    text: {
        color: '#008000',
        // fontFamily: 'BebasNeue_400Regular',
        fontSize: 28
    },
    image: {
        width: 40,
        height: 40,
    }
});

export default BottomTab;