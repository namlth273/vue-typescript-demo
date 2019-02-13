import {
    VuexModule,
    Module,
    getModule,
    Mutation,
    Action,
  } from "vuex-module-decorators";
import store from "@/store";
import { IEnumModel } from "@/store/models";
import { getAll } from "./size-api";
  
@Module({
  namespaced: true,
  name: "sizes",
  store,
  dynamic: true,
})
class SizesModule extends VuexModule {
  sizes: IEnumModel[] | null = null;

  get getSizes() {
    return this.sizes;
  }

  @Mutation
  setSizes(sizes: IEnumModel[]) {
    this.sizes = sizes;
  }
  
  @Action({ commit: "setSizes" })
  async getAll() {
    const sizes = await getAll();
    return sizes;
  }
}

export default getModule(SizesModule);
