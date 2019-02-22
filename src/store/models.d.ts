import { Guid } from "guid-typescript";

export interface ISelectOption {
    text: string;
    value: any;
}

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

export interface ISaveProduct {
    id: Guid | null;
    name: string;
    description: string;
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

export interface IProductColor extends IEnumModel {
    colorType: number;
}

export interface IProductSize extends IEnumModel {
    sizeType: number;
}

export interface IIotModule {
    transaction: string;
    name: string;
    lastConnection: string;
}

export interface ISeacchInventoryOption {
    name: string,
    buyPrice: string
}

export interface IDynamicFilterField {
    [key: string] : ISelectOption[],
}

export interface IDynamicFilterOption {
    id: Guid;
    fields: IDynamicFilterField;
    selectedField: string | null;
    selectedFilter: any;
    comparingValue: any;
}

export interface IFilterOption {
    id: Guid;
    name: string;
    fieldName: string;
    method: Function;
    defaultValue: any;
}

export interface IBaseFilterService {
    id: Guid;
    name: string,
    fieldName: string | null;
    defaultValue: any;
    createFilter(): IFilterOption;
}

export interface IDictionary<TKey, T> {
    add(key: TKey, value: T): void;
    remove(key: TKey): void;
    containsKey(key: TKey): boolean;
    keys(): TKey[];
    values(): T[];
}
