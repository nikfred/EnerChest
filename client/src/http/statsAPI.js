import {$authHost, $host} from "./index";

export const statsOrder = async () => {
    const {data} = await $authHost.get('api/stats/orders')
    return data
}


export const statsProduct = async () => {
    const {data} = await $authHost.get('api/stats/products')
    return data
}

export const statsDispensers = async () => {
    const {data} = await $authHost.get('api/stats/dispensers')
    return data
}


export const fetchAllOrders = async () => {
    const {data} = await $host.get('api/product/search')
    return data
}

