import { VuexModule, Module, getModule, Mutation, Action, MutationAction } from "vuex-module-decorators";
import store from "@/store";
import { IProduct, IBuyProductCommand, ISellProductCommand, ISeacchInventoryOption, IFilterOption } from "@/store/models";
import { DynamicFilterFactory } from "@/components/filterOption/services";
import { buy, sell, getAllInventory } from "@/store/apis/product-api";
  
@Module({
  namespaced: true,
  name: "product-inventory-store",
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

  get getItemsPerPage(): number {
    return this.itemsPerPage;
  }

  get getCurrentPage(): number {
    return this.currentPage;
  }

  get getProductInventories(): Array<IProduct> {
    return this.productInventories;
  }

  get getInventoryFilterOption() {
    return this.inventoryFilterOption;
  }

  get getFilteredInventories() {
    return this.filteredInventories;
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
        var result = filter.method(item, filter.fieldName, filter.defaultValue);
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
    const products = await getAllInventory();
    return products;
  }

  @MutationAction({ mutate: ["productInventories"] })
  async buy(product: IBuyProductCommand) {
    await buy(product);
    const invetories = await getAllInventory();
    return {
      productInventories: invetories
    }
  }

  @Action({ commit: "setProductInventories" })
  async buyInventory(product: IBuyProductCommand) {
    await buy(product);
    return await getAllInventory();
  }

  @Action({ commit: "setProductInventories" })
  async sellInventory(product: ISellProductCommand) {
    await sell(product);
    return await getAllInventory();
  }
}

export default getModule(ProductInventoryModule);
