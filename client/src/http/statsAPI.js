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


export const fetchAllOrders = async (status,  limit, page ) => {
    const {data} = await $host.get('api/product/search',{params: {status, page, limit}})
    return data
}

