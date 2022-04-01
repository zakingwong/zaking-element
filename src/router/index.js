import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/alert",
    name: "Alert",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "alert" */ "../views/alert/index.vue"),
  },
  {
    path: "/container",
    name: "Container",
    component: () =>
      import(
        /* webpackChunkName: "container" */ "../views/container/index.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
