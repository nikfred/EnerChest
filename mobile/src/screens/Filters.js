import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import BrandBar from "../components/BrandBar";
import {COLORS} from "../utils/consts";
import RemoveFilter from "../components/RemoveFilter";

const Filters = ({filters}) => {
    return (
        <View style={styles.container}>
            <BrandBar brands={filters.brands}/>
            <RemoveFilter/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        // backgroundColor: COLORS.gray,
    }
})

export default Filters;