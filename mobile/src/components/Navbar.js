import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';


const Navbar = ({title}) => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>{title}</Text>
            <Image source={require('../../assets/img/img.png')} style={styles.image}/>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        height: 80,
        backgroundColor: '#131313',
        justifyContent: 'flex-end',
        padding: 10,
        flexWrap: 'wrap',
        alignContent: "space-between"
    },
    text: {
        color: '#008000',
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