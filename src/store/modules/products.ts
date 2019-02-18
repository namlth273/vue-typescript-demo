import {
    VuexModule,
    Module,
    getModule,
    Mutation,
    Action,
    MutationAction,
  } from "vuex-module-decorators";
import store from "@/store";
import { IProduct, IBuyProductCommand, ISellProductCommand } from "@/store/models";
import { getAll, buy, sell, getAllInventory } from "./product-api";
  
@Module({
  namespaced: true,
  name: "products",
  store,
  dynamic: true,
})
class ProductsModule extends VuexModule {
  products: IProduct[] | null = null;
  productInventories: IProduct[] | null = null;
  itemsPerPage: number = 5;
  currentPage: number = 1;

  get getItemsPerPage(): number {
    return this.itemsPerPage;
  }

  get getCurrentPage(): number {
    return this.currentPage;
  }

  get getProductInventories() {
    return this.productInventories;
  }

  get getProducts() {
    return this.products;
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

export default getModule(ProductsModule);
