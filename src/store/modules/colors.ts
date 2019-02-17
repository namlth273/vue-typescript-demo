import {
    VuexModule,
    Module,
    getModule,
    Mutation,
    Action,
  } from "vuex-module-decorators";
import store from "@/store";
import { IProductColor } from "@/store/models";
import { getAll } from "./color-api";
  
@Module({
  namespaced: true,
  name: "colors",
  store,
  dynamic: true,
})
class ColorsModule extends VuexModule {
  colors: Array<IProductColor> = new Array<IProductColor>();
  selectedColor: IProductColor = {} as IProductColor;

  get getColors() {
    return this.colors;
  }

  get getSelectedColor() {
    return this.selectedColor;
  }

  @Mutation
  setColors(colors: Array<IProductColor>) {
    this.colors = colors;
  }

  @Mutation
  SETSELECTEDCOLOR(selectedColor: IProductColor) {
    this.selectedColor = selectedColor;
  }
  
  @Action({ commit: "setColors" })
  async getAll() {
    const colors = await getAll();
    return colors;
  }
}

export default getModule(ColorsModule);
