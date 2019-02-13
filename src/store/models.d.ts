import { Guid } from "guid-typescript";

export interface IProduct{
    id: Guid;
    name: string;
    description: string;
    quantity: number
}

export interface IBuyProductCommand {
    productId: Guid;
    quantity: number;
}

export interface ISellProductCommand {
    productId: Guid;
    quantity: number;
}
