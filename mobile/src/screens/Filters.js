import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import BrandBar from "../components/BrandBar";

const Filters = ({filters}) => {
    return (
        <View>
            <BrandBar brands={filters.brands}/>
        </View>
    );
};

export default Filters;