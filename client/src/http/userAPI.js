import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, phone, firstname, lastname) =>{
    const {data} = await $host.post('api/user/registration', {email, password, phone, firstname, lastname})
    localStorage.setItem('accessToken', data.accessToken)
    return jwt_decode(data.accessToken)
}

export const login = async (email, password) =>{
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () =>{
    const response = await $host.post('api/user/registration' )
    return response
}
