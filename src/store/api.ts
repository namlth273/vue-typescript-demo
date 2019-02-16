import axios from "axios";

export const baseApi = axios.create({
    baseURL: "/api"
    // baseURL: "https://namlth-demo-api.azurewebsites.net/api"
});
