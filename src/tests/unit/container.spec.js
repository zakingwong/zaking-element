import { enableAutoDestroy } from "@vue/test-utils";
import Aside from "../../components/aside";
import Container from "../../components/container";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Main from "../../components/main";
import { createTest, createVue } from "../util";

enableAutoDestroy(afterEach);

describe("Container", () => {
  let wrapper;

  it("create", () => {
    wrapper = createTest(Container, true);
    expect(wrapper.exists()).toBe(true);
  });

  it("vertical", () => {
    wrapper = createVue(
      {
        template: `
          <z-container>
            <z-header></z-header>
            <z-main></z-main>
          </z-container>
        `,
      },
      true
    );
    expect(wrapper.find(".is-vertical")).toBeTruthy();
  });

  it("direction", async () => {
    wrapper = createVue(
      {
        template: `
          <z-container :direction="direction">
            <z-header></z-header>
            <z-main></z-main>
          </z-container>
        `,
        data() {
          return {
            direction: "horizontal",
          };
        },
      },
      true
    );
    expect(wrapper.classes("is-vertical")).not.toBe(true);
    await wrapper.setData({ direction: "vertical" });
    expect(wrapper.classes("is-vertical")).toBe(true);
  });

  describe("Header", () => {
    let wrapper;

    it("create", () => {
      wrapper = createTest(Header, true);
      expect(wrapper.find(".z-header").exists()).toBe(true);
    });

    it("height", () => {
      wrapper = createVue(
        {
          template: `
          <z-header height="100px"></z-header>
        `,
        },
        true
      );
      expect(wrapper.element.style.height).toEqual("100px");
    });
  });

  describe("Aside", () => {
    let wrapper;

    it("create", () => {
      wrapper = createTest(Aside, true);
      expect(wrapper.find(".z-aside").exists()).toBe(true);
    });

    it("width", () => {
      wrapper = createVue(
        {
          template: `
          <z-aside width="200px"></z-aside>
        `,
        },
        true
      );
      expect(wrapper.element.style.width).toEqual("200px");
    });
  });

  describe("Main", () => {
    let wrapper;

    it("create", () => {
      wrapper = createTest(Main, true);
      expect(wrapper.find(".z-main").exists()).toBe(true);
    });
  });

  describe("Footer", () => {
    let wrapper;

    it("create", () => {
      wrapper = createTest(Footer, true);
      expect(wrapper.find(".z-footer").exists()).toBe(true);
    });

    it("height", () => {
      wrapper = createVue(
        {
          template: `
          <z-footer height="100px"></z-footer>
        `,
        },
        true
      );
      expect(wrapper.element.style.height).toEqual("100px");
    });
  });
});
