const defaultState = {
    isAdmin: false,
    isAuth: false,
    totalPrice: 0,
    user: {"firstname": "КОБІЛА"},
}

const SET_AUTH = 'SET_AUTH'
const SET_USER = 'SET_USER'
const SET_ADMIN = 'ADMIN'

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {...state, isAuth: action.payload}
        case SET_USER:
            return {...state, user: action.payload}
        case SET_ADMIN:
            return {...state, isAdmin: action.payload}
        default:
            return state
    }
}

export const setAuthAction = (payload) => ({type: SET_AUTH, payload})
export const setUserAction = (payload) => ({type: SET_USER, payload})
export const setAdminAction = (payload) => ({type: SET_ADMIN, payload})