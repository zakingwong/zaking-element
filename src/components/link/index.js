import ZLink from "./src/main";

/* istanbul ignore next */
ZLink.install = function (Vue) {
  Vue.component(ZLink.name, ZLink);
};

export default ZLink;
