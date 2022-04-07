import {$authHost, $host} from "./index";

export const fetchBrands = async (brands) => {
    const {data} = await $host.get('api/product/brands', brands)
        .catch(e => console.log(e))
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

export const fetchProduct = async (brand, size, page, limit = 8) => {
    const {data} = await $host.get('api/product/search', {params: {brand, size, page, limit}})
        .catch(e => console.log(e))
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}

export const updateProduct = async (id, product) => {
    const {data} = await $authHost.put('/api/product/update/' + id, product)
    return data
}

export const fetchRating = async (id) => {
    const {data} = await $host.get('api/review/rating/' + id)
    return data
}

export const fetchReviews = async (id) => {
    const {data} = await $host.get('api/review/' + id)
    return data
}

export const createReview = async (review) => {
    const {data} = await $authHost.post('api/review/', review)
    return data
}

export const deleteReview = async (id) => {
    const {data} = await $authHost.delete('api/review/' + id)
    return data
}



