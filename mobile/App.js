import 'react-native-gesture-handler';
import {StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Navbar from "./src/components/Navbar";
import {COLORS} from "./src/utils/consts";
import {Provider} from "react-redux";
import {store} from "./src/store";
import Navigation from "./src/routes/Navigation";


export default function App() {

    return (
        <Provider store={store}>
            <SafeAreaView style={styles.app}>
                <Navbar title={'EnerChest'}/>
                <Navigation/>
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
