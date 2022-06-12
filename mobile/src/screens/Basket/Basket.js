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
        const buy = () => {
            dispatch(fetchingCart())
        }
        return (
            <View>
                {!dispensers.length
                    ? <Text style={styles.noContent}>Your basket is empty</Text>
                    : dispensers.map(item => (
                        <View key={item.dispenser_id} style={styles.content}>
                            <Text style={styles.dispenserAddress}>
                                {getDispenserAddress(item.dispenser_id)}</Text>
                            <DrawProductBlocks products={item.items}/>
                            <Text style={styles.border}>Need to pay:<Text
                                style={styles.finalCost}> {getInitialValue(item)} ₴</Text></Text>
                            <Pressable style={styles.button} onPress={() => buy()}>
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
                                                    <Svg
                                                        style={isActiveInfo ? styles.normalTriangle : styles.rotatedTriangle}
                                                        height="20"
                                                        width="20">
                                                        <Polygon style={styles.activeInfo}
                                                                 points="0,8 14,8 7,20"
                                                                 fill='white'
                                                                 strokeWidth="1"
                                                        />
                                                    </Svg>
                                                </Text>
                                                <Pressable style={styles.deleting} onPress={() => {
                                                    deleteItem(item.item_id)
                                                }}>
                                                    {/*<Text style={styles.textDeleting}>*/}
                                                    <Svg width={30} height={30} fill='red'>
                                                        <Path
                                                            d="M27,6h-6V5c0-1.654-1.346-3-3-3h-4c-1.654,0-3,1.346-3,3v1H5C3.897,6,3,6.897,3,8v1c0,0.552,0.448,1,1,1h24  c0.552,0,1-0.448,1-1V8C29,6.897,28.103,6,27,6z M13,5c0-0.551,0.449-1,1-1h4c0.551,0,1,0.449,1,1v1h-6V5z"
                                                            id="XMLID_246_"/>
                                                        <Path
                                                            d="M6,12v15c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V12H6z M19.707,22.293  c0.391,0.391,0.391,1.023,0,1.414s-1.023,0.391-1.414,0L16,21.414l-2.293,2.293c-0.391,0.391-1.023,0.391-1.414,0  s-0.391-1.023,0-1.414L14.586,20l-2.293-2.293c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0L16,18.586l2.293-2.293  c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L17.414,20L19.707,22.293z"
                                                            id="XMLID_249_"/>
                                                    </Svg>
                                                    {/*</Text>*/}
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
        borderRadius: 40,
        width: '80%',
        marginBottom: 20,
        alignSelf: 'center',
    },
    name: {
        justifyContent: 'flex-start',
        color: COLORS.green,
        fontSize: 20,
        // marginLeft: 5,
        // marginRight: 10,
        // borderColor: 'purple',
        // borderWidth: 2,
        width: '80%',
    },
    info: {
        fontSize: 16,
    },
    price: {},
    productBlock: {
        marginTop: 8,
        width: '100%',
    },
    nameProduct: {
        flexDirection: 'row',
    },
    infoProduct: {
        // width:'100%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        // marginLeft: 20,
        // borderColor: 'green',
        // borderWidth: 2
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
        backgroundColor: COLORS.purple,
        height: 30,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    textButtonBuy: {
        fontSize: 20,
    },
    border: {
        textAlign: 'center',
        borderColor: COLORS.white,
        borderTopWidth: 2,
        borderStyle: "dotted",
        borderRadius: 10,
        borderWidth: 0
    },
    dispenserAddress: {
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
        color: COLORS.yellow,
        borderBottomWidth: 1,
        borderColor: COLORS.white,
        backgroundColor: COLORS.green,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    noneActiveInfo: {
        display: 'none'
    },
    normalTriangle: {
        transform: [{translateX: 4}],
    },
    rotatedTriangle: {
        transform: [{rotate: "-90deg"}, {translateY: -4}],
    },
    finalCost: {
        fontSize: 20,
        color: COLORS.red
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
        // borderColor: 'green',
        // borderWidth: 2,
        // marginRight:10,
    },
    deleting: {
        height: 30,
        justifyContent: 'center',
        textAlign: 'center',
        // borderColor: 'black',
        // borderWidth: 1,
        // backgroundColor: COLORS.red,
        // marginRight: 5,
    },
    textDeleting: {
        color: "black",
        fontWeight: "700",
        // padding: 2
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