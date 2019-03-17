import store from "@/store";
import { VuexModule, Module, getModule, Mutation, Action, MutationAction } from "vuex-module-decorators";
import { IProduct, IBuyProductCommand, ISellProductCommand, ISeacchInventoryOption, IFilterOption } from "@/store/models";
import { DynamicFilterFactory } from "@/components/filterOption/services";
import * as inventoryApi from "../api";
import { ColorsModule } from "@/store/modules/color";

@Module({
  namespaced: true,
  name: "product-inventory",
  store,
  dynamic: true,
})
class ProductInventoryModule extends VuexModule {
  filterFactory: DynamicFilterFactory = new DynamicFilterFactory();
  productInventories: Array<IProduct> = new Array<IProduct>();
  filteredInventories: Array<IProduct> = new Array<IProduct>();
  dynamicFilters: IFilterOption[] = [];
  inventoryFilterOption: ISeacchInventoryOption = {
    name: "",
    buyPrice: ""
  };
  itemsPerPage: number = 3;
  currentPage: number = 1;

  get getSelectedColor() {
    return (this.context.rootState.colors as ColorsModule).selectedColor;
  }

  @Mutation
  setCurrentPage(value: number) {
    this.currentPage = value;
  }

  @Mutation
  setItemPerPage(value: number) {
    this.itemsPerPage = value;
  }

  @Mutation
  setProductInventories(products: IProduct[]) {
    this.productInventories = products;
  }

  @Mutation
  setFilteredInventories(products: IProduct[]) {
    this.filteredInventories = products;
  }

  @Mutation
  setInventoryFilterOption(option: ISeacchInventoryOption) {
    this.inventoryFilterOption = option;
  }

  @Mutation
  setDynamicFilters(filters: IFilterOption[]) {
    this.dynamicFilters = filters;
  }

  @Action({ commit: "setFilteredInventories" })
  async searchInventoryDynamic() {
    if (this.dynamicFilters.length == 0)
      return this.productInventories;

    return this.productInventories.filter(item => {
      return this.dynamicFilters.every(filter => {
        var result = filter.method(item);
        // console.log("Run filter "
        //     + filter.name + "... | item: "
        //     + JSON.stringify(item[filter.fieldName])
        //     + " | compareValue: "
        //     + filter.defaultValue
        //     + " | result: " + result);

        return result;
      });
    });
  }
  
  @Action({ commit: "setFilteredInventories" })
  async searchInventory(option: ISeacchInventoryOption): Promise<Array<IProduct>> {
    if(!this.productInventories) return [];

    const filtered = this.productInventories.filter(item => {
      return Object.keys(option).every(key =>
      {
        return String(item[key]).toLowerCase().includes(option[key].toLowerCase());
      }
    )});
    
    return filtered.length > 0 ? filtered : [];
  }

  @Action({ commit: "setProductInventories" })
  async getAllInventory() {
    const products = await inventoryApi.getAllInventory();
    return products;
  }

  @MutationAction({ mutate: ["productInventories"] })
  async buy(product: IBuyProductCommand) {
    await inventoryApi.buy(product);
    const invetories = await inventoryApi.getAllInventory();
    return {
      productInventories: invetories
    }
  }

  @Action({ commit: "setProductInventories" })
  async buyInventory(product: IBuyProductCommand) {
    await inventoryApi.buy(product);
    return await inventoryApi.getAllInventory();
  }

  @Action({ commit: "setProductInventories" })
  async sellInventory(product: ISellProductCommand) {
    await inventoryApi.sell(product);
    return await inventoryApi.getAllInventory();
  }
}

export default getModule(ProductInventoryModule);
