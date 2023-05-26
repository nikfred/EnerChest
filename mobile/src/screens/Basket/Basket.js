import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View, ScrollView} from 'react-native';
import {Image} from "react-native";
import {COLORS} from "../../utils/consts";
import Svg, {Polygon, Path} from 'react-native-svg';
import {
    deleteProduct,
    fetchingCart,
} from "../../store/basketReducer";
import {useDispatch, useSelector} from "react-redux";
import {fetchDispensers} from "../../http/dispenserAPI";
import {createOrder} from "../../http/userAPI";
import {getOrder} from "../../store/orderReducer";
import {AntDesign} from "@expo/vector-icons";

const Basket = () => {
    const dispensers = useSelector(state => state.basket.dispensers)
    const [dispensersData, setDispensersData] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        fetchDispensers().then(response => {
            setDispensersData(response)
        })
        dispatch(fetchingCart())//get cart
    }, [])

    const getDispenserAddress = (dispenserId) => {
        for (let i = 0; i < dispensersData.length; i++) {
            if (dispensersData[i]._id === dispenserId) {
                return dispensersData[i].address
            }
        }
    }
    const deleteItem = (productId) => {
        dispatch(deleteProduct(productId))
    }

    const DrawDispenserBlocks = () => {//drawing blocks of dispensers
        const getInitialValue = (dispenser) => {
            return dispenser.items
                .map(item => item.price * item.quantity)
                .reduce((prev, curr) => prev + curr)
        }
        const buy = (dispenser_id) => {
            createOrder(dispenser_id)
                .then(() => dispatch(fetchingCart()))
                .then(() => dispatch(getOrder()))
        }
        return (
            <View>
                {!dispensers.length
                    ?  <Image source={require('../../assets/no-task.svg')} style={styles.image}/>
                    : dispensers.map(item => (
                        <View key={item.dispenser_id} style={styles.content}>
                            <Text style={styles.dispenserAddress}>
                                {getDispenserAddress(item.dispenser_id)}</Text>
                            <DrawProductBlocks products={item.items}/>
                            <Text style={styles.border}>Need to pay:<Text
                                style={styles.finalCost}> {getInitialValue(item)} ₴</Text></Text>
                            <Pressable style={styles.button} onPress={() => buy(item.dispenser_id)}>
                                <Text style={styles.textButtonBuy}>Buy</Text>
                            </Pressable>
                        </View>
                    ))}
            </View>
        )
    }

    const DrawProductBlocks = ({products}) => { //drawing blocks of products inside of each dispenser block
        return (
            <View>
                {products.map(item => {
                    const [isActiveInfo, setIsActiveInfo] = useState(false)

                    const toggleActive = () => {//func for opening info about product
                        setIsActiveInfo(!isActiveInfo)
                    }
                    return (
                        <View key={item.id} style={styles.productBlock}>
                            <View style={styles.nameProduct}>
                                <Pressable style={styles.forWidth} onPress={toggleActive}>
                                    <View style={styles.mainBlockInfo}>
                                        <View>
                                            <Image source={{uri: item.imageUrl}} style={styles.imageBasket}/>
                                        </View>
                                        <View style={styles.infoWithoutImg}>
                                            <View style={styles.nameWithDeletingWrapper}>
                                                <Text style={styles.name}>{item.brand + ' ' + item.name}
                                                     <AntDesign name={isActiveInfo ? "caretdown" : "caretright"} size={20} color={COLORS.black} />
                                                </Text>
                                                <Pressable style={styles.deleting} onPress={() => {
                                                    deleteItem(item.item_id)
                                                }}>
                                                    <AntDesign name="closecircle" size={28} color={COLORS.red} />
                                                </Pressable>
                                            </View>
                                            <View
                                                style={isActiveInfo ? styles.infoProduct : [styles.infoProduct, styles.noneActiveInfo]}>
                                                <View>
                                                    <View>
                                                        <Text style={styles.info}>{item.size}</Text>
                                                    </View>
                                                    <View style={styles.countItem}>
                                                        <Text style={styles.info}>{item.quantity} units</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.endInfoProduct}>
                                        <Text style={[styles.info, styles.price]}>{item.price + ' ₴'}/unit</Text>
                                    </View>
                                </Pressable>
                            </View>
                            <View style={styles.hr}/>
                        </View>
                    )
                })}
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <DrawDispenserBlocks/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        backgroundColor: COLORS.lightgray,
        borderRadius: 20,
        width: '90%',
        marginBottom: 20,
        alignSelf: 'center',
    },
    name: {
        justifyContent: 'flex-start',
        color: COLORS.black,
        fontSize: 20,
        width: '80%',
    },
    info: {
        fontSize: 16,
    },
    productBlock: {
        marginTop: 8,
        width: '100%',
    },
    nameProduct: {
        flexDirection: 'row',
    },
    infoProduct: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    image: {
        width: 60,
        height: 60,
    },
    imageBasket: {
        width: 75,
        height: 100,
        resizeMode: "contain"
    },
    countItem: {
        flexDirection: 'row'
    },
    endInfoProduct: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
        marginBottom: 10,
    },
    button: {
        backgroundColor: COLORS.green,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    textButtonBuy: {
        fontSize: 20,
        color: COLORS.white,
    },
    hr: {
        alignSelf: 'center',
        borderBottomColor: COLORS.darkgray,
        width: "95%",
        borderBottomWidth: 3,
        borderStyle: "dotted",
        marginTop: 4,
        borderRadius: 10,
    },
    border: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 4
    },
    dispenserAddress: {
        textAlign: 'center',
        padding: 8,
        fontSize: 20,
        color: COLORS.white,
        backgroundColor: COLORS.darkgray,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    noneActiveInfo: {
        display: 'none'
    },
    finalCost: {
        fontSize: 20,
    },
    mainBlockInfo: {
        flexDirection: 'row',
        marginBottom: 0,
        // borderColor: 'green',
        // borderWidth: 2,
    },
    forWidth: {
        width: '100%',
        // borderColor: 'green',
        // borderWidth: 2,
    },
    infoWithoutImg: {
        flex: 1,
    },
    deleting: {
        height: 30,
        justifyContent: 'center',
        textAlign: 'center',
    },
    textDeleting: {
        color: "black",
        fontWeight: "700",
    },
    nameWithDeletingWrapper: {
        flexDirection: 'row',
    },
    noContent: {
        fontSize: 30,
        color: COLORS.lightgray,
        textAlign: 'center',
    }
});

export default Basket;