import {
    VuexModule,
    Module,
    getModule,
    Mutation,
    Action,
  } from "vuex-module-decorators";
import store from "@/store";
import { IProduct } from "@/store/models";
import { getAll } from "./product-api";
  
@Module({
  namespaced: true,
  name: "products",
  store,
  dynamic: true,
})
class ProductsModule extends VuexModule {
  products: IProduct[] | null = null;

  get getProducts() {
    return this.products;
  }

  @Mutation
  setProducts(products: IProduct[]) {
    this.products = products;
  }
  
  @Action({ commit: "setProducts" })
  async getAll() {
    const products = await getAll();
    return products;
  }
}

export default getModule(ProductsModule);
