import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Colors} from "react-native/Libraries/NewAppScreen";
import {COLORS} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {setDispenserAction} from "../store/productReducer";
import {fetchDispenser, fetchDispensers} from "../http/dispenserAPI";

export default function Scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(true);
    const [text, setText] = useState('Not yet scanned')
    const dispatch = useDispatch()
    const selected = useSelector(state => state.product.dispenser)
    const {dispensersInfo, dispenser} = useSelector(state => state.product)

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
        fetchDispensers().then(data => setDispensers(data.filter(i => i.status)))
    }, [])



    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data)
        console.log('Type: ' + type + '\nData: ' + data)
    };

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>)
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>)
    }

    // Return the View
    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 800, width: 800 }} />
            </View>
            <Text style={styles.maintext}>{text}</Text>

            {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
            {scanned && <Button title={'select'} onPress={() => fetchDispenser(text).then(data => dispatch(setDispenserAction(data)))}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.gray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
        color: COLORS.green,
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 550,
        width: 380,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato'
    }
});