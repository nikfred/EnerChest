import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import BrandBar from "../components/BrandBar";
import RemoveFilter from "../components/RemoveFilter";
import SizeSlider from "../components/SizeSlider";

const Filters = ({filters}) => {

    return (
        <SafeAreaView style={styles.container}>
            <SizeSlider/>
            <BrandBar brands={filters.brands}/>
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