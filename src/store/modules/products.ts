import {
    VuexModule,
    Module,
    getModule,
    MutationAction,
    Mutation,
    Action,
  } from "vuex-module-decorators";
  import store from "@/store";
  import { IProduct } from "@/store/models";
  
  @Module({
    namespaced: true,
    name: "products",
    store,
    dynamic: true,
  })
  class ProductsModule extends VuexModule {
    
  }
  
  export default getModule(ProductsModule);
  