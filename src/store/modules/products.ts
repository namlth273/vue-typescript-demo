import {
    VuexModule,
    Module,
    getModule,
    Mutation,
    Action,
    MutationAction,
  } from "vuex-module-decorators";
import store from "@/store";
import { IProduct, IBuyProductCommand, ISellProductCommand, ISeacchInventoryOption } from "@/store/models";
import { getAll, buy, sell, getAllInventory } from "./product-api";
  
@Module({
  namespaced: true,
  name: "products",
  store,
  dynamic: true,
})
class ProductsModule extends VuexModule {
  products: Array<IProduct> = new Array<IProduct>();
  productInventories: Array<IProduct> = new Array<IProduct>();
  filteredInventories: Array<IProduct> = new Array<IProduct>();
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

  get getProducts(): Array<IProduct> {
    return this.products;
  }

  get getInventoryFilterOption() {
    return this.inventoryFilterOption;
  }

  get getFilteredInventories() {
    return this.filteredInventories;
  }

  @Mutation
  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  @Mutation
  setProducts(products: IProduct[]) {
    this.products = products;
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
  
  @Action({ commit: "setProducts" })
  async getAll() {
    const products = await getAll();
    return products;
  }

  @Action({ commit: "setProductInventories" })
  async getAllInventory() {
    const products = await getAllInventory();
    return products;
  }

  @MutationAction({ mutate: ["products", "productInventories"] })
  async buy(product: IBuyProductCommand) {
    await buy(product);
    const invetories = await getAllInventory();
    const prods = await getAll();
    return {
      products: prods,
      productInventories: invetories
    }
  }

  @Action
  async buyInventory(product: IBuyProductCommand) {
    await buy(product);
    // return await getAllInventory();
  }

  @Action({ commit: "setProductInventories" })
  async sellInventory(product: ISellProductCommand) {
    await sell(product);
    return await getAllInventory();
  }
}

export default getModule(ProductsModule);
