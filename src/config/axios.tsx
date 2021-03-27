import axios, { AxiosRequestConfig } from "axios";

export const axiosInitialOptions: AxiosRequestConfig = {
    method: 'get'
};

const axiosIntsance = axios.create({
    // baseURL: BASE_URL already in proxy
});

export default axiosIntsance;


