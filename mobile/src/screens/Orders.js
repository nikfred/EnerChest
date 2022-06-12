import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, View, ScrollView} from 'react-native';
import {cancelOrder, completeOrder, getOrder} from "../store/orderReducer";
import {useDispatch, useSelector} from "react-redux";
import {COLORS} from "../utils/consts";

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
                <Pressable onPress={() => completeOrderRequest(item.order.id)}>
                    <View>
                        <Text style={styles.textButtonComplete}>
                            Complete</Text>
                    </View>
                </Pressable>
                <View style={styles.totalPriceWrapper}>
                    <Text>Total price is {item.order.total} ₴</Text>
                </View>
                <Pressable onPress={() => cancelOrderRequest(item.order.id)}>
                    <View>
                        <Text style={styles.textButtonCancel}>
                            Cancel</Text>
                    </View>
                </Pressable>
            </View>
        } else {
            return <View style={styles.notReadyStatusWrapper}>
                <View style={styles.totalPriceWrapper}>
                    <Text>
                        Total price was {item.order.total} ₴
                    </Text>
                </View>
                <View
                    style={[styles.notReadyStatus, item.order.status === 'Cancel'
                        ? styles.canceledStatus
                        : styles.completedStatus]}>
                    <Text>
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
        // alignItems: 'center',
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
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
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
        color: COLORS.yellow
    },
    addressWrapperBase: {
        width: '100%',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    addressWrapperReady: {
        backgroundColor: COLORS.purple,
    },
    addressWrapperCompleted: {
        backgroundColor: COLORS.green,
    },
    addressWrapperCanceled: {
        backgroundColor: COLORS.red,
    },
    addressText: {
        color: COLORS.yellow,
        fontSize: 22,
    },
    dateWrapper: {
        alignItems: 'center'
    },
    textButtonComplete: {
        textAlignVertical: "center",
        textAlign: 'center',
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        width: 100,
        height: 30,
        backgroundColor: COLORS.green
    },
    textButtonCancel: {
        textAlignVertical: "center",
        textAlign: 'center',
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        width: 100,
        height: 30,
        backgroundColor: COLORS.red,
    },
    notReadyStatusWrapper: {
        alignItems: 'center'
    },
    notReadyStatus: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
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