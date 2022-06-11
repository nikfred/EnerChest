import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {fetchBrands, fetchProduct, fetchSize} from "../http/productAPI";
import Catalog from "./Catalog";
import Filters from "./Filters";
import Maps from "./Maps";
import {COLORS} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {addProductsAction, setBrandsAction, setSizesAction} from "../store/productReducer";

const Top = createMaterialTopTabNavigator();

const Shop = () => {

    return (
        <Top.Navigator
            initialRouteName="Catalog"
            screenOptions={{
                tabBarActiveTintColor: COLORS.green,
                tabBarInactiveTintColor: COLORS.lightgray,
                tabBarIndicatorStyle: {
                    backgroundColor: COLORS.green,

                },
                tabBarStyle: {
                    backgroundColor: COLORS.black
                },
            }}>
            <Top.Screen name="Filters" component={Filters}/>
            <Top.Screen name="Catalog" component={Catalog}/>
            <Top.Screen name="Maps" component={Maps}/>
        </Top.Navigator>

    );
};

export default Shop;