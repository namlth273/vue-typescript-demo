import {
    VuexModule,
    Module,
    getModule,
    Mutation,
    Action,
  } from "vuex-module-decorators";
import store from "@/store";
import { IEnumModel } from "@/store/models";
import { getAll } from "./color-api";
  
@Module({
  namespaced: true,
  name: "colors",
  store,
  dynamic: true,
})
class ColorsModule extends VuexModule {
  colors: IEnumModel[] | null = null;

  get getColors() {
    return this.colors;
  }

  @Mutation
  setColors(colors: IEnumModel[]) {
    this.colors = colors;
  }
  
  @Action({ commit: "setColors" })
  async getAll() {
    const colors = await getAll();
    return colors;
  }
}

export default getModule(ColorsModule);
