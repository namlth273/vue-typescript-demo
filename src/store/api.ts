import axios from "axios";

export const baseApi = axios.create({
    baseURL: "https://namlth-demo-api.azurewebsites.net/api",
});
