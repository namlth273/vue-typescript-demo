import axios from "axios";
import apps from "@/store/modules/apps";

const baseApi = axios.create({
    baseURL: process.env.VUE_APP_BASE_URI
});

baseApi.interceptors.request.use(
    (config) => {
        apps.setIsLoading(true);
        return config;
    },
    (error) => {
        apps.setIsLoading(false);
        return Promise.reject(error);
    }
);

baseApi.interceptors.response.use(
    (response) => {
        apps.setIsLoading(false);
        return response;
    },
    (error) => {
        apps.setIsLoading(false);
        console.log(error.response.data);
        return Promise.reject(error);
    }
);

export default baseApi;
