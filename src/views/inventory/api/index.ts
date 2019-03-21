import baseApi from "@/store/api";
import { IProduct, ISellProductCommand, IBuyProductCommand } from "@/store/models";

export async function getAllInventory(): Promise<IProduct[]> {
    const response = await baseApi.post("/productinventory/getall");
    return response.data as IProduct[];
}

export async function buy(product: IBuyProductCommand): Promise<void> {
    await baseApi.post("/productinventory/buy",
        product
    );
}

export async function sell(product: ISellProductCommand): Promise<void> {
    await baseApi.post("/productinventory/sell",
        product
    );
}
