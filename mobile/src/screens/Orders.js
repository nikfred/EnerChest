import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, View, ScrollView} from 'react-native';
import {cancelOrder, completeOrder, getOrder} from "../store/orderReducer";
import {useDispatch, useSelector} from "react-redux";
import {COLORS} from "../utils/consts";
import {AntDesign} from "@expo/vector-icons";

const Orders = () => {
    const orders = useSelector(state => state.order.orders)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrder())
    }, [])

    const DrawProductsBlock = (props) => {
        return (
            <View>
                {props.products.map(product => {
                    return (
                        <View key={product.id}>
                            <Text style={styles.nameProduct}>{product.brand + ' ' + product.name}</Text>
                            <View style={styles.nameWithPriceWrapper}>
                                <Text>{product.quantity} units X {product.price}/unit</Text>
                                <Text style={styles.totalPricePerUnit}>{product.quantity * product.price} ₴</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }
    const DrawButtons = ({item}) => {
        const completeOrderRequest = (orderId) => {
            dispatch(completeOrder(orderId))
        }
        const cancelOrderRequest = (orderId) => {
            dispatch(cancelOrder(orderId))
        }

        if (item.order.status === 'Ready') {
            return <View style={styles.totalPriceWithStatusWrapper}>
                <Pressable style={{...styles.button, ...styles.buttonComplete}}
                           onPress={() => completeOrderRequest(item.order.id)}>
                    <Text style={styles.textButton}>
                        Complete <AntDesign name="check" size={20} color={COLORS.white}/></Text>
                </Pressable>
                <View style={styles.totalPriceWrapper}>
                    <Text>Total price = {item.order.total} ₴</Text>
                </View>
                <Pressable style={{...styles.button, ...styles.buttonCancel}}
                           onPress={() => cancelOrderRequest(item.order.id)}>
                    <Text style={styles.textButton}>
                        Cancel <AntDesign name="close" size={20} color={COLORS.white}/></Text>
                </Pressable>
            </View>
        } else {
            return <View style={styles.notReadyStatusWrapper}>
                <View style={styles.totalPriceWrapper}>
                    <Text>
                        Total price = {item.order.total} ₴
                    </Text>
                </View>
                <View
                    style={[styles.notReadyStatus, item.order.status === 'Cancel'
                        ? styles.canceledStatus
                        : styles.completedStatus]}>
                    <Text style={styles.text}>
                        {item.order.status === 'Cancel' ? item.order.status + 'ed' : item.order.status + 'd'} order
                    </Text>
                </View>
            </View>
        }
    }
    const getDate = (date) => {
        let a = new Date(date)
        return a.getDate() + '.'
            + a.getMonth() + '.'
            + a.getFullYear() + ' '
            + a.getHours() + ':'
            + a.getMinutes() + ':'
            + a.getSeconds()
    }
    return (
        <ScrollView style={styles.container}>
            {orders.map(item => {
                return (
                    <View style={styles.mainBlock} key={item.order.id}>
                        <View
                            style={[styles.addressWrapperBase,
                                item.order.status === 'Cancel'
                                    ? styles.addressWrapperCanceled
                                    : item.order.status === 'Complete'
                                        ? styles.addressWrapperCompleted
                                        : styles.addressWrapperReady]}>
                            <Text style={styles.addressText}>{item.order.address}</Text>
                        </View>
                        <View style={styles.innerMainBlock}>
                            <View style={styles.dateWrapper}>
                                <Text>{getDate(item.order.date)}</Text>
                            </View>
                            <DrawProductsBlock products={item.products}/>
                        </View>
                        <DrawButtons item={item}/>
                    </View>
                )
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
        // alignItems: 'center',
    },
    text: {
        color: COLORS.white
    },
    totalPriceWithStatusWrapper: {
        flexDirection: 'row',
        // alignItems:'center',
        justifyContent: 'space-between'
    },
    totalPriceWrapper: {
        justifyContent: 'center',
        marginBottom: 5,
    },
    mainBlock: {
        backgroundColor: COLORS.lightgray,
        width: '100%',
        marginBottom: 20,
        borderRadius: 10,
    },
    innerMainBlock: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
    },
    nameWithPriceWrapper: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    totalPricePerUnit: {
        fontSize: 17,
        color: COLORS.black
    },
    addressWrapperBase: {
        width: '100%',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    addressWrapperReady: {
        backgroundColor: COLORS.gray,
    },
    addressWrapperCompleted: {
        // backgroundColor: COLORS.green,
        backgroundColor: COLORS.gray,
    },
    addressWrapperCanceled: {
        // backgroundColor: COLORS.red,
        backgroundColor: COLORS.gray,
    },
    addressText: {
        color: COLORS.white,
        fontSize: 20,
        margin: 6
    },
    dateWrapper: {
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 30,
    },
    buttonComplete: {
        backgroundColor: COLORS.green,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    buttonCancel: {
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: COLORS.red,
    },
    textButton: {
        color: COLORS.white,
        fontSize: 16,
    },
    notReadyStatusWrapper: {
        alignItems: 'center'
    },
    notReadyStatus: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    canceledStatus: {
        backgroundColor: COLORS.red,
    },
    completedStatus: {
        backgroundColor: COLORS.green,
    },
    statusCancel: {
        backgroundColor: COLORS.red,
    },
    statusComplete: {
        backgroundColor: COLORS.green,
    },
    nameProduct: {
        color: COLORS.green,
        fontSize: 20,
    }
});

export default Orders;
