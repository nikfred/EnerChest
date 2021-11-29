import {$authHost, $host} from "./index";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, phone, firstname, lastname) =>{
    const {data} = await $host.post('api/user/registration', {email, password, phone, firstname, lastname})
    document.cookie = `refreshToken=${data.refreshToken}`
    localStorage.setItem('accessToken', data.accessToken)
    return jwt_decode(data.accessToken)
}

export const login = async (email, password) => {
    const response = await $host.post('api/user/login', {email, password})
    console.log(response)
    localStorage.setItem('accessToken', response.data.accessToken)
    localStorage.setItem('refreshToken', response.data.refreshToken)
    return jwt_decode(response.data.accessToken)
}

export const check = async () =>{
    const refreshToken = localStorage.getItem('refreshToken')?.toString() || ""
    document.cookie = 'refreshToken=' + refreshToken
    document.cookie.replace('refreshToken',refreshToken)
    console.log('Cookie = ' + document.cookie)
    const response = await axios.get(process.env.REACT_APP_API_URL + 'api/user/refresh', {withCredentials: true})
    console.log(response)
    localStorage.setItem('accessToken', response.data.accessToken)
    localStorage.setItem('refreshToken', response.data.refreshToken)
    return jwt_decode(response.data.accessToken)
}
