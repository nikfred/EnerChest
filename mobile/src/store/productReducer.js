const defaultState = {
    products: [],
    dispenser: null,
    sizes: [],
    startSize: 0,
    finishSize: 0,
    selectedSizes: [],
    brand: [],
    actual: false,
}

const ADD_PRODUCTS = 'ADD_PRODUCTS'
const SET_DISPENSER = 'SET_DISPENSER'
const SET_SIZES = 'SET_SIZES'
const SET_START_SIZE = 'SET_START_SIZE'
const SET_FINISH_SIZE = 'SET_FINISH_SIZE'
const ADD_BRAND = 'ADD_BRAND'
const DELETE_BRAND = 'DELETE_BRAND'
const REMOVE_FILTERS = 'REMOVE_FILTERS'

export const productReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PRODUCTS:
            return {...state, products: action.payload, actual: true}

        case SET_DISPENSER:
            return {...state, dispenser: action.payload, actual: false}

        case SET_SIZES:
            return {...state, sizes: action.payload, startSize: 0, finishSize: action.payload?.length - 1, actual: false}

        case SET_START_SIZE:
            return {
                ...state,
                startSize: action.payload,
                selectedSizes: state.sizes?.slice(action.payload, state.finishSize + 1),
                actual: false
            }

        case SET_FINISH_SIZE:
            return {
                ...state,
                finishSize: action.payload,
                selectedSizes: state.sizes?.slice(state.startSize, action.payload + 1),
                actual: false
            }

        case ADD_BRAND:
            return {...state, brand: [...state.brand, action.payload], actual: false}

        case DELETE_BRAND:
            return {...state, brand: state.brand.filter(i => i !== action.payload), actual: false}

        case REMOVE_FILTERS:
            return {...state, dispenser: null, brand: [], startSize: 0, finishSize: state.sizes.length, actual: false}

        default:
            return state
    }
}

export const addProductsAction = (payload) => ({type: ADD_PRODUCTS, payload})
export const setDispenserAction = (payload) => ({type: SET_DISPENSER, payload})
export const setSizesAction = (payload) => ({type: SET_SIZES, payload})
export const setStartSizeAction = (payload) => ({type: SET_START_SIZE, payload})
export const setFinishSizeAction = (payload) => ({type: SET_FINISH_SIZE, payload})
export const addBrandAction = (payload) => ({type: ADD_BRAND, payload})
export const deleteBrandAction = (payload) => ({type: DELETE_BRAND, payload})
export const removeFiltersAction = () => ({type: REMOVE_FILTERS})