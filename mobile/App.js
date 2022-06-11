import 'react-native-gesture-handler';
import {StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect, useState} from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Navbar from "./src/components/Navbar";
import {COLORS} from "./src/utils/consts";
import {Provider, useDispatch} from "react-redux";
import {store} from "./src/store";
import Navigation from "./src/routes/Navigation";
import {check} from "./src/http/userAPI";
import {setAuthAction, setUserAction} from "./src/store/userReducer";

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

const App = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            console.log(data)
            dispatch(setAuthAction(true))
            dispatch(setUserAction(data))
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loading}>Загрузка</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.app}>
            <Navbar title={'EnerChest'}/>
            <Navigation/>
            <StatusBar style="auto"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: COLORS.black
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {
        fontSize: 40,
        color: COLORS.white,
    },
});

export default AppWrapper;