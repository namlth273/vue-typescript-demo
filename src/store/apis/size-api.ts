import baseApi from "@/store/api";
import { IEnumModel } from "../models";

export async function getAll(): Promise<IEnumModel[]> {
    const response = await baseApi.post("/size/getall");
    return response.data as IEnumModel[];
}
