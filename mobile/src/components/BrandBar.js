import React from 'react';
import {FlatList, View} from "react-native";
import BrandItem from "./BrandItem";

const BrandBar = ({brands}) => {

    return (
        <View>
            <FlatList
                columnWrapperStyle={{flex: 1, justifyContent: "space-around"}}
                numColumns={3}
                data={brands}
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                    <BrandItem brandItem={item}/>
                )}
            />
        </View>
    );
};

export default BrandBar;