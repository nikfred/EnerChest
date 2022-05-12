import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import RemoveFilter from "../components/RemoveFilter";
import SizeSlider from "../components/SizeSlider";
import BrandBar from "../components/Brand/BrandBar";

const Filters = () => {

    return (
        <SafeAreaView style={styles.container}>
            <BrandBar/>
            <SizeSlider/>
            <RemoveFilter/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
})

export default Filters;