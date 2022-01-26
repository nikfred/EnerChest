import {$authHost, $host} from "./index";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, phone, firstname, lastname, gender, birth_date) =>{
    const {data} = await $host.post('api/user/registration', {email, password, phone, firstname, lastname, gender, birth_date})
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('accessToken', data.refreshToken)
    return jwt_decode(data.accessToken)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    console.log(data)
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    return jwt_decode(data.accessToken)
}

export const check = async () =>{
    const refreshToken = localStorage.getItem('refreshToken')?.toString() || ""
    const {data} = await axios.post(process.env.REACT_APP_API_URL + 'api/user/refresh', {refreshToken: refreshToken})
    console.log(data)
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    return jwt_decode(data.accessToken)
}

export const fetchUser = async () => {
    const {data} = await $authHost.get('api/user')
    console.log(data)
    return data
}

export const logout = async () =>{
    localStorage.removeItem('refreshToken')
    const refreshToken = localStorage.getItem('refreshToken')?.toString() || ""
    const response = await $authHost.post('api/user/logout', {refreshToken: refreshToken})
    localStorage.removeItem('accessToken')
    console.log(response)

    return response
}

export const fetchCart = async () => {
    const {data} = await $authHost.get('api/cart')
    console.log(data)
    return data
}

export const addToCart = async (cartItem) => {
    const {data} = await $authHost.post('api/cart/add', cartItem)
    console.log(data)
    return data
}

export const deleteProductFromCard = async (id) => {
    const {data} = await $authHost.delete('api/cart/' + id)
    return data
}

export const updateUser = async (user) =>{
    const {data} = await $authHost.put('api/user', user)
    return data
}

export const createOrder = async () => {
    const {data} = await $authHost.post('api/order/create')
    return data
}

export const fetchOrder = async () => {
    const {data} = await $authHost.get('/api/order')
    return data
}

export const canceledOrder = async (id) => {
    const {data} = await $authHost.get('/api/order/canceled/' + id)
    return data
}

export const completionOrder = async (id) => {
    const {data} = await $authHost.get('/api/order/completion/' + id)
    return data
}



