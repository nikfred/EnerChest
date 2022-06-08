import {$authHost, $host} from "./index";
import axios from "axios";
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registration = async (email, password, phone, firstname, lastname, gender, birth_date) =>{
    const {data} = await $host.post('api/user/registration', {email, password, phone, firstname, lastname, gender, birth_date})
    Storage.setItem('accessToken', data.accessToken)
    await AsyncStorage.setItem('accessToken', data.refreshToken)
    return jwt_decode(data.accessToken)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    console.log(data.refreshToken)
    await AsyncStorage.setItem('accessToken', data.accessToken)
    await AsyncStorage.setItem('refreshToken', data.refreshToken)
    return jwt_decode(data.accessToken)
}

export const check = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken') || ""
    console.log(await AsyncStorage.getItem('refreshToken'))
    const data = await axios.post('http://34.118.89.28:5000/api/user/refresh', { refreshToken: refreshToken })
    await AsyncStorage.setItem('accessToken', data.data.accessToken)
    await AsyncStorage.setItem('refreshToken', data.data.refreshToken)
    return jwt_decode(data.data.accessToken)
}

export const fetchUser = async () => {
    const {data} = await $authHost.get('api/user')
    console.log(data)
    return data
}

export const logout = async () =>{
    await AsyncStorage.removeItem('refreshToken')
    const refreshToken = await AsyncStorage.getItem('refreshToken')?.toString() || ""
    const response = await $authHost.post('api/user/logout', {refreshToken: refreshToken})
    await AsyncStorage.removeItem('accessToken')
    console.log(response)

    return response
}

export const fetchCart = async () => {
    const {data} = await $authHost.get('api/cart')
    // console.log(data)
    return data
}

export const addToCart = async (cartItem) => {
    const {data} = await $authHost.post('api/cart/add', cartItem)
    console.log(data)
    return data
}

export const deleteItemFromCard = async (id) => {
    const {data} = await $authHost.delete('api/cart/' + id)
    return data
}

export const updateUser = async (user) =>{
    const {data} = await $authHost.put('api/user', user)
    return data
}

export const createOrder = async (dispenser_id) => {
    const {data} = await $authHost.post('api/order/create', {dispenser_id})
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



