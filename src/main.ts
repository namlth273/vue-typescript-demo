import Vue from "vue";
// import "./plugins/vuetify";
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
import BLayout from "bootstrap-vue/src/components/layout";
import BModal from "bootstrap-vue/src/components/modal";
import BTable from "bootstrap-vue/src/components/table";
import BButton from "bootstrap-vue/src/components/button";
import BFormInput from "bootstrap-vue/src/components/form-input";
import BPagination from "bootstrap-vue/src/components/pagination";
import BFormSelect from "bootstrap-vue/src/components/form-select";

import "@/scss/main.scss";

// import "keen-ui/src/styles/imports.scss";

Vue.config.productionTip = false;
Vue.use(BLayout);
Vue.use(BModal);
Vue.use(BTable);
Vue.use(BButton);
Vue.use(BFormInput);
Vue.use(BPagination);
Vue.use(BFormSelect);
// Vue.use(BootstrapVue);
Vue.component("v-icon", Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
