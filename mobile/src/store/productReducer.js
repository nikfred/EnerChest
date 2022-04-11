const defaultState = {
    products: [],
    dispenser: null,
    brand: [],
    size: [],
    actual: false
}

const ADD_PRODUCTS = 'ADD_PRODUCTS'
const SET_DISPENSER = 'SET_DISPENSER'
const ADD_BRAND = 'ADD_BRAND'
const DELETE_BRAND = 'ADD_BRAND'
const ADD_SIZE = 'ADD_SIZE'
const REMOVE_FILTERS = 'REMOVE_FILTERS'

export const productReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PRODUCTS:
            return {...state, products: action.payload, actual: true}
        case SET_DISPENSER:
            return {...state, dispenser: action.payload, actual: false}
        case ADD_BRAND:
            return {...state, brand: [...state.brand, action.payload], actual: false}
        case DELETE_BRAND:
            return {...state, brand: state.brand.filter(i => i !== action.payload), actual: false}
        case ADD_SIZE:
            return {...state, size: [...state.size, action.payload], actual: false}
        case REMOVE_FILTERS:
            return {...state, dispenser: null, brand: [], size: [], actual: false}
        default:
            return state
    }
}

export const addProductsAction = (payload) => ({type: ADD_PRODUCTS, payload})
export const setDispenserAction = (payload) => ({type: SET_DISPENSER, payload})
export const addBrandAction = (payload) => ({type: ADD_BRAND, payload})
export const deleteBrandAction = (payload) => ({type: DELETE_BRAND, payload})
export const addSizeAction = (payload) => ({type: ADD_SIZE, payload})
export const removeFiltersAction = () => ({type: REMOVE_FILTERS})