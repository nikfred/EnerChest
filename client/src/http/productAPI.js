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

export const fetchProducts = async () => {
    const {data} = await $host.get('api/product/search')
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}

export const fetchDispensers = async (id) => {
    const {data} = await $host.get('api/dispenser/product/' + id)
    return data
}
