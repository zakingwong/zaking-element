<template>
  <div class="checkbox-demo">
    <div class="example-header">1、基本用法</div>
    <div class="example-content">
      <z-checkbox v-model="checked">备选项</z-checkbox>
    </div>

    <div class="example-header">2、禁用状态</div>
    <div class="example-content">
      <z-checkbox v-model="checked1" disabled>备选项1</z-checkbox>
      <z-checkbox v-model="checked2" disabled>备选项</z-checkbox>
    </div>

    <div class="example-header">3、多选框组</div>
    <div class="example-content">
      <z-checkbox-group v-model="checkList">
        <z-checkbox label="复选框 A"></z-checkbox>
        <z-checkbox label="复选框 B"></z-checkbox>
        <z-checkbox label="复选框 C"></z-checkbox>
        <z-checkbox label="禁用" disabled></z-checkbox>
        <z-checkbox label="选中且禁用" disabled></z-checkbox>
      </z-checkbox-group>
    </div>

    <div class="example-header">4、indeterminate状态</div>
    <div class="example-content">
      <z-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</z-checkbox
      >
      <div style="margin: 15px 0"></div>
      <z-checkbox-group
        v-model="checkedCities5"
        @change="handleCheckedCitiesChange"
      >
        <z-checkbox v-for="city in cities" :label="city" :key="city">{{
          city
        }}</z-checkbox>
      </z-checkbox-group>
    </div>

    <div class="example-header">5、可选项目的数量限制</div>
    <div class="example-content">
      <z-checkbox-group v-model="checkedCities6" :min="1" :max="2">
        <z-checkbox v-for="city in cities" :label="city" :key="city">{{
          city
        }}</z-checkbox>
      </z-checkbox-group>
    </div>

    <div class="example-header">6、按钮样式</div>
    <div class="example-content">
      <div>
        <z-checkbox-group v-model="checkboxGroup1">
          <z-checkbox-button v-for="city in cities" :label="city" :key="city">{{
            city
          }}</z-checkbox-button>
        </z-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <z-checkbox-group v-model="checkboxGroup2" size="medium">
          <z-checkbox-button v-for="city in cities" :label="city" :key="city">{{
            city
          }}</z-checkbox-button>
        </z-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <z-checkbox-group v-model="checkboxGroup3" size="small">
          <z-checkbox-button
            v-for="city in cities"
            :label="city"
            :disabled="city === '北京'"
            :key="city"
            >{{ city }}</z-checkbox-button
          >
        </z-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <z-checkbox-group v-model="checkboxGroup4" size="mini" disabled>
          <z-checkbox-button v-for="city in cities" :label="city" :key="city">{{
            city
          }}</z-checkbox-button>
        </z-checkbox-group>
      </div>
    </div>

    <div class="example-header">7、带有边框</div>
    <div class="example-content">
      <div>
        <z-checkbox v-model="checked71" label="备选项1" border></z-checkbox>
        <z-checkbox v-model="checked72" label="备选项2" border></z-checkbox>
      </div>
      <div style="margin-top: 20px">
        <z-checkbox
          v-model="checked73"
          label="备选项1"
          border
          size="medium"
        ></z-checkbox>
        <z-checkbox
          v-model="checked74"
          label="备选项2"
          border
          size="medium"
        ></z-checkbox>
      </div>
      <div style="margin-top: 20px">
        <z-checkbox-group v-model="checkboxGroup71" size="small">
          <z-checkbox label="备选项1" border></z-checkbox>
          <z-checkbox label="备选项2" border disabled></z-checkbox>
        </z-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <z-checkbox-group v-model="checkboxGroup72" size="mini" disabled>
          <z-checkbox label="备选项1" border></z-checkbox>
          <z-checkbox label="备选项2" border></z-checkbox>
        </z-checkbox-group>
      </div>
    </div>
  </div>
</template>
<script>
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  data() {
    return {
      checked: true,
      checked1: false,
      checked2: true,
      checkList: ["选中且禁用", "复选框 A"],
      checkAll: false,
      checkedCities5: ["上海", "北京"],
      checkedCities6: ["上海", "北京"],
      cities: cityOptions,
      isIndeterminate: true,
      checkboxGroup1: ["上海"],
      checkboxGroup2: ["上海"],
      checkboxGroup3: ["上海"],
      checkboxGroup4: ["上海"],
      checked71: true,
      checked72: false,
      checked73: false,
      checked74: true,
      checkboxGroup71: [],
      checkboxGroup72: [],
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
  },
};
</script>
