<template>
  <label
    class="z-radio-button"
    :class="[
      size ? 'z-radio-button--' + size : '',
      { 'is-active': value === label },
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
    ]"
    role="radio"
    :aria-checked="value === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="value = isDisabled ? value : label"
  >
    <input
      class="z-radio-button__orig-radio"
      :value="label"
      type="radio"
      v-model="value"
      :name="name"
      @change="handleChange"
      :disabled="isDisabled"
      tabindex="-1"
      @focus="focus = true"
      @blur="focus = false"
      autocomplete="off"
    />
    <span
      class="z-radio-button__inner"
      :style="value === label ? activeStyle : null"
      @keydown.stop
    >
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<script>
import Emitter from "@/mixins/emitter";

export default {
  name: "ZRadioButton",

  mixins: [Emitter],

  inject: {
    zForm: {
      default: "",
    },
    zFormItem: {
      default: "",
    },
  },

  props: {
    label: {},
    disabled: Boolean,
    name: String,
  },
  data() {
    return {
      focus: false,
    };
  },
  computed: {
    value: {
      get() {
        return this._radioGroup.value;
      },
      set(value) {
        this._radioGroup.$emit("input", value);
      },
    },
    _radioGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "ZRadioGroup") {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
    activeStyle() {
      return {
        backgroundColor: this._radioGroup.fill || "",
        borderColor: this._radioGroup.fill || "",
        boxShadow: this._radioGroup.fill
          ? `-1px 0 0 0 ${this._radioGroup.fill}`
          : "",
        color: this._radioGroup.textColor || "",
      };
    },
    _zFormItemSize() {
      return (this.zFormItem || {}).zFormItemSize;
    },
    size() {
      return (
        this._radioGroup.radioGroupSize ||
        this._zFormItemSize ||
        (this.$ELEMENT || {}).size
      );
    },
    isDisabled() {
      return (
        this.disabled ||
        this._radioGroup.disabled ||
        (this.elForm || {}).disabled
      );
    },
    tabIndex() {
      return this.isDisabled || (this._radioGroup && this.value !== this.label)
        ? -1
        : 0;
    },
  },

  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.dispatch("ZRadioGroup", "handleChange", this.value);
      });
    },
  },
};
</script>
<style lang="scss">
@import "../../../assets/mixins/mixins";
@import "../../../assets/mixins/button";
@import "../../../assets/common/var";

@include b(radio-button) {
  position: relative;
  display: inline-block;
  outline: none;

  @include e(inner) {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    background: $--button-default-background-color;
    border: $--border-base;
    font-weight: $--button-font-weight;
    border-left: 0;
    color: $--button-default-font-color;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    position: relative;
    cursor: pointer;
    transition: $--all-transition;

    @include button-size(
      $--button-padding-vertical,
      $--button-padding-horizontal,
      $--button-font-size,
      0
    );

    &:hover {
      color: $--color-primary;
    }

    & [class*="z-icon-"] {
      line-height: 0.9;

      & + span {
        margin-left: 5px;
      }
    }
  }

  &:first-child {
    .z-radio-button__inner {
      border-left: $--border-base;
      border-radius: $--border-radius-base 0 0 $--border-radius-base;
      box-shadow: none !important;
    }
  }

  @include e(orig-radio) {
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;

    &:checked {
      & + .z-radio-button__inner {
        color: $--radio-button-checked-font-color;
        background-color: $--radio-button-checked-background-color;
        border-color: $--radio-button-checked-border-color;
        box-shadow: -1px 0 0 0 $--radio-button-checked-border-color;
      }
    }

    &:disabled {
      & + .z-radio-button__inner {
        color: $--button-disabled-font-color;
        cursor: not-allowed;
        background-image: none;
        background-color: $--button-disabled-background-color;
        border-color: $--button-disabled-border-color;
        box-shadow: none;
      }
      &:checked + .z-radio-button__inner {
        background-color: $--radio-button-disabled-checked-fill;
      }
    }
  }

  &:last-child {
    .z-radio-button__inner {
      border-radius: 0 $--border-radius-base $--border-radius-base 0;
    }
  }

  &:first-child:last-child {
    .z-radio-button__inner {
      border-radius: $--border-radius-base;
    }
  }

  @include m(medium) {
    & .z-radio-button__inner {
      @include button-size(
        $--button-medium-padding-vertical,
        $--button-medium-padding-horizontal,
        $--button-medium-font-size,
        0
      );
    }
  }
  @include m(small) {
    & .z-radio-button__inner {
      @include button-size(
        $--button-small-padding-vertical,
        $--button-small-padding-horizontal,
        $--button-small-font-size,
        0
      );
    }
  }
  @include m(mini) {
    & .z-radio-button__inner {
      @include button-size(
        $--button-mini-padding-vertical,
        $--button-mini-padding-horizontal,
        $--button-mini-font-size,
        0
      );
    }
  }

  &:focus:not(.is-focus):not(:active):not(.is-disabled) {
    /*获得焦点时 样式提醒*/
    box-shadow: 0 0 2px 2px $--radio-button-checked-border-color;
  }
}
</style>
