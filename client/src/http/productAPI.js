import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchBrands = async (brands) => {
    const {data} = await $host.get('api/product/brands', brands)
    return data
}

export const fetchSize = async (sizes) => {
    const {data} = await $host.get('api/product/sizes', sizes)
    return data
}

export const fetchProducts = async (products) => {
    const {data} = await $host.get('api/product/search', products)
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}


export const check = async () =>{
    const {data} = await $authHost.get('api/user' )
    localStorage.setItem('accessToken', data.accessToken)
    return jwt_decode(data.accessToken)
}