import {StyleSheet, View} from 'react-native';
import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AntDesign} from '@expo/vector-icons';
import Navbar from "./src/components/Navbar";
import Shop from "./src/screens/Shop";
import Basket from "./src/screens/Basket";
import Orders from "./src/screens/Orders";
import Account from "./src/screens/Account";

const Tab = createBottomTabNavigator();

const routers = {
    'Shop': 'bars',
    'Basket': 'shoppingcart',
    'Orders': 'book',
    'Account': 'user'
}

export default function App() {
    return (
        <View style={styles.app}>
            <Navbar title={'EnerChest'}/>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            return (
                                <AntDesign name={routers[route.name]} size={36} color={focused ? '#008000' : 'gray'}/>
                            );
                        },
                        tabBarShowLabel: false,
                        headerShown: false
                    })}>
                    <Tab.Screen name="Shop" component={Shop}/>
                    <Tab.Screen name="Basket" component={Basket}/>
                    <Tab.Screen name="Orders" component={Orders}/>
                    <Tab.Screen name="Account" component={Account}/>
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        justifyContent: "space-between"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        color: '#C4C4C4'
    }
});
