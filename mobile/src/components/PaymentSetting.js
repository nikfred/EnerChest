import React from 'react';
import {Modal, StyleSheet, Text, View, TextInput} from "react-native";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import {COLORS} from "../utils/consts";

const PaymentSetting = ({show, onHide}) => {
    return (
        <Modal visible={show} animationType='fade' onRequestClose={() => onHide()}>
            <View style={styles.settingPage}>
                <View style={styles.headBlock}>
                    <Text style={styles.headText}>PAYMENT SETTING</Text>
                    <AntDesign name="closecircle" size={40} color="black" onPress={() => onHide()}/>
                </View>
                <View style={styles.rectangle}></View>
                <View>
                    <Text style={{fontSize: 70, textAlign: 'center', color: COLORS.green}}>Will be available in a new update =)</Text>
                </View>

            </View>
        </Modal>

    );
};

const styles = StyleSheet.create(
    {
        headBlock: {
            alignItems: 'center',
            justifyContent: "space-between",
            flexDirection: "row",
        },
        headText: {
            fontSize: 30,
            color: COLORS.white,
            textAlign: 'center',
            margin: 5,
        },
        rectangle: {
            width: '90%',
            height: 3,
            backgroundColor: COLORS.gray,
            alignContent: "center",
        },
        settingPage: {
            height: '100%',
            width: '100%',
            backgroundColor: COLORS.darkgray,
            padding: 10,
        }
    }
)

export default PaymentSetting;