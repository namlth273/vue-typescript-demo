import { baseApi } from "@/store/api";
import { IProduct } from "../models";

export async function getAll(): Promise<IProduct[]> {
    const response = await baseApi.post("/product/getall", {
        crossdomain: true,
        proxy: {
            host: "localhost",
            port: 11872
        }});
    return response.data as IProduct[];
}