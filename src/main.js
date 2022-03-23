import Vue from "vue";
import App from "./App.vue";
import { components } from "./register";
import router from "./router";
import store from "./store";
components.forEach((component) => {
  Vue.component(component.name, component);
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
