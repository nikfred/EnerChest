import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const $host = axios.create({
    baseURL: 'http://192.168.1.108:5000/'
})

const $authHost = axios.create({
    baseURL: 'http://192.168.1.108:5000/'
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