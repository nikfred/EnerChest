import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View, ScrollView, Animated, RefreshControl} from 'react-native';
import {cancelOrder, completeOrder, getOrder} from "../../store/orderReducer";
import {useDispatch, useSelector} from "react-redux";
import {COLORS} from "../../utils/consts";
import {AntDesign} from "@expo/vector-icons";
import Swipable from "react-native-gesture-handler/Swipeable"
import {styles} from "./styles";
import DrawButtons from "./DrawButtons";
import DrawProductsBlock from "./DrawProductsBlock";
import CircularProgress from 'react-native-circular-progress-indicator';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

const Orders = () => {
    const orders = useSelector(state => state.order.orders)
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false);
    let row = []
    let swipe
    const closeRow = (index) => {
        if (swipe && swipe !== row[index]) {
            swipe.close();
        }
        swipe = row[index];
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getOrder())
        console.log('----------------------------------------------------------------------')
        orders.map(item => console.log(item))
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const leftAction = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        return (
            <View style={{width:'100%'}}>
                <Animated.Text style={{color: 'white', marginLeft: 30, transform: [{scale}]}}> <AntDesign
                    name="delete"
                    size={30}
                    color={'white'}/></Animated.Text>
            </View>
        )
    }
    const rightAction = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })
        return (
            <View style={{width:'100%'}}>
                <Animated.Text style={{color: 'white', marginRight: 30, transform: [{scale}]}}> <AntDesign
                    name="check"
                    size={30}
                    color={'white'}/></Animated.Text>
            </View>
        )
    }
    useEffect(() => {
        dispatch(getOrder())
        orders.map(item => console.log(item))
    }, [])

    const remainTime = (date) => {
        let a = new Date()
        let b = new Date(date)
        let c = Math.floor(b.getTime() - a.getTime())
        return (c/1000)
    }

    const getDate = (date) => {
         let a = new Date(date)
            // console.log(new Date(date).toLocaleString('en-GB', {timeZone: "Europe/Kiev"}))
            // console.log('-----------------------------------------------------------')
         return a.getDate() + '.'
             + a.getMonth() + '.'
             + a.getFullYear() + ' '
             + a.getHours() + ':'
             + a.getMinutes() + ':'
             + a.getSeconds()
     }
    const completeOrderRequest = (orderId) => {
        dispatch(completeOrder(orderId))
    }
    const cancelOrderRequest = (orderId) => {
        dispatch(cancelOrder(orderId))
    }
    const OrderItem = ({item}) => {
        return (
            <View style={styles.mainBlock}>
                <View
                    style={[styles.addressWrapperBase, styles.addressWrapperReady]}>
                    <View>
                        <Text style={styles.addressText}>{item?.address}</Text>
                        <Text style={styles.text}>  {item.status === 'Ready' ? getDate(item.date) : getDate(item.dateCancel)}</Text>
                        <Text style={styles.text}>  Total price = {item?.total} ₴</Text>
                    </View>

                    <View style={styles.dateWrapper}>
                        {item.status === 'Ready' ?
                            <CircularProgress
                                value={remainTime(item.dateCancel)}
                                radius={50}
                                duration={200}
                                progressValueColor={'white'}
                                maxValue={21600}
                                title={'remains'}
                                titleColor={'white'}
                                inActiveStrokeOpacity={0.5}
                                activeStrokeWidth={10}
                                inActiveStrokeWidth={5}
                                titleStyle={{fontWeight: 'bold'}}
                                progressFormatter={(value) => {
                                    'worklet';

                                    return Math.floor((value/3600)%6) + ':'
                                        + (Math.floor((value/60)%60)).toString().padStart(2, '0')  + ':'
                                        + (Math.floor(value%60)).toString().padStart(2, '0')
                                }}
                            />
                            :
                            <View style={styles.notReadyStatusWrapper}>
                                <View
                                    style={[styles.notReadyStatus, item.status === 'Cancel'
                                        ? styles.canceledStatus
                                        : styles.completedStatus]}>
                                    <Text style={styles.text}>
                                        {item.status === 'Cancel' ? item.status + 'ed' : item.status + 'd'} order
                                    </Text>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </View>
        )
    }
    return (
        <ScrollView style={styles.container}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
            {!orders.length ?
                <Text style={styles.noContent}>You don't have orders</Text>
                :
                        <>
                            {orders.map((item, index) => {

                                return (
                                    // item.status === 'Ready' ?
                                    //     <Swipable ref={ref => row[index] = ref} renderRightActions={rightAction}
                                    //               renderLeftActions={leftAction} useNativeAnimations={true}
                                    //                 onSwipeableOpen={() => {
                                    //         closeRow(index)
                                    //     }} onSwipeableWillOpen={(direction) => {
                                    //         direction==='right'?cancelOrderRequest(item?.id):completeOrderRequest(item.id)
                                    //         closeRow(index)
                                    //     }}>
                                    //         <OrderItem item={item} key={item?.id}/>
                                    //     </Swipable> :

                                    <Collapse>
                                        <CollapseHeader>
                                            <View>
                                                <OrderItem item={item} key={item?.id}/>
                                            </View>
                                        </CollapseHeader>

                                        <CollapseBody style={styles.mainCollapse}>
                                            <View style={styles.innerMainBlock}>
                                                <DrawProductsBlock products={item?.products}/>
                                            </View>
                                            <DrawButtons item={item}/>
                                        </CollapseBody>
                                    </Collapse>

                                )
                            })}
                        </>
                }

        </ScrollView>
    );
};


export default Orders;
