import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import {COLORS} from "../utils/consts";


const Navbar = ({title}) => {
    return (
        <SafeAreaView style={styles.navbar}>
            <Text style={styles.text}>{title}</Text>
            <Image source={require('../../assets/img/img.png')} style={styles.image}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    navbar: {
        height: 60,
        backgroundColor: COLORS.black,
        justifyContent: 'flex-end',
        padding: 10,
        flexWrap: 'wrap',
        alignContent: "space-between"
    },
    text: {
        color: COLORS.green,
        // fontFamily: 'BebasNeue_400Regular',
        fontWeight: 'bold',
        fontSize: 28
    },
    image: {
        width: 40,
        height: 40,
    }
});

export default Navbar;