import { IBaseFilterService, IFilterOption, IProduct, IDictionary } from "@/store/models";
import { Guid } from "guid-typescript";

export class EqualsToFilterService implements IBaseFilterService {
    id: Guid = Guid.createEmpty();
    name: string = "Equals to";
    fieldName: string = "";
    defaultValue: any;

    createFilter(): IFilterOption {
        return {
            id: this.id,
            name: this.name,
            fieldName: this.fieldName,
            method: (item: IProduct, fieldName: string, defaultValue: string): boolean => {
                return String(item[fieldName]).toLowerCase() == defaultValue.toLowerCase();
            },
            defaultValue: this.defaultValue
        }
    }
}

export class NotEqualsToFilterService implements IBaseFilterService {
    id: Guid = Guid.createEmpty();
    name: string = "Not Equals";
    fieldName: string = "";
    defaultValue: any;
    
    createFilter(): IFilterOption {
        return {
            id: this.id,
            name: this.name,
            fieldName: this.fieldName,
            method: (item: IProduct, fieldName: string, defaultValue: string): boolean => {
                return String(item[fieldName]).toLowerCase() != defaultValue.toLowerCase();
            },
            defaultValue: this.defaultValue
        }
    }
}

export class ContainsFilterService implements IBaseFilterService {
    id: Guid = Guid.createEmpty();
    name: string = "Contains";
    fieldName: string = "";
    defaultValue: any;
    
    createFilter(): IFilterOption {
        return {
            id: this.id,
            name: this.name,
            fieldName: this.fieldName,
            method: (item: IProduct, fieldName: string, defaultValue: string): boolean => {
                return String(item[fieldName]).toLowerCase().includes(defaultValue.toLowerCase());
            },
            defaultValue: this.defaultValue
        }
    }
}

export class BeginsWithFilterService implements IBaseFilterService {
    id: Guid = Guid.createEmpty();
    name: string = "Begins with";
    fieldName: string = "";
    defaultValue: any;
    
    createFilter(): IFilterOption {
        return {
            id: this.id,
            name: this.name,
            fieldName: this.fieldName,
            method: (item: IProduct, fieldName: string, defaultValue: string): boolean => {
                return String(item[fieldName]).toLowerCase().startsWith(defaultValue.toLowerCase());
            },
            defaultValue: this.defaultValue
        }
    }
}

export class GreaterThanFilterService implements IBaseFilterService {
    id: Guid = Guid.createEmpty();
    name: string = "Greater than";
    fieldName: string = "";
    defaultValue: any;
    
    createFilter(): IFilterOption {
        return {
            id: this.id,
            name: this.name,
            fieldName: this.fieldName,
            method: (item: IProduct, fieldName: string, defaultValue: number): boolean => {
                return Number(item[fieldName]) > defaultValue;
            },
            defaultValue: this.defaultValue
        }
    }
}

export class LessThanFilterService implements IBaseFilterService {
    id: Guid = Guid.createEmpty();
    name: string = "Less than";
    fieldName: string = "";
    defaultValue: any;
    
    createFilter(): IFilterOption {
        return {
            id: this.id,
            name: this.name,
            fieldName: this.fieldName,
            method: (item: IProduct, fieldName: string, defaultValue: number): boolean => {
                return Number(item[fieldName]) < defaultValue;
            },
            defaultValue: this.defaultValue
        }
    }
}

export class Dictionary<TKey extends any, T> implements IDictionary<TKey, T> {
    _keys: TKey[] = [];
    _values: T[] = [];

    constructor(init?: { key: TKey | any; value: T; }[]) {
        if (init) {
            for (var x = 0; x < init.length; x++) {
            this[init[x].key] = init[x].value;
            this._keys.push(init[x].key);
            this._values.push(init[x].value);
            }
        }
    }

    add(key: TKey | any, value: T) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    remove(key: TKey | any) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    keys(): TKey[] {
        return this._keys;
    }

    values(): T[] {
        return this._values;
    }

    containsKey(key: TKey | any) {
        if (typeof this[key] === "undefined") {
            return false;
        }

        return true;
    }

    toLookup(): IDictionary<TKey, T> {
        return this;
    }
}

export class DynamicFilterFactory {
    strategies: IDictionary<EnumFilterService, IBaseFilterService> = new Dictionary<EnumFilterService, IBaseFilterService>();

    constructor() {
        this.strategies.add(EnumFilterService.EqualsTo, new EqualsToFilterService());
        this.strategies.add(EnumFilterService.NotEquals, new NotEqualsToFilterService());
        this.strategies.add(EnumFilterService.BeginsWith, new BeginsWithFilterService());
        this.strategies.add(EnumFilterService.Contains, new ContainsFilterService());
        this.strategies.add(EnumFilterService.GreaterThan, new GreaterThanFilterService());
        this.strategies.add(EnumFilterService.LessThan, new LessThanFilterService());
    }
}

export enum EnumFilterService {
    EqualsTo,
    NotEquals,
    BeginsWith,
    Contains,
    GreaterThan,
    LessThan
}

export enum EnumFilterField {
    Name = "name",
    Description = "description",
    Quantity = "quantity"
}