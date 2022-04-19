<script>
import Emitter from "@/mixins/emitter";

export default {
  name: "ZCheckboxGroup",

  componentName: "ZCheckboxGroup",

  mixins: [Emitter],

  inject: {
    zFormItem: {
      default: "",
    },
  },

  props: {
    value: {},
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    fill: String,
    textColor: String,
  },

  computed: {
    _zFormItemSize() {
      return (this.zFormItem || {}).zFormItemSize;
    },
    checkboxGroupSize() {
      return this.size || this._zFormItemSize || (this.$ELEMENT || {}).size;
    },
  },

  watch: {
    value(value) {
      this.dispatch("ZFormItem", "el.form.change", [value]);
    },
  },
};
</script>

<template>
  <div class="z-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
