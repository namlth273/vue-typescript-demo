import Vue from "vue";
import Router from "vue-router";
import Layout from "@/views/layout/index.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "iot",
      redirect: "/",
      component: Layout,
      children: [
        {
          path: "/",
          component: () => import(/* webpackChunkName: "home" */ "@/views/home/index.vue"),
        },
        {
          path: "inventory",
          component: () => import(/* webpackChunkName: "inventory" */ "@/views/inventory/index.vue"),
        },
        {
          path: "product",
          component: () => import(/* webpackChunkName: "product" */ "@/views/product/index.vue"),
        }
        ,
        {
          path: "radar",
          component: () => import(/* webpackChunkName: "radar" */ "@/views/radar/index.vue"),
        }
      ]
    }
  ]
});
