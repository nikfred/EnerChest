import axios from "axios";

const $host = axios.create({
    baseURL: 'http://34.118.89.28:5000/'
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')} `
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}