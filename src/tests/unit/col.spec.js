import { enableAutoDestroy } from "@vue/test-utils";
import { createVue } from "../util";
enableAutoDestroy(afterEach);

describe("Col", () => {
  let vm;

  it("create", () => {
    vm = createVue(
      {
        template: `
        <z-col :span="12">
        </z-col>
      `,
      },
      true
    );
    expect(vm.classes()).toContain("z-col");
  });
  it("span", () => {
    vm = createVue(
      {
        template: `
        <z-col :span="12">
        </z-col>
      `,
      },
      true
    );
    expect(vm.classes()).toContain("z-col-12");
  });
  it("pull", () => {
    vm = createVue(
      {
        template: `
        <z-col :span="12" :pull="3">
        </z-col>
      `,
      },
      true
    );
    expect(vm.classes()).toContain("z-col-pull-3");
  });
  it("push", () => {
    vm = createVue(
      {
        template: `
        <z-col :span="12" :push="3">
        </z-col>
      `,
      },
      true
    );
    expect(vm.classes()).toContain("z-col-push-3");
  });
  it("gutter", () => {
    vm = createVue(
      {
        template: `
        <z-row :gutter="20">
          <z-col :span="12" ref="col">
          </z-col>
        </z-row>
      `,
      },
      true
    );
    expect(vm.findComponent({ ref: "col" }).attributes().style).toBe(
      "padding-left: 10px; padding-right: 10px;"
    );
  });
  it("responsive", () => {
    vm = createVue(
      {
        template: `
        <z-row :gutter="20">
          <z-col ref="col" :sm="{ span: 4, offset: 2 }" :md="8" :lg="{ span: 6, offset: 3 }">
          </z-col>
        </z-row>
      `,
      },
      true
    );
    expect(vm.findComponent({ ref: "col" }).classes()).toContain("z-col-sm-4");
    expect(vm.findComponent({ ref: "col" }).classes()).toContain(
      "z-col-sm-offset-2"
    );
    expect(vm.findComponent({ ref: "col" }).classes()).toContain("z-col-lg-6");
    expect(vm.findComponent({ ref: "col" }).classes()).toContain(
      "z-col-lg-offset-3"
    );
    expect(vm.findComponent({ ref: "col" }).classes()).toContain("z-col-md-8");
  });
});
