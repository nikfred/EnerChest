import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const $host = axios.create({
    baseURL: 'http://188.166.73.5:5005/'
})

const $authHost = axios.create({
    baseURL: 'http://188.166.73.5:5005/'
})

const authInterceptor = async (config) => {
    config.headers.authorization = `Bearer ${await AsyncStorage.getItem('accessToken')} `
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}