import ZAlert from "./components/alert/index.js";

const components = [ZAlert];

const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};
export default { install, ZAlert };
