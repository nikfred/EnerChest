import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {fetchBrands, fetchProduct, fetchSize} from "../http/productAPI";
import Catalog from "./Catalog";
import Filters from "./Filters";
import Maps from "./Maps";
import {COLORS} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {addProductsAction} from "../store/productReducer";

const Tab = createMaterialTopTabNavigator();

const Shop = () => {

    const [brands, setBrands] = useState([])
    const [sizes, setSizes] = useState([])
    const [totalCount, setTotalCount] = useState(0)

    const dispatch = useDispatch()
    const {actual, dispenser, brand, size} = useSelector(state => state.product)
    // const dispenser = useSelector(state => state.product.dispenser)
    // const brand = useSelector(state => state.product.brand)
    // const size = useSelector(state => state.product.size)

    useEffect(() => {
        fetchBrands().then(data => setBrands(data)).catch(e => console.log(e))
        fetchSize().then(data => setSizes(data)).catch(e => console.log(e))
    }, [])

    useEffect(() => {
        if (!actual) {
            fetchProduct(brand, size, dispenser?._id,1, 16).then(data => {
                dispatch(addProductsAction(data.products))
                // setProducts(data.products)
                // setTotalCount(data.count)
            })
        }
    }, [actual, brand, size])

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