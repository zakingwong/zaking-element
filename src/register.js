import ZAlert from "./components/alert/index.js";
import ZAside from "./components/aside/index.js";
import ZButtonGroup from "./components/button-group/index.js";
import ZButton from "./components/button/index.js";
import ZCol from "./components/col/index.js";
import ZContainer from "./components/container/index.js";
import ZFooter from "./components/footer/index.js";
import ZHeader from "./components/header/index.js";
import ZLink from "./components/link/index.js";
import Loading from "./components/loading/index.js";
import ZMain from "./components/main/index.js";
import ZRow from "./components/row/index.js";
const components = [
  ZAlert,
  ZContainer,
  ZFooter,
  ZHeader,
  ZAside,
  ZMain,
  ZRow,
  ZCol,
  ZLink,
  ZButton,
  ZButtonGroup,
];

const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
  Vue.use(Loading.directive);
  Vue.prototype.$loading = Loading.service;
};
export default { install, ...components };
