<template>
  <transition name="msgbox-fade">
    <div
      class="z-message-box__wrapper"
      tabindex="-1"
      v-show="visible"
      @click.self="handleWrapperClick"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'dialog'"
    >
      <div
        class="z-message-box"
        :class="[customClass, center && 'z-message-box--center']"
      >
        <div class="z-message-box__header" v-if="title !== null">
          <div class="z-message-box__title">
            <div
              :class="['z-message-box__status', icon]"
              v-if="icon && center"
            ></div>
            <span>{{ title }}</span>
          </div>
          <button
            type="button"
            class="z-message-box__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="
              handleAction(distinguishCancelAndClose ? 'close' : 'cancel')
            "
            @keydown.enter="
              handleAction(distinguishCancelAndClose ? 'close' : 'cancel')
            "
          >
            <i class="z-message-box__close z-icon-close"></i>
          </button>
        </div>
        <div class="z-message-box__content">
          <div class="z-message-box__container">
            <div
              :class="['z-message-box__status', icon]"
              v-if="icon && !center && message !== ''"
            ></div>
            <div class="z-message-box__message" v-if="message !== ''">
              <slot>
                <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
                <p v-else v-html="message"></p>
              </slot>
            </div>
          </div>
          <div class="z-message-box__input" v-show="showInput">
            <p>input暂未实现</p>
            <!-- <z-input
              v-model="inputValue"
              :type="inputType"
              @keydown.enter.native="handleInputEnter"
              :placeholder="inputPlaceholder"
              ref="input"
            ></z-input> -->
            <div
              class="z-message-box__errormsg"
              :style="{
                visibility: !!editorErrorMessage ? 'visible' : 'hidden',
              }"
            >
              {{ editorErrorMessage }}
            </div>
          </div>
        </div>
        <div class="z-message-box__btns">
          <z-button
            :loading="cancelButtonLoading"
            :class="[cancelButtonClasses]"
            v-if="showCancelButton"
            :round="roundButton"
            size="small"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')"
          >
            {{ cancelButtonText || t("el.messagebox.cancel") }}
          </z-button>
          <z-button
            :loading="confirmButtonLoading"
            ref="confirm"
            :class="[confirmButtonClasses]"
            v-show="showConfirmButton"
            :round="roundButton"
            size="small"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')"
          >
            {{ confirmButtonText || t("el.messagebox.confirm") }}
          </z-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from "../../../utils/popup";
import Locale from "../../../mixins/locale";
// import ZInput from "../../input";
import ZButton from "../../button";
import { addClass, removeClass } from "../../../utils/dom";
import { t } from "../../../locale";
import Dialog from "@/utils/aria-dialog";

let messageBox;
let typeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};

export default {
  mixins: [Popup, Locale],

  props: {
    modal: {
      default: true,
    },
    lockScroll: {
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    closeOnClickModal: {
      default: true,
    },
    closeOnPressEscape: {
      default: true,
    },
    closeOnHashChange: {
      default: true,
    },
    center: {
      default: false,
      type: Boolean,
    },
    roundButton: {
      default: false,
      type: Boolean,
    },
  },

  components: {
    // ZInput,
    ZButton,
  },

  computed: {
    icon() {
      const { type, iconClass } = this;
      return (
        iconClass || (type && typeMap[type] ? `z-icon-${typeMap[type]}` : "")
      );
    },

    confirmButtonClasses() {
      return `z-button--primary ${this.confirmButtonClass}`;
    },
    cancelButtonClasses() {
      return `${this.cancelButtonClass}`;
    },
  },

  methods: {
    getSafeClose() {
      const currentId = this.uid;
      return () => {
        this.$nextTick(() => {
          if (currentId === this.uid) this.doClose();
        });
      };
    },
    doClose() {
      if (!this.visible) return;
      this.visible = false;
      this._closing = true;

      this.onClose && this.onClose();
      messageBox.closeDialog(); // 解绑
      if (this.lockScroll) {
        setTimeout(this.restoreBodyStyle, 200);
      }
      this.opened = false;
      this.doAfterClose();
      setTimeout(() => {
        if (this.action) this.callback(this.action, this);
      });
    },

    handleWrapperClick() {
      if (this.closeOnClickModal) {
        this.handleAction(this.distinguishCancelAndClose ? "close" : "cancel");
      }
    },

    handleInputEnter() {
      if (this.inputType !== "textarea") {
        return this.handleAction("confirm");
      }
    },

    handleAction(action) {
      if (this.$type === "prompt" && action === "confirm" && !this.validate()) {
        return;
      }
      this.action = action;
      if (typeof this.beforeClose === "function") {
        this.close = this.getSafeClose();
        this.beforeClose(action, this, this.close);
      } else {
        this.doClose();
      }
    },

    validate() {
      if (this.$type === "prompt") {
        const inputPattern = this.inputPattern;
        if (inputPattern && !inputPattern.test(this.inputValue || "")) {
          this.editorErrorMessage =
            this.inputErrorMessage || t("el.messagebox.error");
          addClass(this.getInputElement(), "invalid");
          return false;
        }
        const inputValidator = this.inputValidator;
        if (typeof inputValidator === "function") {
          const validateResult = inputValidator(this.inputValue);
          if (validateResult === false) {
            this.editorErrorMessage =
              this.inputErrorMessage || t("el.messagebox.error");
            addClass(this.getInputElement(), "invalid");
            return false;
          }
          if (typeof validateResult === "string") {
            this.editorErrorMessage = validateResult;
            addClass(this.getInputElement(), "invalid");
            return false;
          }
        }
      }
      this.editorErrorMessage = "";
      removeClass(this.getInputElement(), "invalid");
      return true;
    },
    getFirstFocus() {
      const btn = this.$el.querySelector(".z-message-box__btns .z-button");
      const title = this.$el.querySelector(
        ".z-message-box__btns .z-message-box__title"
      );
      return btn || title;
    },
    getInputElement() {
      const inputRefs = this.$refs.input.$refs;
      return inputRefs.input || inputRefs.textarea;
    },
    handleClose() {
      this.handleAction("close");
    },
  },

  watch: {
    inputValue: {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          if (this.$type === "prompt" && val !== null) {
            this.validate();
          }
        });
      },
    },

    visible(val) {
      if (val) {
        this.uid++;
        if (this.$type === "alert" || this.$type === "confirm") {
          this.$nextTick(() => {
            this.$refs.confirm.$el.focus();
          });
        }
        this.focusAfterClosed = document.activeElement;
        messageBox = new Dialog(
          this.$el,
          this.focusAfterClosed,
          this.getFirstFocus()
        );
      }

      // prompt
      if (this.$type !== "prompt") return;
      if (val) {
        setTimeout(() => {
          if (this.$refs.input && this.$refs.input.$el) {
            this.getInputElement().focus();
          }
        }, 500);
      } else {
        this.editorErrorMessage = "";
        removeClass(this.getInputElement(), "invalid");
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      if (this.closeOnHashChange) {
        window.addEventListener("hashchange", this.close);
      }
    });
  },

  beforeDestroy() {
    if (this.closeOnHashChange) {
      window.removeEventListener("hashchange", this.close);
    }
    setTimeout(() => {
      messageBox.closeDialog();
    });
  },

  data() {
    return {
      uid: 1,
      title: undefined,
      message: "",
      type: "",
      iconClass: "",
      customClass: "",
      showInput: false,
      inputValue: null,
      inputPlaceholder: "",
      inputType: "text",
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: "",
      showConfirmButton: true,
      showCancelButton: false,
      action: "",
      confirmButtonText: "",
      cancelButtonText: "",
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonClass: "",
      confirmButtonDisabled: false,
      cancelButtonClass: "",
      editorErrorMessage: null,
      callback: null,
      dangerouslyUseHTMLString: false,
      focusAfterClosed: null,
      isOnComposition: false,
      distinguishCancelAndClose: false,
    };
  },
};
</script>
<style lang="scss">
@import "../../../assets/mixins/mixins";
@import "../../../assets/common/var";
@import "../../../assets/common/popup";

@include b(message-box) {
  display: inline-block;
  width: $--msgbox-width;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: $--color-white;
  border-radius: $--msgbox-border-radius;
  border: 1px solid $--border-color-lighter;
  font-size: $--messagebox-font-size;
  box-shadow: $--box-shadow-light;
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;

  @include e(wrapper) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;

    &::after {
      content: "";
      display: inline-block;
      height: 100%;
      width: 0;
      vertical-align: middle;
    }
  }

  @include e(header) {
    position: relative;
    padding: $--msgbox-padding-primary;
    padding-bottom: 10px;
  }

  @include e(title) {
    padding-left: 0;
    margin-bottom: 0;
    font-size: $--messagebox-font-size;
    line-height: 1;
    color: $--messagebox-title-color;
  }

  @include e(headerbtn) {
    position: absolute;
    top: $--msgbox-padding-primary;
    right: $--msgbox-padding-primary;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    font-size: $--message-close-size;
    cursor: pointer;

    .z-message-box__close {
      color: $--color-info;
    }

    &:focus,
    &:hover {
      .z-message-box__close {
        color: $--color-primary;
      }
    }
  }

  @include e(content) {
    padding: 10px $--msgbox-padding-primary;
    color: $--messagebox-content-color;
    font-size: $--messagebox-content-font-size;
  }

  @include e(container) {
    position: relative;
  }

  @include e(input) {
    padding-top: 15px;

    & input.invalid {
      border-color: $--color-danger;
      &:focus {
        border-color: $--color-danger;
      }
    }
  }

  @include e(status) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px !important;

    &::before {
      // 防止图标切割
      padding-left: 1px;
    }

    + .z-message-box__message {
      padding-left: 36px;
      padding-right: 12px;
    }

    &.z-icon-success {
      color: $--messagebox-success-color;
    }

    &.z-icon-info {
      color: $--messagebox-info-color;
    }

    &.z-icon-warning {
      color: $--messagebox-warning-color;
    }

    &.z-icon-error {
      color: $--messagebox-danger-color;
    }
  }

  @include e(message) {
    margin: 0;

    & p {
      margin: 0;
      line-height: 24px;
    }
  }

  @include e(errormsg) {
    color: $--color-danger;
    font-size: $--messagebox-error-font-size;
    min-height: 18px;
    margin-top: 2px;
  }

  @include e(btns) {
    padding: 5px 15px 0;
    text-align: right;

    & button:nth-child(2) {
      margin-left: 10px;
    }
  }

  @include e(btns-reverse) {
    flex-direction: row-reverse;
  }

  // centerAlign 布局
  @include m(center) {
    padding-bottom: 30px;

    @include e(header) {
      padding-top: 30px;
    }

    @include e(title) {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @include e(status) {
      position: relative;
      top: auto;
      padding-right: 5px;
      text-align: center;
      transform: translateY(-1px);
    }

    @include e(message) {
      margin-left: 0;
    }

    @include e((btns, content)) {
      text-align: center;
    }

    @include e(content) {
      $padding-horizontal: $--msgbox-padding-primary + 12px;

      padding-left: $padding-horizontal;
      padding-right: $padding-horizontal;
    }
  }
}

.msgbox-fade-enter-active {
  animation: msgbox-fade-in 0.3s;
}

.msgbox-fade-leave-active {
  animation: msgbox-fade-out 0.3s;
}

@keyframes msgbox-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes msgbox-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>
