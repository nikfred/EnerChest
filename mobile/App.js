import {StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AntDesign} from '@expo/vector-icons';
import Navbar from "./src/components/Navbar";
import Shop from "./src/screens/Shop";
import Basket from "./src/screens/Basket";
import Orders from "./src/screens/Orders";
import Account from "./src/screens/Account";
import {COLORS} from "./src/utils/consts";
import {Provider} from "react-redux";
import {store} from "./src/store";

const Tab = createBottomTabNavigator();

const routers = {
    'Shop': 'bars',
    'Basket': 'shoppingcart',
    'Orders': 'book',
    'Account': 'user'
}

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaView style={styles.app}>
                <Navbar title={'EnerChest'}/>
                <NavigationContainer theme={{colors:{ background: COLORS.black}}}>
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
                </NavigationContainer>
                <StatusBar style="auto"/>
            </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: COLORS.black
    },
});
