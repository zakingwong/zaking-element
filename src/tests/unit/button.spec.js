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
    const onClick = jest.fn();

    wrapper = createVue(
      {
        template: `
        <z-button @click="handleClick"></z-button>
      `,
        methods: {
          handleClick: onClick,
        },
      },
      true
    );
    wrapper.trigger("click");

    setTimeout(() => {
      expect(onClick).toHaveBeenCalled();
      done();
    }, 20);
  });

  it("click inside", (done) => {
    const onClick = jest.fn();
    wrapper = createVue(
      {
        template: `
        <z-button @click="handleClick"><span class="inner-slot"></span></z-button>
      `,
        methods: {
          handleClick: onClick,
        },
      },
      true
    );
    wrapper.get(".inner-slot").trigger("click");
    setTimeout(() => {
      expect(onClick).toHaveBeenCalled();
      done();
    }, 20);
  });

  it("loading implies disabled", (done) => {
    const onClick = jest.fn();
    wrapper = createVue(
      {
        template: `
        <z-button loading @click="handleClick"><span class="inner-slot"></span></z-button>
      `,
        methods: {
          handleClick: onClick,
        },
      },
      true
    );
    wrapper.get(".inner-slot").trigger("click");
    setTimeout(() => {
      expect(onClick).toHaveBeenCalled();
      done();
    }, 20);
  });
});
