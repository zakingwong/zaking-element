<template>
  <label
    class="z-checkbox"
    :class="[
      border && checkboxSize ? 'z-checkbox--' + checkboxSize : '',
      { 'is-disabled': isDisabled },
      { 'is-bordered': border },
      { 'is-checked': isChecked },
    ]"
    :id="id"
  >
    <span
      class="z-checkbox__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus,
      }"
      :tabindex="indeterminate ? 0 : false"
      :role="indeterminate ? 'checkbox' : false"
      :aria-checked="indeterminate ? 'mixed' : false"
    >
      <span class="z-checkbox__inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        class="z-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :name="name"
        :disabled="isDisabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
      <input
        v-else
        class="z-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
    </span>
    <span class="z-checkbox__label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<script>
import Emitter from "@/mixins/emitter";

export default {
  name: "ZCheckbox",

  mixins: [Emitter],

  inject: {
    zForm: {
      default: "",
    },
    zFormItem: {
      default: "",
    },
  },

  componentName: "ZCheckbox",

  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false,
    };
  },

  computed: {
    model: {
      get() {
        return this.isGroup
          ? this.store
          : this.value !== undefined
          ? this.value
          : this.selfModel;
      },

      set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          this._checkboxGroup.min !== undefined &&
            val.length < this._checkboxGroup.min &&
            (this.isLimitExceeded = true);

          this._checkboxGroup.max !== undefined &&
            val.length > this._checkboxGroup.max &&
            (this.isLimitExceeded = true);

          this.isLimitExceeded === false &&
            this.dispatch("ZCheckboxGroup", "input", [val]);
        } else {
          this.$emit("input", val);
          this.selfModel = val;
        }
      },
    },

    isChecked() {
      if ({}.toString.call(this.model) === "[object Boolean]") {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
      return false;
    },

    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "ZCheckboxGroup") {
          parent = parent.$parent;
        } else {
          /* eslint-disable-next-line*/
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },

    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },

    /* used to make the isDisabled judgment under max/min props */
    isLimitDisabled() {
      const { max, min } = this._checkboxGroup;
      return (
        (!!(max || min) && this.model.length >= max && !this.isChecked) ||
        (this.model.length <= min && this.isChecked)
      );
    },

    isDisabled() {
      return this.isGroup
        ? this._checkboxGroup.disabled ||
            this.disabled ||
            (this.zForm || {}).disabled ||
            this.isLimitDisabled
        : this.disabled || (this.zForm || {}).disabled;
    },

    _zFormItemSize() {
      return (this.zFormItem || {}).zFormItemSize;
    },

    checkboxSize() {
      const temCheckboxSize =
        this.size || this._zFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup
        ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize
        : temCheckboxSize;
    },
  },

  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    id: String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/,
    controls:
      String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/,
    border: Boolean,
    size: String,
  },

  methods: {
    addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange(ev) {
      if (this.isLimitExceeded) return;
      let value;
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit("change", value, ev);
      this.$nextTick(() => {
        if (this.isGroup) {
          this.dispatch("ZCheckboxGroup", "change", [
            this._checkboxGroup.value,
          ]);
        }
      });
    },
  },

  created() {
    this.checked && this.addToStore();
  },
  mounted() {
    // 为indeterminate元素 添加aria-controls 属性
    if (this.indeterminate) {
      this.$el.setAttribute("aria-controls", this.controls);
    }
  },

  watch: {
    value(value) {
      this.dispatch("ElFormItem", "el.form.change", value);
    },
  },
};
</script>
<style lang="scss">
@import "../../../assets/common/var";
@import "../../../assets/mixins/mixins";
@import "../../../assets/mixins/button";
@import "../../../assets/mixins/utils";

@include b(checkbox) {
  color: $--checkbox-font-color;
  font-weight: $--checkbox-font-weight;
  font-size: $--font-size-base;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  margin-right: 30px;

  @include when(bordered) {
    padding: $--checkbox-bordered-padding;
    border-radius: $--border-radius-base;
    border: $--border-base;
    box-sizing: border-box;
    line-height: normal;
    height: $--checkbox-bordered-height;

    &.is-checked {
      border-color: $--color-primary;
    }

    &.is-disabled {
      border-color: $--border-color-lighter;
      cursor: not-allowed;
    }

    & + .z-checkbox.is-bordered {
      margin-left: 10px;
    }

    &.z-checkbox--medium {
      padding: $--checkbox-bordered-medium-padding;
      border-radius: $--button-medium-border-radius;
      height: $--checkbox-bordered-medium-height;

      .z-checkbox__label {
        line-height: 17px;
        font-size: $--button-medium-font-size;
      }

      .z-checkbox__inner {
        height: $--checkbox-bordered-medium-input-height;
        width: $--checkbox-bordered-medium-input-width;
      }
    }

    &.z-checkbox--small {
      padding: $--checkbox-bordered-small-padding;
      border-radius: $--button-small-border-radius;
      height: $--checkbox-bordered-small-height;

      .z-checkbox__label {
        line-height: 15px;
        font-size: $--button-small-font-size;
      }

      .z-checkbox__inner {
        height: $--checkbox-bordered-small-input-height;
        width: $--checkbox-bordered-small-input-width;

        &::after {
          height: 6px;
          width: 2px;
        }
      }
    }

    &.z-checkbox--mini {
      padding: $--checkbox-bordered-mini-padding;
      border-radius: $--button-mini-border-radius;
      height: $--checkbox-bordered-mini-height;

      .z-checkbox__label {
        line-height: 12px;
        font-size: $--button-mini-font-size;
      }

      .z-checkbox__inner {
        height: $--checkbox-bordered-mini-input-height;
        width: $--checkbox-bordered-mini-input-width;
        &::after {
          height: 6px;
          width: 2px;
        }
      }
    }
  }

  @include e(input) {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;

    @include when(disabled) {
      .z-checkbox__inner {
        background-color: $--checkbox-disabled-input-fill;
        border-color: $--checkbox-disabled-border-color;
        cursor: not-allowed;

        &::after {
          cursor: not-allowed;
          border-color: $--checkbox-disabled-icon-color;
        }

        & + .z-checkbox__label {
          cursor: not-allowed;
        }
      }

      &.is-checked {
        .z-checkbox__inner {
          background-color: $--checkbox-disabled-checked-input-fill;
          border-color: $--checkbox-disabled-checked-input-border-color;

          &::after {
            border-color: $--checkbox-disabled-checked-icon-color;
          }
        }
      }

      &.is-indeterminate {
        .z-checkbox__inner {
          background-color: $--checkbox-disabled-checked-input-fill;
          border-color: $--checkbox-disabled-checked-input-border-color;

          &::before {
            background-color: $--checkbox-disabled-checked-icon-color;
            border-color: $--checkbox-disabled-checked-icon-color;
          }
        }
      }

      & + span.z-checkbox__label {
        color: $--disabled-color-base;
        cursor: not-allowed;
      }
    }

    @include when(checked) {
      .z-checkbox__inner {
        background-color: $--checkbox-checked-background-color;
        border-color: $--checkbox-checked-input-border-color;

        &::after {
          transform: rotate(45deg) scaleY(1);
        }
      }

      & + .z-checkbox__label {
        color: $--checkbox-checked-font-color;
      }
    }
    @include when(focus) {
      /*focus时 视觉上区分*/
      .z-checkbox__inner {
        border-color: $--checkbox-input-border-color-hover;
      }
    }
    @include when(indeterminate) {
      .z-checkbox__inner {
        background-color: $--checkbox-checked-background-color;
        border-color: $--checkbox-checked-input-border-color;

        &::before {
          content: "";
          position: absolute;
          display: block;
          background-color: $--checkbox-checked-icon-color;
          height: 2px;
          transform: scale(0.5);
          left: 0;
          right: 0;
          top: 5px;
        }

        &::after {
          display: none;
        }
      }
    }
  }
  @include e(inner) {
    display: inline-block;
    position: relative;
    border: $--checkbox-input-border;
    border-radius: $--checkbox-border-radius;
    box-sizing: border-box;
    width: $--checkbox-input-width;
    height: $--checkbox-input-height;
    background-color: $--checkbox-background-color;
    z-index: $--index-normal;
    transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
      background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);

    &:hover {
      border-color: $--checkbox-input-border-color-hover;
    }

    &::after {
      box-sizing: content-box;
      content: "";
      border: 1px solid $--checkbox-checked-icon-color;
      border-left: 0;
      border-top: 0;
      height: 7px;
      left: 4px;
      position: absolute;
      top: 1px;
      transform: rotate(45deg) scaleY(0);
      width: 3px;
      transition: transform 0.15s ease-in 0.05s;
      transform-origin: center;
    }
  }

  @include e(original) {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }

  @include e(label) {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: $--checkbox-font-size;
  }

  &:last-of-type {
    margin-right: 0;
  }
}

@include b(checkbox-button) {
  position: relative;
  display: inline-block;

  @include e(inner) {
    display: inline-block;
    line-height: 1;
    font-weight: $--checkbox-font-weight;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    background: $--button-default-background-color;
    border: $--border-base;
    border-left: 0;
    color: $--button-default-font-color;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    position: relative;
    transition: $--all-transition;
    @include utils-user-select(none);

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

  @include e(original) {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    z-index: -1;
  }

  &.is-checked {
    & .z-checkbox-button__inner {
      color: $--checkbox-button-checked-font-color;
      background-color: $--checkbox-button-checked-background-color;
      border-color: $--checkbox-button-checked-border-color;
      box-shadow: -1px 0 0 0 $--color-primary-light-4;
    }
    &:first-child .z-checkbox-button__inner {
      border-left-color: $--checkbox-button-checked-border-color;
    }
  }

  &.is-disabled {
    & .z-checkbox-button__inner {
      color: $--button-disabled-font-color;
      cursor: not-allowed;
      background-image: none;
      background-color: $--button-disabled-background-color;
      border-color: $--button-disabled-border-color;
      box-shadow: none;
    }
    &:first-child .z-checkbox-button__inner {
      border-left-color: $--button-disabled-border-color;
    }
  }

  &:first-child {
    .z-checkbox-button__inner {
      border-left: $--border-base;
      border-radius: $--border-radius-base 0 0 $--border-radius-base;
      box-shadow: none !important;
    }
  }

  &.is-focus {
    & .z-checkbox-button__inner {
      border-color: $--checkbox-button-checked-border-color;
    }
  }

  &:last-child {
    .z-checkbox-button__inner {
      border-radius: 0 $--border-radius-base $--border-radius-base 0;
    }
  }
  @include m(medium) {
    .z-checkbox-button__inner {
      @include button-size(
        $--button-medium-padding-vertical,
        $--button-medium-padding-horizontal,
        $--button-medium-font-size,
        0
      );
    }
  }
  @include m(small) {
    .z-checkbox-button__inner {
      @include button-size(
        $--button-small-padding-vertical,
        $--button-small-padding-horizontal,
        $--button-small-font-size,
        0
      );
    }
  }
  @include m(mini) {
    .z-checkbox-button__inner {
      @include button-size(
        $--button-mini-padding-vertical,
        $--button-mini-padding-horizontal,
        $--button-mini-font-size,
        0
      );
    }
  }
}

@include b(checkbox-group) {
  font-size: 0;
}
</style>
