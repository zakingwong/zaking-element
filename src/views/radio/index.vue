<template>
  <div class="radio-demo">
    <div class="example-header">1、基本用法</div>
    <div class="example-content">
      <z-radio v-model="radio1" label="1">备选项</z-radio>
      <z-radio v-model="radio1" label="2">备选项</z-radio>
    </div>

    <div class="example-header">2、禁用状态</div>
    <div class="example-content">
      <z-radio disabled v-model="radio2" label="禁用">备选项</z-radio>
      <z-radio disabled v-model="radio2" label="选中且禁用">备选项</z-radio>
    </div>

    <div class="example-header">3、单选框组</div>
    <div class="example-content">
      <z-radio-group v-model="radio3">
        <z-radio :label="3">备选项</z-radio>
        <z-radio :label="6">备选项</z-radio>
        <z-radio :label="9">备选项</z-radio>
      </z-radio-group>
    </div>

    <div class="example-header">4、按钮样式</div>
    <div class="example-content">
      <div>
        <z-radio-group v-model="radio41">
          <z-radio-button label="上海"></z-radio-button>
          <z-radio-button label="北京"></z-radio-button>
          <z-radio-button label="广州"></z-radio-button>
          <z-radio-button label="深圳"></z-radio-button>
        </z-radio-group>
      </div>
      <div style="margin-top: 20px">
        <z-radio-group v-model="radio42" size="medium">
          <z-radio-button label="上海"></z-radio-button>
          <z-radio-button label="北京"></z-radio-button>
          <z-radio-button label="广州"></z-radio-button>
          <z-radio-button label="深圳"></z-radio-button>
        </z-radio-group>
      </div>
      <div style="margin-top: 20px">
        <z-radio-group v-model="radio43" size="small">
          <z-radio-button label="上海"></z-radio-button>
          <z-radio-button label="北京" disabled></z-radio-button>
          <z-radio-button label="广州"></z-radio-button>
          <z-radio-button label="深圳"></z-radio-button>
        </z-radio-group>
      </div>
      <div style="margin-top: 20px">
        <z-radio-group v-model="radio44" disabled size="mini">
          <z-radio-button label="上海"></z-radio-button>
          <z-radio-button label="北京"></z-radio-button>
          <z-radio-button label="广州"></z-radio-button>
          <z-radio-button label="深圳"></z-radio-button>
        </z-radio-group>
      </div>
    </div>

    <div class="example-header">5、带有边框</div>
    <div class="example-content">
      <div>
        <z-radio v-model="radio51" label="1" border>备选项1</z-radio>
        <z-radio v-model="radio51" label="2" border>备选项2</z-radio>
      </div>
      <div style="margin-top: 20px">
        <z-radio v-model="radio52" label="1" border size="medium"
          >备选项1</z-radio
        >
        <z-radio v-model="radio52" label="2" border size="medium"
          >备选项2</z-radio
        >
      </div>
      <div style="margin-top: 20px">
        <z-radio-group v-model="radio53" size="small">
          <z-radio label="1" border>备选项1</z-radio>
          <z-radio label="2" border disabled>备选项2</z-radio>
        </z-radio-group>
      </div>
      <div style="margin-top: 20px">
        <z-radio-group v-model="radio54" size="mini" disabled>
          <z-radio label="1" border>备选项1</z-radio>
          <z-radio label="2" border>备选项2</z-radio>
        </z-radio-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio1: "1",
      radio2: "选中且禁用",
      radio3: 3,
      radio41: "上海",
      radio42: "上海",
      radio43: "上海",
      radio44: "上海",
      radio51: "1",
      radio52: "1",
      radio53: "1",
      radio54: "1",
    };
  },
};
</script>
