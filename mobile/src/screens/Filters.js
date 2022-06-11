import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import RemoveFilter from "../components/RemoveFilter";
import SizeSlider from "../components/SizeSlider";
import BrandBar from "../components/Brand/BrandBar";
import {COLORS} from "../utils/consts";
import {useDispatch} from "react-redux";
import {fetchBrands, fetchSize} from "../http/productAPI";
import {setBrandsAction, setSizesAction} from "../store/productReducer";

const Filters = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        fetchBrands().then(data =>
            dispatch(setBrandsAction(data))).catch(e => console.log(e))
        fetchSize().then(data =>
            dispatch(setSizesAction(data.map(i => i.value).sort()))).catch(e => console.log(e))
    }, [false])

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
        backgroundColor: COLORS.darkgray
    },
})

export default Filters;