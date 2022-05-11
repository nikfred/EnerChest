import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {COLORS} from "../utils/consts";
import {setFinishSizeAction, setStartSizeAction} from "../store/productReducer";
import {useDispatch, useSelector} from "react-redux";

const SizeSlider = () => {

    const dispatch = useDispatch()
    const {sizes, startSize, finishSize} = useSelector(state => state.product)

    return (
        <SafeAreaView style={styles.slider}>
            <MultiSlider
                isMarkersSeparated={true}
                values={[startSize * 100, finishSize * 100]}
                min={0}
                max={(sizes.length - 1) * 100}
                step={1}
                trackStyle={{borderRadius: 8, height: 12}}
                selectedStyle={{backgroundColor: COLORS.green}}
                unselectedStyle={{backgroundColor: COLORS.gray}}
                markerStyle={{
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                    backgroundColor: COLORS.green,
                    borderColor: COLORS.gray,
                    borderWidth: 2,
                    marginTop: '25%'
                }}
                touchDimensions={{height: 60, width: 60, borderRadius: 15, slipDisplacement: 600}}

                onValuesChangeFinish={values => {
                    dispatch(setStartSizeAction(Math.round(values[0] / 100)))
                    dispatch(setFinishSizeAction(Math.round(values[1] / 100)))
                }}
            />
            <View style={styles.sizes}>
                {sizes.map((size, index) =>
                    <Text key={size}
                          style={(index < startSize || index > finishSize)
                              ? {color: COLORS.gray}
                              : {color: COLORS.white, fontSize: 20}
                          }>{size?.split(' ')[0]}</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    slider: {
        height: '15%',
        width: '80%',
        marginVertical: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    sizes: {
        width: '100%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export default SizeSlider;