import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap-vue/src/index.scss";
// import "@fortawesome/fontawesome-free/scss/solid.scss";
// import "@fortawesome/fontawesome-free/scss/fontawesome.scss";
// import "vue-awesome/icons";
import "vue-awesome/icons/plus";
import "vue-awesome/icons/dollar-sign";
import Icon from "vue-awesome/components/Icon.vue";
// import BootstrapVue from "bootstrap-vue";
import { Layout } from "bootstrap-vue/src/components/layout";
import { Modal } from "bootstrap-vue/src/components/modal";
import { Table } from "bootstrap-vue/src/components/table";
import { Button } from "bootstrap-vue/src/components/button";
import { FormInput } from "bootstrap-vue/src/components/form-input";
import { Pagination } from "bootstrap-vue/src/components/pagination";
import "@/scss/main.scss";
// import "keen-ui/src/styles/imports.scss";

Vue.config.productionTip = false;
Vue.use(Layout);
Vue.use(Modal);
Vue.use(Table);
Vue.use(Button);
Vue.use(FormInput);
Vue.use(Pagination);
// Vue.use(BootstrapVue);
Vue.component("v-icon", Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
