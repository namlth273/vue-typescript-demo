import { VuexModule, Module, getModule, Mutation, Action, MutationAction } from "vuex-module-decorators";
import { IProduct, ISaveProduct } from "@/store/models";
import store from "@/store";
import { getAll, save } from "@/store/apis/product-api";
  
@Module({
  namespaced: true,
  name: "product-store",
  store,
  dynamic: true,
})
class ProductsModule extends VuexModule {
  products: Array<IProduct> = new Array<IProduct>();
  itemsPerPage: number = 3;
  currentPage: number = 1;

  get getItemsPerPage(): number {
    return this.itemsPerPage;
  }

  get getCurrentPage(): number {
    return this.currentPage;
  }

  get getProducts(): Array<IProduct> {
    return this.products;
  }

  @Mutation
  setItemPerPage(value: number) {
    this.itemsPerPage = value;
  }

  @Mutation
  setCurrentPage(value: number) {
    this.currentPage = value;
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
  async saveProduct(product: ISaveProduct) {
    await save(product);
    return await getAll();
  }
}

export default getModule(ProductsModule);
