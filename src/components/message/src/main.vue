<template>
  <transition name="z-message-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        'z-message',
        type && !iconClass ? `z-message--${type}` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass,
      ]"
      :style="positionStyle"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      role="alert"
    >
      <i :class="iconClass" v-if="iconClass"></i>
      <i :class="typeClass" v-else></i>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="z-message__content">
          {{ message }}
        </p>
        <p v-else v-html="message" class="z-message__content"></p>
      </slot>
      <i
        v-if="showClose"
        class="z-message__closeBtn z-icon-close"
        @click="close"
      ></i>
    </div>
  </transition>
</template>

<script>
const typeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};

export default {
  data() {
    return {
      visible: false,
      message: "",
      duration: 3000,
      type: "info",
      iconClass: "",
      customClass: "",
      onClose: null,
      showClose: false,
      closed: false,
      verticalOffset: 20,
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false,
    };
  },

  computed: {
    typeClass() {
      return this.type && !this.iconClass
        ? `z-message__icon z-icon-${typeMap[this.type]}`
        : "";
    },
    positionStyle() {
      return {
        top: `${this.verticalOffset}px`,
      };
    },
  },

  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    },
  },

  methods: {
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },

    close() {
      this.closed = true;
      if (typeof this.onClose === "function") {
        this.onClose(this);
      }
    },

    clearTimer() {
      clearTimeout(this.timer);
    },

    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    keydown(e) {
      if (e.keyCode === 27) {
        // esc关闭消息
        if (!this.closed) {
          this.close();
        }
      }
    },
  },
  mounted() {
    this.startTimer();
    document.addEventListener("keydown", this.keydown);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keydown);
  },
};
</script>
<style lang="scss">
@import "../../../assets/mixins/mixins";
@import "../../../assets/common/var";

@include b(message) {
  min-width: $--message-min-width;
  box-sizing: border-box;
  border-radius: $--border-radius-base;
  border-width: $--border-width-base;
  border-style: $--border-style-base;
  border-color: $--border-color-lighter;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  background-color: $--message-background-color;
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  overflow: hidden;
  padding: $--message-padding;
  display: flex;
  align-items: center;

  @include when(center) {
    justify-content: center;
  }

  @include when(closable) {
    .z-message__content {
      padding-right: 16px;
    }
  }

  p {
    margin: 0;
  }

  @include m(info) {
    .z-message__content {
      color: $--message-info-font-color;
    }
  }

  @include m(success) {
    background-color: $--color-success-lighter;
    border-color: $--color-success-light;

    .z-message__content {
      color: $--message-success-font-color;
    }
  }

  @include m(warning) {
    background-color: $--color-warning-lighter;
    border-color: $--color-warning-light;

    .z-message__content {
      color: $--message-warning-font-color;
    }
  }

  @include m(error) {
    background-color: $--color-danger-lighter;
    border-color: $--color-danger-light;

    .z-message__content {
      color: $--message-danger-font-color;
    }
  }

  @include e(icon) {
    margin-right: 10px;
  }

  @include e(content) {
    padding: 0;
    font-size: 14px;
    line-height: 1;
    &:focus {
      outline-width: 0;
    }
  }

  @include e(closeBtn) {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
    color: $--message-close-icon-color;
    font-size: $--message-close-size;

    &:focus {
      outline-width: 0;
    }
    &:hover {
      color: $--message-close-hover-color;
    }
  }

  & .z-icon-success {
    color: $--message-success-font-color;
  }

  & .z-icon-error {
    color: $--message-danger-font-color;
  }

  & .z-icon-info {
    color: $--message-info-font-color;
  }

  & .z-icon-warning {
    color: $--message-warning-font-color;
  }
}

.z-message-fade-enter,
.z-message-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
