import {deleteItemFromCard, fetchCart} from "../http/userAPI";

const SET_DATA = 'SET_DATA'
const ADD_DISPENSERS = 'ADD_DISPENSERS'
const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS'

const initialState = {
    data: {},
    dispensers: [],
}
const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                data: {...action.payload}
            }
        case ADD_DISPENSERS:
            return {
                ...state,
                dispensers: action.payload
            }
        case DELETE_PRODUCT_SUCCESS:
            let tmp = state.dispensers
                .filter(dispenser => { //if the element to be removed is the only one in the dispenser
                    return (!(dispenser.items.length === 1 && dispenser.items[0].item_id === action.payload));
                })
                .map(dispenser => ({//it needs for case when element to be removed isn`t only one in the dispenser
                    dispenser_id: dispenser.dispenser_id,
                    items: dispenser.items.filter(item => item.item_id !== action.payload)
                }))
            return {
                ...state, dispensers: tmp
            }
        default:
            return state
    }
}

export const setData = (payload) => {
    return {type: SET_DATA, payload}
}
export const addDispensers = (payload) => {
    return {type: ADD_DISPENSERS, payload}
}
export const deleteProductSuccess = (payload) => {
    return {type: DELETE_PRODUCT_SUCCESS, payload}
}
export const fetchingCart = () => {//getting all cart
    return (dispatch) => {
        fetchCart().then(response => {
            const set = [...(new Set(response.products.map(i => i.dispenser_id)))]
            const set1 = set.map(i => i = {dispenser_id: i, items: response.products.filter(e => e.dispenser_id === i)})
            dispatch(addDispensers(set1))
            // console.log('end putting response into dispensers')
        })
    }
}
export const deleteProduct = (productId) => {
    return (dispatch) => {
        deleteItemFromCard(productId).then(() => {
            dispatch(deleteProductSuccess(productId))
        })
    }
}
export default basketReducer
