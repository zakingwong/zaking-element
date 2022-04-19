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
  // Basic
  {
    path: "/container",
    name: "Container",
    component: () =>
      import(
        /* webpackChunkName: "container" */ "../views/container/index.vue"
      ),
  },
  {
    path: "/layout",
    name: "Layout",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/index.vue"),
  },
  {
    path: "/link",
    name: "Link",
    component: () =>
      import(/* webpackChunkName: "link" */ "../views/link/index.vue"),
  },
  {
    path: "/button",
    name: "Button",
    component: () =>
      import(/* webpackChunkName: "button" */ "../views/button/index.vue"),
  },
  // Notice
  {
    path: "/alert",
    name: "Alert",
    component: () =>
      import(/* webpackChunkName: "alert" */ "../views/alert/index.vue"),
  },
  {
    path: "/loading",
    name: "Loading",
    component: () =>
      import(/* webpackChunkName: "loading" */ "../views/loading/index.vue"),
  },
  {
    path: "/message",
    name: "Message",
    component: () =>
      import(/* webpackChunkName: "message" */ "../views/message/index.vue"),
  },
  {
    path: "/messageBox",
    name: "MessageBox",
    component: () =>
      import(
        /* webpackChunkName: "message-box" */ "../views/message-box/index.vue"
      ),
  },
  {
    path: "/notification",
    name: "Notification",
    component: () =>
      import(
        /* webpackChunkName: "message" */ "../views/notification/index.vue"
      ),
  },
  {
    path: "/radio",
    name: "Radio",
    component: () =>
      import(/* webpackChunkName: "radio" */ "../views/radio/index.vue"),
  },
  {
    path: "/checkbox",
    name: "Checkbox",
    component: () =>
      import(/* webpackChunkName: "checkbox" */ "../views/checkbox/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
