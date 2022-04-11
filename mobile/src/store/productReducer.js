const defaultState = {
    products: [],
    dispenser: null,
    brand: null,
    size: null,
    actual: false
}

const ADD_PRODUCTS = 'ADD_PRODUCTS'
const SET_DISPENSER = 'SET_DISPENSER'
const SET_BRAND = 'SET_BRAND'
const SET_SIZE = 'SET_SIZE'
const REMOVE_FILTERS = 'REMOVE_FILTERS'

export const productReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PRODUCTS:
            return {...state, products: action.payload, actual: true}
        case SET_DISPENSER:
            return {...state, dispenser: action.payload, actual: false}
        case SET_BRAND:
            return {...state, brand: action.payload, actual: false}
        case SET_SIZE:
            return {...state, size: action.payload, actual: false}
        case REMOVE_FILTERS:
            return {...state, dispenser: null, brand: null, size: null, actual: false}
        default:
            return state
    }
}

export const addProductsAction = (payload) => ({type: ADD_PRODUCTS, payload})
export const setDispenserAction = (payload) => ({type: SET_DISPENSER, payload})
export const setBrandAction = (payload) => ({type: SET_BRAND, payload})
export const setSizeAction = (payload) => ({type: SET_SIZE, payload})
export const removeFiltersAction = () => ({type: REMOVE_FILTERS})