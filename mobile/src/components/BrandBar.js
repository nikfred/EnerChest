import React from 'react';
import {FlatList, Pressable, Text, View} from "react-native";
import {COLORS} from "../utils/consts";
import {useDispatch} from "react-redux";
import {setBrandAction} from "../store/productReducer";

const BrandBar = ({brands}) => {

    const dispatch = useDispatch()

    const BrandItem = ({brandItem}) => {
        return (
            <Pressable style={{margin: 20, background: COLORS.gray}}
                       onPress={() => {
                           console.log(brandItem.brand)
                           dispatch(setBrandAction(brandItem.brand))
                       }}>
                <Text>{brandItem.brand}</Text>
            </Pressable>
        )
    }

    return (
        <View>
            <FlatList
                horizontal={true}
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