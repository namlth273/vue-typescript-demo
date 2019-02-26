import { IBaseFilterService, IFilterOption, IProduct, IDictionary, IDynamicFilterField, IDynamicThirdColumnFieldType } from "@/store/models";
import { Guid } from "guid-typescript";
import moment from "moment";

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
            defaultValue: this.defaultValue,
            method: (item: IProduct): boolean => {
                return String(item[this.fieldName]).toLowerCase() == this.defaultValue.toLowerCase();
            }
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
            defaultValue: this.defaultValue,
            method: (item: IProduct): boolean => {
                return String(item[this.fieldName]).toLowerCase() != this.defaultValue.toLowerCase();
            }
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
            defaultValue: this.defaultValue,
            method: (item: IProduct): boolean => {
                return String(item[this.fieldName]).toLowerCase().includes(this.defaultValue.toLowerCase());
            }
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
            defaultValue: this.defaultValue,
            method: (item: IProduct): boolean => {
                return String(item[this.fieldName]).toLowerCase().startsWith(this.defaultValue.toLowerCase());
            }
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
            defaultValue: this.defaultValue,
            method: (item: IProduct): boolean => {
                return Number(item[this.fieldName]) > this.defaultValue;
            }
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
            defaultValue: this.defaultValue,
            method: (item: IProduct): boolean => {
                return Number(item[this.fieldName]) < this.defaultValue;
            }
        }
    }
}

export class EqualsToCheckedFilterService implements IBaseFilterService {
    id: Guid = Guid.createEmpty();
    name: string = "Equals to checked";
    fieldName: string = "";
    defaultValue: any;

    createFilter(): IFilterOption {
        return {
            id: this.id,
            name: this.name,
            fieldName: this.fieldName,
            defaultValue: this.defaultValue,
            method: (item: IProduct): boolean => {
                return Boolean(item[this.fieldName]) == true;
            }
        }
    }
}

export class NotEqualsToCheckedFilterService implements IBaseFilterService {
    id: Guid = Guid.createEmpty();
    name: string = "Not equals to checked";
    fieldName: string = "";
    defaultValue: any;

    createFilter(): IFilterOption {
        return {
            id: this.id,
            name: this.name,
            fieldName: this.fieldName,
            defaultValue: this.defaultValue,
            method: (item: IProduct): boolean => {
                return Boolean(item[this.fieldName]) == false;
            }
        }
    }
}

export class DateEqualsToFilterService implements IBaseFilterService {
    id: Guid = Guid.createEmpty();
    name: string = "Date equals to";
    fieldName: string = "";
    defaultValue: any;

    createFilter(): IFilterOption {
        return {
            id: this.id,
            name: this.name,
            fieldName: this.fieldName,
            defaultValue: this.defaultValue,
            method: (item: IProduct): boolean => {
                return moment((item[this.fieldName])).isSame(this.defaultValue, "day");
            }
        }
    }
}

export class DateGreaterThanFilterService implements IBaseFilterService {
    id: Guid = Guid.createEmpty();
    name: string = "Date greater than";
    fieldName: string = "";
    defaultValue: any;

    createFilter(): IFilterOption {
        return {
            id: this.id,
            name: this.name,
            fieldName: this.fieldName,
            defaultValue: this.defaultValue,
            method: (item: IProduct): boolean => {
                return moment((item[this.fieldName])).isAfter(this.defaultValue, "day");
            }
        }
    }
}

export class DateLessThanFilterService implements IBaseFilterService {
    id: Guid = Guid.createEmpty();
    name: string = "Date less than";
    fieldName: string = "";
    defaultValue: any;

    createFilter(): IFilterOption {
        return {
            id: this.id,
            name: this.name,
            fieldName: this.fieldName,
            defaultValue: this.defaultValue,
            method: (item: IProduct): boolean => {
                return moment((item[this.fieldName])).isBefore(this.defaultValue, "day");
            }
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
        this.strategies.add(EnumFilterService.EqualsToChecked, new EqualsToCheckedFilterService());
        this.strategies.add(EnumFilterService.NotEqualsToChecked, new NotEqualsToCheckedFilterService());
        this.strategies.add(EnumFilterService.DateEqualsTo, new DateEqualsToFilterService());
        this.strategies.add(EnumFilterService.DateGreaterThan, new DateGreaterThanFilterService());
        this.strategies.add(EnumFilterService.DateLessThan, new DateLessThanFilterService());
    }

    create2ndFieldOptions(): IDynamicFilterField {
        var fields: IDynamicFilterField = {};

        fields[EnumFilterField.Name] = [
            { text: "Equal to", value: EnumFilterService.EqualsTo },
            { text: "Not equal", value: EnumFilterService.NotEquals },
            { text: "Begins with", value: EnumFilterService.BeginsWith },
            { text: "Contains", value: EnumFilterService.Contains },
        ];
        fields[EnumFilterField.Description] = [
            { text: "Contains", value: EnumFilterService.Contains },
        ];
        fields[EnumFilterField.Quantity] = [
            { text: "Greater than", value: EnumFilterService.GreaterThan },
            { text: "Less than", value: EnumFilterService.LessThan }
        ];
        fields[EnumFilterField.IsDeleted] = [
            { text: "Equal to", value: EnumFilterService.EqualsToChecked },
            { text: "Not equal", value: EnumFilterService.NotEqualsToChecked }
        ];
        fields[EnumFilterField.CreatedDate] = [
            { text: "Equal to", value: EnumFilterService.DateEqualsTo },
            { text: "Greater than", value: EnumFilterService.DateGreaterThan },
            { text: "Less than", value: EnumFilterService.DateLessThan }
        ];

        return fields;
    }

    create3rdFieldOptions(): IDynamicThirdColumnFieldType {
        var fields: IDynamicThirdColumnFieldType = {};

        fields[EnumFilterField.Name] = EnumThirdColumnFieldType.Text;
        fields[EnumFilterField.Description] = EnumThirdColumnFieldType.Text;
        fields[EnumFilterField.Quantity] = EnumThirdColumnFieldType.Text;
        fields[EnumFilterField.IsDeleted] = EnumThirdColumnFieldType.Checked;
        fields[EnumFilterField.CreatedDate] = EnumThirdColumnFieldType.Date;

        return fields;
    }
}

export enum EnumFilterService {
    EqualsTo,
    NotEquals,
    BeginsWith,
    Contains,
    GreaterThan,
    LessThan,
    EqualsToChecked,
    NotEqualsToChecked,
    DateEqualsTo,
    DateGreaterThan,
    DateLessThan
}

export enum EnumFilterField {
    Name = "name",
    Description = "description",
    Quantity = "quantity",
    IsDeleted = "isDeleted",
    CreatedDate = "createdDate"
}

export enum EnumThirdColumnFieldType {
    Text,
    Checked,
    Date
}
