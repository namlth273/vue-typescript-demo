import { baseApi } from "@/store/api";
import { IProduct, ISellProductCommand, IBuyProductCommand } from "../models";

export async function getAll(): Promise<IProduct[]> {
    const response = await baseApi.post("/product/getall");
    return response.data as IProduct[];
}

export async function buy(product: IBuyProductCommand): Promise<void> {
    await baseApi.post("/product/buy",
        product
    );
}

export async function sell(product: ISellProductCommand): Promise<void> {
    await baseApi.post("/product/sell",
        product
    );
}