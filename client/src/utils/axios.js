import axios from "axios";
import applyCaseMiddleware from 'axios-case-converter';

const getToken = () => window.localStorage.getItem('accessToken');

const axiosInstance = applyCaseMiddleware(axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
}));

axiosInstance.interceptors.request.use((config) => {
    const accessToken = getToken();
    if (accessToken) {
        config.headers.Authorization = accessToken;
    }

    return config;
});

export default axiosInstance;
