import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {fetchBrands, fetchProduct, fetchSize} from "../http/productAPI";
import Catalog from "./Catalog";
import Filters from "./Filters";
import Maps from "./Maps";
import {COLORS} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {addProductsAction, setSizesAction} from "../store/productReducer";

const Tab = createMaterialTopTabNavigator();

const Shop = () => {

    const [brands, setBrands] = useState([])

    const dispatch = useDispatch()
    const {actual, dispenser, brand, selectedSizes, sizes} = useSelector(state => state.product)

    useEffect(() => {
        fetchBrands().then(data => setBrands(data)).catch(e => console.log(e))
        // fetchSize().then(data => setSizes(data)).catch(e => console.log(e))
        fetchSize().then(data => {
            dispatch(setSizesAction(data.map(i => i.value).sort()))
        }).catch(e => console.log(e))
    }, [false])

    useEffect(() => {
        if (!actual) {
            fetchProduct(brand, selectedSizes, dispenser?._id, 1, 16).then(data => {
                dispatch(addProductsAction(data.products))
            })
        }
    }, [actual, brand, selectedSizes])

    let FilterStack = () => {
        return (
            <Filters filters={{brands, sizes}}/>
        )
    }

    return (
        <Tab.Navigator
            initialRouteName="Catalog"
            screenOptions={{
                tabBarActiveTintColor: COLORS.green,
                tabBarInactiveTintColor: COLORS.gray,
                tabBarIndicatorStyle: {
                    backgroundColor: COLORS.green,
                },
                tabBarContentContainerStyle: {
                    // height: 56
                },
            }}>
            <Tab.Screen name="Filters" component={FilterStack}/>
            <Tab.Screen name="Catalog" component={Catalog}/>
            <Tab.Screen name="Maps" component={Maps}/>
        </Tab.Navigator>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        color: '#C4C4C4'
    }
});

export default Shop;