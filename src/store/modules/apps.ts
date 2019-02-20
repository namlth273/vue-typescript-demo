import {
    VuexModule,
    Module,
    getModule,
    Mutation,
} from "vuex-module-decorators";
import store from "@/store";

@Module({
    namespaced: true,
    name: "apps",
    store,
    dynamic: true,
})
class AppsModule extends VuexModule {
    isLoading: boolean = false;

    get getIsLoading() {
        return this.isLoading;
    }

    @Mutation
    setIsLoading(value: boolean) {
        this.isLoading = value;
    }
}

export default getModule(AppsModule);
