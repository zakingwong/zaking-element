import { createLocalVue, createWrapper, mount } from "@vue/test-utils";
import zaking_element from "../register";

const localVue = createLocalVue();
localVue.use(zaking_element);
let id = 0;

const createElm = function () {
  const elm = document.createElement("div");
  elm.id = "app" + ++id;
  document.body.appendChild(elm);
  return elm;
};

/**
 * 创建一个 Vue 的实例对象
 * @param  {Object|String}  Compo   组件配置，可直接传 template
 * @param  {Boolean=false} mounted 是否添加到 DOM 上
 * @return {Object} vm
 */
export const createVue = function (Compo, mounted = false) {
  if (Object.prototype.toString.call(Compo) === "[object String]") {
    Compo = { template: Compo };
  }
  return mount(Compo, {
    localVue,
    attachTo: mounted === false ? null : createElm(),
  });
};

/**
 * 创建一个测试组件实例
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  Compo          - 组件对象
 * @param  {Object}  propsData      - props 数据
 * @param  {Boolean=false} mounted  - 是否添加到 DOM 上
 * @return {Object} vm
 */
export const createTest = function (Compo, propsData = {}, mounted = false) {
  // 这里重载了一下，判断参数的类型
  if (propsData === true || propsData === false) {
    mounted = propsData;
    propsData = {};
  }
  const elm = createElm();
  const Ctor = localVue.extend(Compo);

  return createWrapper(
    new Ctor({ propsData }).$mount(mounted === false ? null : elm)
  );
};
