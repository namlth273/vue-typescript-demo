import Vue from "vue";
// import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap-vue/src/index.scss";
// import "@fortawesome/fontawesome-free/scss/solid.scss";
// import "@fortawesome/fontawesome-free/scss/fontawesome.scss";
// import "vue-awesome/icons";
import "vue-awesome/icons/plus";
import "vue-awesome/icons/dollar-sign";
import "vue-awesome/icons/pen";
import Icon from "vue-awesome/components/Icon.vue";
// import BootstrapVue from "bootstrap-vue";
import BLayout from "bootstrap-vue/src/components/layout";
import BModal from "bootstrap-vue/src/components/modal";
import BTable from "bootstrap-vue/src/components/table";
import BButton from "bootstrap-vue/src/components/button";
import BFormInput from "bootstrap-vue/src/components/form-input";
import BPagination from "bootstrap-vue/src/components/pagination";
import BFormSelect from "bootstrap-vue/src/components/form-select";
import VeeValidate from "vee-validate";
import "@/scss/main.scss";

// import "keen-ui/src/styles/imports.scss";
const config = {
  aria: true,
  classNames: {
    valid: "is-valid",
    invalid: "is-invalid"
  },
  classes: true,
  delay: 0,
  dictionary: null,
  errorBagName: "veeErrors", // change if property conflicts
  events: "input|blur",
  fieldsBagName: "veeFields",
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: "validations", // the nested key under which the validation messages will be located
  inject: true,
  locale: "en",
  validity: false
};

Vue.config.productionTip = false;
Vue.use(BLayout);
Vue.use(BModal);
Vue.use(BTable);
Vue.use(BButton);
Vue.use(BFormInput);
Vue.use(BPagination);
Vue.use(BFormSelect);
Vue.use(VeeValidate, config);
// Vue.use(BootstrapVue);
Vue.component("v-icon", Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

if (process.env.NODE_ENV === "development") {
  console.log("In Dev Mode");
}

console.log(process.env.VUE_APP_BASE_URI);