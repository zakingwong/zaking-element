import { enableAutoDestroy } from "@vue/test-utils";
import Link from "../../components/link";
import { createTest, createVue } from "../util";
enableAutoDestroy(afterEach);

describe("Link", () => {
  let vm;

  it("create", () => {
    vm = createTest(
      Link,
      {
        type: "primary",
      },
      true
    );
    expect(vm.classes()).toContain("z-link--primary");
  });
  it("icon", () => {
    vm = createTest(
      Link,
      {
        icon: "z-icon-search",
      },
      true
    );
    expect(vm.find(".z-icon-search").exists()).toBe(true);
  });
  it("href", () => {
    vm = createTest(
      Link,
      {
        href: "https://element.eleme.io/",
      },
      true
    );
    expect(vm.attributes("href")).toEqual("https://element.eleme.io/");
  });
  it("target", () => {
    vm = createVue(`
    <z-link href="https://element.eleme.io" target="_blank">
      default
    </z-link>
    `);
    expect(vm.attributes("target")).toEqual("_blank");
  });
  it("disabled", () => {
    vm = createTest(
      Link,
      {
        disabled: true,
      },
      true
    );
    expect(vm.classes()).toContain("is-disabled");
  });

  it("click", async () => {
    const onClick = jest.fn();
    vm = createVue(
      {
        template: `
        <z-link @click="handleClick"></z-link>
      `,
        methods: {
          handleClick: onClick,
        },
      },
      true
    );
    await vm.trigger("click");
    expect(onClick).toHaveBeenCalled();
  });
});
