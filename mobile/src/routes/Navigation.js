import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import Auth from "../screens/Auth";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {AntDesign} from "@expo/vector-icons";
import {COLORS} from "../utils/consts";
import Shop from "../screens/Shop";
import Basket from "../screens/Basket";
import Orders from "../screens/Orders";
import Account from "../screens/Account";
import {createStackNavigator} from "@react-navigation/stack";
import {ScrollView} from "react-native-gesture-handler";
import {useDispatch, useSelector} from "react-redux";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const routers = {
    'Shop': 'bars',
    'Basket': 'shoppingcart',
    'Orders': 'book',
    'Account': 'user'
}

const Navigation = () => {
    const dispatch = useDispatch()
    const login = useSelector(state => state.user.isAuth)
    return (
        <NavigationContainer theme={{colors:{ background: COLORS.black}}}>
            <Stack.Navigator
                screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.black,
                },
            }}>
                {!login ?
                <Stack.Screen name={'Auth'} component={Auth}/>
                    :
                <Stack.Screen name={'Bottom'} component={Bottom}/>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export const  Bottom = () => {
    return(
    <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                return (
                    <AntDesign name={routers[route.name]} size={36}
                               color={focused ? COLORS.green : COLORS.lightgray}/>
                );
            },
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: COLORS.black,
            },
        })}>
        <Tab.Screen name="Shop" component={Shop}/>
        <Tab.Screen name="Basket" component={Basket}/>
        <Tab.Screen name="Orders" component={Orders}/>
        <Tab.Screen name="Account" component={Account}/>
    </Tab.Navigator>
    )
}

export default Navigation;