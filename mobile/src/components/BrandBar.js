import React from 'react';
import {FlatList, SafeAreaView} from "react-native";
import BrandItem from "./BrandItem";

const BrandBar = ({brands}) => {

    return (
        <SafeAreaView>
            <FlatList
                columnWrapperStyle={{flex: 1, justifyContent: "space-around"}}
                numColumns={3}
                data={brands}
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                    <BrandItem brandItem={item}/>
                )}
            />
        </SafeAreaView>
    );
};

export default BrandBar;