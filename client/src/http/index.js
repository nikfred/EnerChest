import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')} `
    return config
}

const cookieInterceptor = config => {
    config.headers.cookie = document.cookie
    return config
}

$authHost.interceptors.request.use(authInterceptor)

//$host.interceptors.request.use(cookieInterceptor)

export {
    $host,
    $authHost
}