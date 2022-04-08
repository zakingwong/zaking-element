import { enableAutoDestroy } from "@vue/test-utils";
import Button from "../../components/button";
import { createTest, createVue } from "../util";
enableAutoDestroy(afterEach);

describe("Button", () => {
  let wrapper;

  it("create", () => {
    wrapper = createTest(
      Button,
      {
        type: "primary",
      },
      true
    );
    expect(wrapper.classes()).toContain("z-button--primary");
  });
  it("icon", () => {
    wrapper = createTest(
      Button,
      {
        icon: "z-icon-search",
      },
      true
    );
    expect(wrapper.get(".z-icon-search").exists()).toBe(true);
  });
  it("nativeType", () => {
    wrapper = createTest(
      Button,
      {
        nativeType: "submit",
      },
      true
    );
    expect(wrapper.attributes("type")).toEqual("submit");
  });
  it("loading", () => {
    wrapper = createTest(
      Button,
      {
        loading: true,
      },
      true
    );
    expect(wrapper.classes()).toContain("is-loading");
    expect(wrapper.get(".z-icon-loading").exists()).toBe(true);
  });
  it("disabled", () => {
    wrapper = createTest(
      Button,
      {
        disabled: true,
      },
      true
    );
    expect(wrapper.classes()).toContain("is-disabled");
  });
  it("size", () => {
    wrapper = createTest(
      Button,
      {
        size: "medium",
      },
      true
    );
    expect(wrapper.classes()).toContain("z-button--medium");
  });
  it("plain", () => {
    wrapper = createTest(
      Button,
      {
        plain: true,
      },
      true
    );
    expect(wrapper.classes()).toContain("is-plain");
  });
  it("round", () => {
    wrapper = createTest(
      Button,
      {
        round: true,
      },
      true
    );
    expect(wrapper.classes()).toContain("is-round");
  });
  it("circle", () => {
    wrapper = createTest(
      Button,
      {
        circle: true,
      },
      true
    );
    expect(wrapper.classes()).toContain("is-circle");
  });
  it("click", (done) => {
    let result;
    wrapper = createVue(
      {
        template: `
        <el-button @click="handleClick"></el-button>
      `,
        methods: {
          handleClick(evt) {
            result = evt;
          },
        },
      },
      true
    );
    wrapper.vm.$el.click();

    setTimeout(() => {
      expect(result).to.exist;
      done();
    }, 20);
  });

  // it("click inside", (done) => {
  //   let result;
  //   vm = createVue(
  //     {
  //       template: `
  //       <el-button @click="handleClick"><span class="inner-slot"></span></el-button>
  //     `,
  //       methods: {
  //         handleClick(evt) {
  //           result = evt;
  //         },
  //       },
  //     },
  //     true
  //   );
  //   vm.$el.querySelector(".inner-slot").click();

  //   setTimeout(() => {
  //     expect(result).to.exist;
  //     done();
  //   }, 20);
  // });

  // it("loading implies disabled", (done) => {
  //   let result;
  //   vm = createVue(
  //     {
  //       template: `
  //       <el-button loading @click="handleClick"><span class="inner-slot"></span></el-button>
  //     `,
  //       methods: {
  //         handleClick(evt) {
  //           result = evt;
  //         },
  //       },
  //     },
  //     true
  //   );
  //   vm.$el.querySelector(".inner-slot").click();

  //   setTimeout(() => {
  //     expect(result).to.not.exist;
  //     done();
  //   }, 20);
  // });
});
