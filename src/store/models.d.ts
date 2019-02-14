import { Guid } from "guid-typescript";

export interface IProduct{
    id: Guid;
    name: string;
    description: string;
    quantity: number,
    buyPrice: number,
    sellPrice: number,
    productColorId: Guid;
    productSizeId: Guid;
}

export interface IEnumModel {
    id: Guid;
    description: string;
}

export interface IBuyProductCommand {
    productId: Guid;
    quantity: number;
    buyPrice: number | null,
    sellPrice: number | null,
    productColorId: Guid | null;
    productSizeId: Guid | null;
}

export interface ISellProductCommand {
    productId: Guid;
    quantity: number;
    productColorId: Guid | null;
    productSizeId: Guid | null;
}
