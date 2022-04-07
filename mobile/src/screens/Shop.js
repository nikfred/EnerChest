import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {fetchBrands, fetchProduct, fetchSize} from "../http/productAPI";
import Catalog from "./Catalog";
import Filters from "./Filters";
import Maps from "./Maps";
import {COLORS} from "../utils/consts";

const Tab = createMaterialTopTabNavigator();

const Shop = () => {

    const [brands, setBrands] = useState([])
    const [sizes, setSizes] = useState([])
    const [products, setProducts] = useState([])
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {
        fetchBrands().then(data => setBrands(data)).catch(e => console.log(e))
        fetchSize().then(data => setSizes(data)).catch(e => console.log(e))
        fetchProduct(null, null, 1, 12).then(data => {
            setProducts(data.products)
            setTotalCount(data.count)
        })
    }, [])

    let CatalogStack = () => {
        return (
            <Catalog products={products}/>
        )
    }

    let FilterStack = () => {
        return (
            <Filters value={{brands, sizes}}/>
        )
    }

    return (
        <Tab.Navigator
            initialRouteName="Catalog"
            screenOptions={{
                // tabBarShowLabel: false,
                // headerShown: false,
                // tabBarAccessibilityLabel: false,
                style:{color: COLORS.green, background: COLORS.green, padding: 0, margin: 0},
                tabBarActiveTintColor: COLORS.green,
                tabBarInactiveTintColor: COLORS.gray,
                tabBarPressColor: COLORS.green,
                tabBarContentContainerStyle: {color: COLORS.green, background: COLORS.green, padding: 0, margin: 0},
            }}>
            <Tab.Screen name="Filters" component={FilterStack}/>
            <Tab.Screen name="Catalog" component={CatalogStack}/>
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