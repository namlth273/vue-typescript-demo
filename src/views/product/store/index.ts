import { VuexModule, Module, getModule, Mutation, Action, MutationAction } from "vuex-module-decorators";
import { IProduct, ISaveProduct, ISeacchInventoryOption } from "@/store/models";
import store from "@/store";
import * as productApi from "../api";
  
@Module({
  namespaced: true,
  name: "products",
  store,
  dynamic: true,
})
class ProductsModule extends VuexModule {
  products: Array<IProduct> = new Array<IProduct>();
  filteredProducts: Array<IProduct> = new Array<IProduct>();
  itemsPerPage: number = 3;
  currentPage: number = 1;
  filterOption: ISaveProduct = {} as ISaveProduct;

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

  @Mutation
  setFilterOption(option: ISaveProduct) {
    this.filterOption = option;
  }

  @Mutation
  search() {
    if (this.products.length > 0) {
      const filtered = this.products.filter(item => {
        return Object.keys(this.filterOption).every(key =>
        {
          return String(item[key]).toLowerCase().includes(this.filterOption[key].toLowerCase());
        }
      )});
      
      this.filteredProducts = filtered.length > 0 ? filtered : [];
    }
  }

  @Action({ commit: "setProducts" })
  async getAll() {
    const products = await productApi.getAll();
    return products;
  }

  @Action({ commit: "setProducts" })
  async saveProduct(product: ISaveProduct) {
    await productApi.save(product);
    return await productApi.getAll();
  }
}

export default getModule(ProductsModule);
