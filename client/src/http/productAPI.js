import {$authHost, $host} from "./index";

export const fetchBrands = async (brands) => {
    const {data} = await $host.get('api/product/brands', brands)
    return data
}

export const fetchSize = async (sizes) => {
    const {data} = await $host.get('api/product/sizes', sizes)
    return data
}

export const createProducts = async (products) => {
    const {data} = await $authHost.post('/api/product/create', products)
    return data
}

export const connectProducts = async () => {
    const {data} = await $host.get('api/product/all')
    return data
}

export const fetchProduct = async (brand, size, page, limit = 5 ) => {
    const {data} = await $host.get('api/product/search',{params: {brand, size, page, limit}})
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}

export const fetchDispensers = async () => {
    const {data} = await $host.get('api/dispenser/all')
    return data
}

export const fetchDispensersWithProduct = async (id) => {
    const {data} = await $host.get('api/dispenser/product/' + id)
    return data
}

export const addToDispenser = async (product) => {
    const {data} = await $authHost.post('api/dispenser/add/', product)
    return data
}

export const updateProduct = async (id, product) => {
    const {data} = await $authHost.put('/api/product/update/' + id, product )
    return data
}


