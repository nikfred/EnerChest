import React, {useState} from 'react';
import {FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {COLORS} from "../../utils/consts";
import {deleteBrandAction, removeBrandsAction} from "../../store/productReducer";
import BrandList from "./BrandList";
import {useDispatch, useSelector} from "react-redux";

const BrandBar = () => {

    const [modalVisible, setModalVisible] = useState(false)

    const dispatch = useDispatch()
    const {selectedBrands} = useSelector(state => state.product)

    return (
        <SafeAreaView style={styles.container}>
            <Pressable style={styles.brands}  onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.content}>Brand</Text>
                    <AntDesign name="right" size={24} color={COLORS.white} />
            </Pressable>

            <FlatList
                data={selectedBrands}
                horizontal={true}
                contentContainerStyle={{marginTop: 4}}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) =>
                    <Pressable style={styles.selected} onPress={() => dispatch(deleteBrandAction(item))}>
                        <Text style={{color: COLORS.white}}>{item}  </Text>
                        <AntDesign name="check" size={18} color={COLORS.white}/>
                    </Pressable>
                }
            />

            <Modal
                animationType="slide"
                presentationStyle="overFullScreen"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <SafeAreaView style={styles.modal}>
                    <SafeAreaView style={styles.header}>
                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                            <AntDesign name="left" size={30} color={COLORS.white} />
                        </Pressable>
                        {selectedBrands[0] &&
                            <Pressable onPress={() => dispatch(removeBrandsAction())}>
                                <Text style={styles.text}>Reset</Text>
                            </Pressable>
                        }
                    </SafeAreaView>
                    <BrandList/>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        borderBottomWidth: 4,
        borderColor: COLORS.black,
        // backgroundColor: COLORS.darkgray
    },
    brands: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        width: '100%',
    },
    selected: {
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: COLORS.green,
        paddingVertical: 4,
        paddingHorizontal: 8,
        margin: 4,
        borderRadius: 16
    },
    content: {
        fontSize: 20,
        color: COLORS.white
    },
    modal: {
        backgroundColor: COLORS.darkgray
    },
    header: {
        backgroundColor: COLORS.black,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4
    },
    text: {
        color: COLORS.white,
        fontSize: 20
    }
})

export default BrandBar;