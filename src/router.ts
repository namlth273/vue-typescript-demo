import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "inventory",
      component: Home
    },
    {
      path: "/product",
      name: "product",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "product" */ "./views/Product.vue")
    },
    {
      path: "/iotmodule",
      name: "iotmodule",
      component: () =>
        import(/* webpackChunkName: "iot-module" */ "./views/IoTModule.vue")
    }
  ]
});
