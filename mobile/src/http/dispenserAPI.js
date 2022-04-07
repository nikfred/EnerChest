import {$authHost, $host} from "./index";

export const fetchDispensers = async () => {
    const {data} = await $host.get('api/dispenser/all')
    // console.log(data)
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




