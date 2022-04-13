import { enableAutoDestroy } from "@vue/test-utils";
import Vue from "vue";
import loadingRaw from "../../components/loading/index";
import { getStyle } from "../../utils/dom";
import { createVue } from "../util";
const Loading = loadingRaw.service;

enableAutoDestroy(afterEach);

describe("Loading", () => {
  let wrapper, loadingInstance, loadingInstance2;

  afterEach(() => {
    if (loadingInstance) {
      loadingInstance.close();
      loadingInstance.$el &&
        loadingInstance.$el.parentNode &&
        loadingInstance.$el.parentNode.removeChild(loadingInstance.$el);
    }
    if (loadingInstance2) {
      loadingInstance2.close();
      loadingInstance2.$el &&
        loadingInstance2.$el.parentNode &&
        loadingInstance2.$el.parentNode.removeChild(loadingInstance2.$el);
    }
  });

  describe("as a directive", () => {
    it("create", async () => {
      wrapper = createVue({
        template: `
        <div v-loading="loading"></div>
      `,
        data() {
          return {
            loading: true,
          };
        },
      });
      await Vue.nextTick();
      const mask = wrapper.findComponent(".z-loading-mask");
      expect(mask.exists()).toBeTruthy();
      await wrapper.setData({ loading: false });
      expect(mask.attributes().style).toEqual("display: none;");
    });
    it("unbind", async () => {
      const wrapper1 = createVue({
        template: `
        <div v-if="show" v-loading="loading"></div>
      `,

        data() {
          return {
            show: true,
            loading: true,
          };
        },
      });
      const wrapper2 = createVue({
        template: `
        <div v-if="show" v-loading.body="loading"></div>
      `,

        data() {
          return {
            show: true,
            loading: true,
          };
        },
      });
      await Vue.nextTick();
      await wrapper1.setData({ loading: false, show: false });
      await wrapper2.setData({ loading: false, show: false });
      await Vue.nextTick();
      expect(wrapper1.findComponent(".z-loading-mask").exists()).toBe(false);
      expect(wrapper2.findComponent(".z-loading-mask").exists()).toBe(false);
    });
    it("body", async () => {
      wrapper = createVue(
        {
          template: `
        <div v-loading.body="loading"></div>
      `,

          data() {
            return {
              loading: true,
            };
          },
        },
        true
      );
      await Vue.nextTick();
      const mask = document.querySelector(".z-loading-mask");
      expect(mask.parentNode === document.body).toBe(true);
      await wrapper.setData({ loading: false });
      document.body.removeChild(mask);
      document.body.removeChild(wrapper.vm.$el);
    });
    it("fullscreen", async () => {
      wrapper = createVue(
        {
          template: `
        <div v-loading.fullscreen="loading"></div>
      `,

          data() {
            return {
              loading: true,
            };
          },
        },
        true
      );
      await Vue.nextTick();
      const mask = document.querySelector(".z-loading-mask");
      expect(mask.parentNode === document.body).toBe(true);
      expect(mask.classList).toContain("is-fullscreen");
      await wrapper.setData({ loading: false });
      document.body.removeChild(mask);
      document.body.removeChild(wrapper.vm.$el);
    });
    it("lock", async () => {
      wrapper = createVue(
        {
          template: `
        <div v-loading.fullscreen.lock="loading"></div>
      `,

          data() {
            return {
              loading: true,
            };
          },
        },
        true
      );
      await Vue.nextTick();
      console.log(
        document.body.style.overflow,
        'getStyle(document.body, "overflow")'
      );
      expect(getStyle(document.body, "overflow")).toEqual("hidden");
      await wrapper.setData({ loading: false });
      document.body.removeChild(document.querySelector(".z-loading-mask"));
      document.body.removeChild(wrapper.vm.$el);
    });

    it("text", async () => {
      wrapper = createVue(
        {
          template: `
        <div v-loading="loading" zlement-loading-text="拼命加载中"></div>
      `,

          data() {
            return {
              loading: true,
            };
          },
        },
        true
      );
      await Vue.nextTick();
      const mask = document.querySelector(".z-loading-mask");
      const text = mask.querySelector(".z-loading-text");
      expect(text).toBeDefined();
      expect(text.textContent).toEqual("拼命加载中");
    });

    it("customClass", async () => {
      wrapper = createVue(
        {
          template: `
        <div v-loading="loading" zlement-loading-custom-class="loading-custom-class"></div>
      `,

          data() {
            return {
              loading: true,
            };
          },
        },
        true
      );
      await Vue.nextTick();
      const mask = document.querySelector(".z-loading-mask");
      expect(mask.classList.contains("loading-custom-class")).toBe(true);
    });
  });
  describe("as a service", () => {
    test("create", () => {
      loadingInstance = Loading();
      expect(document.querySelector(".z-loading-mask")).toBeDefined();
    });
    test("close", () => {
      loadingInstance = Loading();
      loadingInstance.close();
      expect(loadingInstance.visible).toBe(false);
    });
    test("target", async () => {
      wrapper = createVue(
        {
          template: `
        <div class="loading-container"></div>
      `,
        },
        true
      );
      loadingInstance = Loading({ target: ".loading-container" });
      let mask = document.querySelector(".z-loading-mask");
      let container = document.querySelector(".loading-container");
      expect(mask).toBeDefined();
      expect(mask.parentNode).toEqual(container);
      loadingInstance.close();
      await Vue.nextTick();
      expect(getStyle(container, "position")).toEqual("relative");
    });
    test("body", () => {
      wrapper = createVue(
        {
          template: `
        <div class="loading-container"></div>
      `,
        },
        true
      );
      loadingInstance = Loading({
        target: ".loading-container",
        body: true,
      });
      let mask = document.querySelector(".z-loading-mask");
      expect(mask).toBeDefined();
      expect(mask.parentNode).toEqual(document.body);
    });
    it("fullscreen", () => {
      loadingInstance = Loading({ fullScreen: true });
      const mask = document.querySelector(".z-loading-mask");
      expect(mask.parentNode).toEqual(document.body);
      expect(mask.classList.contains("is-fullscreen")).toBe(true);
    });

    it("fullscreen singleton", async () => {
      loadingInstance = Loading({ fullScreen: true });
      await Vue.nextTick();
      loadingInstance2 = Loading({ fullScreen: true });
      await Vue.nextTick();
      let masks = document.querySelectorAll(".z-loading-mask");
      expect(masks.length).toEqual(1);
      loadingInstance2.close();
      await Vue.nextTick();
      masks = document.querySelectorAll(".z-loading-mask");
      expect(masks.length).toEqual(0);
    });

    it("lock", () => {
      loadingInstance = Loading({ lock: true });
      expect(getStyle(document.body, "overflow")).toEqual("hidden");
    });

    it("text", () => {
      loadingInstance = Loading({ text: "Loading..." });
      const text = document.querySelector(".z-loading-text");
      expect(text).toBeDefined();
      expect(text.textContent).toEqual("Loading...");
    });

    it("customClass", () => {
      loadingInstance = Loading({ customClass: "z-loading-custom-class" });
      const customClass = document.querySelector(".z-loading-custom-class");
      expect(customClass).toBeDefined();
    });
  });
});
