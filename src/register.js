import ZAlert from "./components/alert/index.js";
import ZAside from "./components/aside/index.js";
import ZContainer from "./components/container/index.js";
import ZFooter from "./components/footer/index.js";
import ZHeader from "./components/header/index.js";
import ZMain from "./components/main/index.js";

const components = [ZAlert, ZContainer, ZFooter, ZHeader, ZAside, ZMain];

const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};
export default { install, ...components };
