import baseApi from "@/store/api";
import { IProductColor } from "../models";

export async function getAll(): Promise<Array<IProductColor>> {
    const response = await baseApi.post("/color/getall");
    return response.data as Array<IProductColor>;
}
