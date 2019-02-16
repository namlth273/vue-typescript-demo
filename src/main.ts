import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/scss/bootstrap.scss";
// import "@fortawesome/fontawesome-free/scss/solid.scss";
// import "@fortawesome/fontawesome-free/scss/fontawesome.scss";
// import "vue-awesome/icons";
import "vue-awesome/icons/plus";
import "vue-awesome/icons/dollar-sign";
import Icon from "vue-awesome/components/Icon.vue";
import BootstrapVue from "bootstrap-vue";
import "@/scss/main.scss";
// import "keen-ui/src/styles/imports.scss";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.component("v-icon", Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
