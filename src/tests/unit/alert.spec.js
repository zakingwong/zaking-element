import { enableAutoDestroy } from "@vue/test-utils";
import Alert from "../../components/alert";
import { createTest, createVue } from "../util";
enableAutoDestroy(afterEach);
describe("Alert", () => {
  let wrapper;

  it("create", () => {
    wrapper = createTest(
      Alert,
      {
        title: "test",
        showIcon: true,
      },
      true
    );
    expect(wrapper.find(".z-alert__title").text()).toBe("test");
    expect(wrapper.classes()).toContain("z-alert--info");
  });

  it("type", () => {
    wrapper = createTest(
      Alert,
      {
        title: "test",
        type: "success",
        showIcon: true,
      },
      true
    );
    expect(wrapper.classes("z-alert--success")).toBeTruthy();
  });

  it("description", () => {
    wrapper = createTest(
      Alert,
      {
        title: "Dorne",
        description: "Unbowed, Unbent, Unbroken",
        showIcon: true,
      },
      true
    );
    expect(
      wrapper.find(".z-alert__description").find("Unbowed, Unbent, Unbroken")
    );
  });

  it("theme", () => {
    wrapper = createTest(
      Alert,
      {
        title: "test",
        effect: "dark",
      },
      true
    );
    expect(wrapper.classes("is-dark")).toBeTruthy();
  });

  it("title slot", () => {
    wrapper = createVue(`
      <z-alert>
        <span slot="title">foo</span>
      </z-alert>
    `);
    expect(wrapper.find(".z-alert__title").text()).toBe("foo");
  });

  it("close", async () => {
    wrapper = createVue(
      {
        template: `
        <div>
          <z-alert
            title="test"
            close-text="close"></z-alert>
        </div>
      `,
      },
      true
    );
    await wrapper.find(".z-alert__closebtn").trigger("click");
    expect(wrapper.find(".z-alert").isVisible()).toBe(false);
  });
});
