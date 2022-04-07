import { enableAutoDestroy } from "@vue/test-utils";
import Row from "../../components/row";
import { createTest } from "../util";
enableAutoDestroy(afterEach);

describe("Row", () => {
  let vm;

  it("create", () => {
    vm = createTest(Row, true);
    expect(vm.classes()).toContain("z-row");
  });
  it("gutter", () => {
    vm = createTest(
      Row,
      {
        gutter: 20,
      },
      true
    );
    expect(vm.attributes().style).toBe(
      "margin-left: -10px; margin-right: -10px;"
    );
  });
  it("type", () => {
    vm = createTest(
      Row,
      {
        type: "flex",
      },
      true
    );
    expect(vm.classes()).toContain("z-row--flex");
  });
  it("justify", () => {
    vm = createTest(
      Row,
      {
        justify: "end",
      },
      true
    );
    expect(vm.classes()).toContain("is-justify-end");
  });
  it("align", () => {
    vm = createTest(
      Row,
      {
        align: "bottom",
      },
      true
    );
    expect(vm.classes()).toContain("is-align-bottom");
  });
});
