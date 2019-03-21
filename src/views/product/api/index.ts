import baseApi from "@/store/api";
import { IProduct, ISaveProduct } from "@/store/models";

export async function getAll(): Promise<IProduct[]> {
    const response = await baseApi.post("/product/getall");
    return response.data as IProduct[];
}

export async function save(product: ISaveProduct): Promise<void> {
    await baseApi.post("/product/save",
        product
    );
}
