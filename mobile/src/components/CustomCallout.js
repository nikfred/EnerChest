import React from 'react';
import {StyleSheet, View, Text, Pressable} from "react-native";
import {COLORS} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";

const CustomCallout = ({dispenser}) => {

    const isSelect = useSelector(state => state.product.dispenser?._id) === dispenser?._id
    const dispenserInfo = useSelector(state => state.product.dispensersInfo?.filter(i => i.dispenser_id === dispenser._id)[0])

    return (
        <View style={styles.container}>
            <View style={{...styles.bubble, borderColor: isSelect ? COLORS.green : COLORS.gray}}>
                <View style={styles.contentView}>
                    <Text>{dispenser.address}</Text>
                </View>
                {isSelect
                    ?
                    <View style={{...styles.button, backgroundColor: COLORS.green}}>
                        <Text style={{color: COLORS.white}}>Selected</Text>
                    </View>
                    :
                    <View style={styles.button}>
                        <Text style={{color: COLORS.white}}>
                            Select {dispenserInfo && `${dispenserInfo.quantityFree}/${dispenserInfo.quantityAll}`}
                        </Text>
                    </View>
                }

            </View>
            <View style={{...styles.arrowBorder, borderTopColor: isSelect ? COLORS.green : COLORS.gray}}/>
            <View style={{...styles.arrow, borderTopColor: isSelect ? COLORS.green : COLORS.gray}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        width: 140,
        alignSelf: 'flex-start',
        backgroundColor: COLORS.white,
        borderRadius: 6,
        borderColor: COLORS.green,
        borderWidth: 4,
    },
    contentView: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: "center"
    },
    button: {
        width: '100%',
        backgroundColor: COLORS.gray,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 4,
    },
    amount: {
        flex: 1,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: COLORS.green,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: COLORS.green,
        alignSelf: 'center',
        marginTop: -0.5,
    }
});

export default CustomCallout;