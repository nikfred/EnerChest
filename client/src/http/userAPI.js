import {$authHost, $host, deleteAllCookies} from "./index";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, phone, firstname, lastname, birth_date) =>{
    const {data} = await $host.post('api/user/registration', {email, password, phone, firstname, lastname, birth_date})
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
    const refreshToken = localStorage.getItem('refreshToken')?.toString() || ""
    const response = await $authHost.post('api/user/logout', {refreshToken: refreshToken})
    console.log(response)
    localStorage.setItem('accessToken', 'a')
    localStorage.setItem('refreshToken', 's')
    return response
}
