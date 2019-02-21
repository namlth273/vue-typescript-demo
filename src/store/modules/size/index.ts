import {
    VuexModule,
    Module,
    getModule,
    Mutation,
    Action,
  } from "vuex-module-decorators";
import store from "@/store";
import { IProductSize } from "@/store/models";
import { getAll } from "@/store/apis/size-api";
  
@Module({
  namespaced: true,
  name: "sizes",
  store,
  dynamic: true,
})
class SizesModule extends VuexModule {
  sizes: Array<IProductSize> = new Array<IProductSize>();
  selectedSize: IProductSize = {} as IProductSize;

  get getSizes() {
    return this.sizes;
  }

  get getSelectedSize() {
    return this.selectedSize;
  }

  @Mutation
  setSizes(sizes: IProductSize[]) {
    this.sizes = sizes;
  }
  
  @Mutation
  SETSELECTEDSIZE(selectedSize: IProductSize) {
    this.selectedSize = selectedSize;
  }
  
  @Action({ commit: "setSizes" })
  async getAll() {
    const sizes = await getAll();
    return sizes;
  }
}

export default getModule(SizesModule);
