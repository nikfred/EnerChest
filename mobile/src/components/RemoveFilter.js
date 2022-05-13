import React from 'react';
import {Pressable, StyleSheet, Text} from "react-native";
import {COLORS} from "../utils/consts";
import {useDispatch} from "react-redux";
import {removeFiltersAction} from "../store/productReducer";

const RemoveFilter = () => {
    const dispatch = useDispatch()

    return (
        <Pressable style={styles.container} onPress={() => dispatch(removeFiltersAction())}>
            <Text style={{color: COLORS.white}}>Remove Filters</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        margin: 16,
        padding: 8,
        backgroundColor: COLORS.red,
        borderWidth: 4,
        borderRadius: 16,
        borderStyle: "solid",
        borderColor: COLORS.gray,
        // borderColor: 'tomato',
        height: "10%",
        position: "absolute",
        top: "85%",
    }
})

export default RemoveFilter;