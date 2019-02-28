import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import VeeValidate from "vee-validate";
import Buefy from "buefy";
import "@/scss/main.scss";

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
Vue.use(VeeValidate, config);
Vue.use(Buefy);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

if (process.env.NODE_ENV === "development") {
  console.log("In Dev Mode");
}

console.log(process.env.VUE_APP_BASE_URI);