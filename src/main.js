import "@/assets/common/global.scss";
import "@/assets/fonts/icon.scss";
import Vue from "vue";
import App from "./App.vue";
import zaking_element from "./register";
import router from "./router";
import store from "./store";

Vue.use(zaking_element);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
