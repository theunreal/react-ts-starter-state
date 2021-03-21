import axios, { AxiosRequestConfig } from "axios";

export const axiosInitialOptions: AxiosRequestConfig = {
    method: 'get'
};

const BASE_URL = 'http://localhost:3001';

const instance = axios.create({
    baseURL: BASE_URL
});

export default instance;


