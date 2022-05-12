import React from 'react';
import {SafeAreaView, StyleSheet, Text} from "react-native";
import {COLORS} from "../../utils/consts";

const SectionHeader = ({width, title}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.content}>{title}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: COLORS.black,
        padding: 10,
        paddingHorizontal: 20
    },
    content: {
        color: COLORS.white,
        fontSize: 18
    }
})

export default SectionHeader;