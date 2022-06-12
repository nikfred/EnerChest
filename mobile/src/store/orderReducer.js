import {canceledOrder, completionOrder, fetchOrder} from "../http/userAPI";

const SET_ORDERS = 'SET_ORDERS'
const COMPLETE_ORDER_SUCCESS = 'COMPLETE_ORDER_SUCCESS'
const CANCEL_ORDER_SUCCESS = 'CANCEL_ORDER_SUCCESS'

const initialState = {
    orders: []
}
const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case COMPLETE_ORDER_SUCCESS:
            return {
                ...state,
                orders: state.orders.map(item => {
                    if (item.order.id === action.payload) {
                        item.order.status = 'Complete'
                    }
                    return item
                })
            }
        case CANCEL_ORDER_SUCCESS:
            return {
                ...state,
                orders: state.orders.map(item => {
                    if (item.order.id === action.payload) {
                        item.order.status = 'Cancel'
                    }
                    return item
                })
            }
    }
    return state
}

const setOrders = (payload) => {
    return {type: SET_ORDERS, payload}
}
const completeOrderSuccess = (payload) => {
    return {type: COMPLETE_ORDER_SUCCESS, payload}
}
const cancelOrderSuccess = (payload) => {
    return {type: CANCEL_ORDER_SUCCESS, payload}
}

export const getOrder = () => {
    return (dispatch) => {
        fetchOrder().then(response => {
            dispatch(setOrders(response))
        })
    }
}
export const completeOrder = (orderId) => {
    return (dispatch) => {
        completionOrder(orderId).then(response => {
            dispatch(completeOrderSuccess(orderId))
        })
    }
}
export const cancelOrder = (orderId) => {
    return (dispatch) => {
        canceledOrder(orderId).then(response => {
            dispatch(cancelOrderSuccess(orderId))
        })
    }
}
export default orderReducer