import {
    VuexModule,
    Module,
    getModule,
    Mutation,
    Action,
  } from "vuex-module-decorators";
import store from "@/store";
import { IProduct, IBuyProductCommand, ISellProductCommand } from "@/store/models";
import { getAll, buy, sell } from "./product-api";
  
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

  @Action({ commit: "setProducts" })
  async buy(product: IBuyProductCommand) {
    await buy(product);
    return await getAll();
  }

  @Action({ commit: "setProducts" })
  async sell(product: ISellProductCommand) {
    await sell(product);
    return await getAll();
  }
}

export default getModule(ProductsModule);
