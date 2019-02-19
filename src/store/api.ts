import axios from "axios";

export const baseApi = axios.create({
    baseURL: process.env.VUE_APP_BASE_URI
    // baseURL: "https://namlth-demo-api.azurewebsites.net/api"
});
