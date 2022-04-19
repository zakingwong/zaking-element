<template>
  <label
    class="z-radio"
    :class="[
      border && radioSize ? 'z-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-checked': model === label },
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span
      class="z-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label,
      }"
    >
      <span class="z-radio__inner"></span>
      <input
        ref="radio"
        class="z-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
        autocomplete="off"
      />
    </span>
    <span class="z-radio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<script>
import Emitter from "@/mixins/emitter";

export default {
  name: "ZRadio",

  mixins: [Emitter],

  inject: {
    zForm: {
      default: "",
    },

    zFormItem: {
      default: "",
    },
  },

  componentName: "ZRadio",

  props: {
    value: {},
    label: {},
    disabled: Boolean,
    name: String,
    border: Boolean,
    size: String,
  },

  data() {
    return {
      focus: false,
    };
  },
  computed: {
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "ZRadioGroup") {
          parent = parent.$parent;
        } else {
          //eslint-disable-next-line
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch("ZRadioGroup", "input", [val]);
        } else {
          this.$emit("input", val);
        }
        this.$refs.radio &&
          (this.$refs.radio.checked = this.model === this.label);
      },
    },
    _zFormItemSize() {
      return (this.zFormItem || {}).zFormItemSize;
    },
    radioSize() {
      const temRadioSize =
        this.size || this._zFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup
        ? this._radioGroup.radioGroupSize || temRadioSize
        : temRadioSize;
    },
    isDisabled() {
      return this.isGroup
        ? this._radioGroup.disabled ||
            this.disabled ||
            (this.zForm || {}).disabled
        : this.disabled || (this.zForm || {}).disabled;
    },
    tabIndex() {
      return this.isDisabled || (this.isGroup && this.model !== this.label)
        ? -1
        : 0;
    },
  },

  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit("change", this.model);
        this.isGroup &&
          this.dispatch("ZRadioGroup", "handleChange", this.model);
      });
    },
  },
};
</script>
<style lang="scss">
@import "../../../assets/mixins/mixins";
@import "../../../assets/mixins/utils";
@import "../../../assets/mixins/button";
@import "../../../assets/common/var";

@include b(radio) {
  color: $--radio-font-color;
  font-weight: $--radio-font-weight;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: $--font-size-base;
  margin-right: 30px;
  @include utils-user-select(none);

  @include when(bordered) {
    padding: $--radio-bordered-padding;
    border-radius: $--border-radius-base;
    border: $--border-base;
    box-sizing: border-box;
    height: $--radio-bordered-height;

    &.is-checked {
      border-color: $--color-primary;
    }

    &.is-disabled {
      cursor: not-allowed;
      border-color: $--border-color-lighter;
    }

    & + .z-radio.is-bordered {
      margin-left: 10px;
    }
  }

  @include m(medium) {
    &.is-bordered {
      padding: $--radio-bordered-medium-padding;
      border-radius: $--button-medium-border-radius;
      height: $--radio-bordered-medium-height;
      .z-radio__label {
        font-size: $--button-medium-font-size;
      }
      .z-radio__inner {
        height: $--radio-bordered-medium-input-height;
        width: $--radio-bordered-medium-input-width;
      }
    }
  }
  @include m(small) {
    &.is-bordered {
      padding: $--radio-bordered-small-padding;
      border-radius: $--button-small-border-radius;
      height: $--radio-bordered-small-height;
      .z-radio__label {
        font-size: $--button-small-font-size;
      }
      .z-radio__inner {
        height: $--radio-bordered-small-input-height;
        width: $--radio-bordered-small-input-width;
      }
    }
  }
  @include m(mini) {
    &.is-bordered {
      padding: $--radio-bordered-mini-padding;
      border-radius: $--button-mini-border-radius;
      height: $--radio-bordered-mini-height;
      .z-radio__label {
        font-size: $--button-mini-font-size;
      }
      .z-radio__inner {
        height: $--radio-bordered-mini-input-height;
        width: $--radio-bordered-mini-input-width;
      }
    }
  }

  &:last-child {
    margin-right: 0;
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
      .z-radio__inner {
        background-color: $--radio-disabled-input-fill;
        border-color: $--radio-disabled-input-border-color;
        cursor: not-allowed;

        &::after {
          cursor: not-allowed;
          background-color: $--radio-disabled-icon-color;
        }

        & + .z-radio__label {
          cursor: not-allowed;
        }
      }
      &.is-checked {
        .z-radio__inner {
          background-color: $--radio-disabled-checked-input-fill;
          border-color: $--radio-disabled-checked-input-border-color;

          &::after {
            background-color: $--radio-disabled-checked-icon-color;
          }
        }
      }
      & + span.z-radio__label {
        color: $--color-text-placeholder;
        cursor: not-allowed;
      }
    }

    @include when(checked) {
      .z-radio__inner {
        border-color: $--radio-checked-input-border-color;
        background: $--radio-checked-icon-color;

        &::after {
          transform: translate(-50%, -50%) scale(1);
        }
      }

      & + .z-radio__label {
        color: $--radio-checked-font-color;
      }
    }

    @include when(focus) {
      .z-radio__inner {
        border-color: $--radio-input-border-color-hover;
      }
    }
  }
  @include e(inner) {
    border: $--radio-input-border;
    border-radius: $--radio-input-border-radius;
    width: $--radio-input-width;
    height: $--radio-input-height;
    background-color: $--radio-input-background-color;
    position: relative;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;

    &:hover {
      border-color: $--radio-input-border-color-hover;
    }

    &::after {
      width: 4px;
      height: 4px;
      border-radius: $--radio-input-border-radius;
      background-color: $--color-white;
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.15s ease-in;
    }
  }

  @include e(original) {
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
  }

  &:focus:not(.is-focus):not(:active):not(.is-disabled) {
    /*获得焦点时 样式提醒*/
    .z-radio__inner {
      box-shadow: 0 0 2px 2px $--radio-input-border-color-hover;
    }
  }

  @include e(label) {
    font-size: $--radio-font-size;
    padding-left: 10px;
  }
}
</style>
