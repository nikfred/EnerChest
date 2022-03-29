import {StyleSheet, Text, View} from 'react-native';
import React from "react";
import Navbar from "./src/components/Navbar";
import BottomTab from "./src/components/BottomTab";

export default function App() {
    return (
        <View style={styles.app}>
            <Navbar title={'EnerChest'}/>
            <View style={styles.container}>
                <Text style={styles.content}>Платите нам шекели</Text>
            </View>
            <BottomTab/>
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
