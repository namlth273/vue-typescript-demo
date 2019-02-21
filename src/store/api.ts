import axios from "axios";
import apps from "@/store/modules/apps";

export const baseApi = axios.create({
    baseURL: process.env.VUE_APP_BASE_URI
    // baseURL: "https://namlth-demo-api.azurewebsites.net/api"
});

baseApi.interceptors.request.use(
    (config) => {
        apps.setIsLoading(true);
        return config;
    },
    // (error) => {
    //     apps.setIsLoading(false);
    //     return Promise.reject(error);
    // }
);

baseApi.interceptors.response.use(
    (config) => {
        apps.setIsLoading(false);
        return config;
    },
    // (error) => {
    //     apps.setIsLoading(false);
    //     return Promise.reject(error);
    // }
);