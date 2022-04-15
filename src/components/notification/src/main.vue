<template>
  <transition name="z-notification-fade">
    <div
      :class="['z-notification', customClass, horizontalClass]"
      v-show="visible"
      :style="positionStyle"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
      @click="click"
      role="alert"
    >
      <i
        class="z-notification__icon"
        :class="[typeClass, iconClass]"
        v-if="type || iconClass"
      >
      </i>
      <div
        class="z-notification__group"
        :class="{ 'is-with-icon': typeClass || iconClass }"
      >
        <h2 class="z-notification__title" v-text="title"></h2>
        <div class="z-notification__content" v-show="message">
          <slot>
            <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
            <p v-else v-html="message"></p>
          </slot>
        </div>
        <div
          class="z-notification__closeBtn z-icon-close"
          v-if="showClose"
          @click.stop="close"
        ></div>
      </div>
    </div>
  </transition>
</template>

<script>
let typeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};

export default {
  data() {
    return {
      visible: false,
      title: "",
      message: "",
      duration: 4500,
      type: "",
      showClose: true,
      customClass: "",
      iconClass: "",
      onClose: null,
      onClick: null,
      closed: false,
      verticalOffset: 0,
      timer: null,
      dangerouslyUseHTMLString: false,
      position: "top-right",
    };
  },

  computed: {
    typeClass() {
      return this.type && typeMap[this.type]
        ? `z-icon-${typeMap[this.type]}`
        : "";
    },

    horizontalClass() {
      return this.position.indexOf("right") > -1 ? "right" : "left";
    },

    verticalProperty() {
      return /^top-/.test(this.position) ? "top" : "bottom";
    },

    positionStyle() {
      return {
        [this.verticalProperty]: `${this.verticalOffset}px`,
      };
    },
  },

  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener("transitionend", this.destroyElement);
      }
    },
  },

  methods: {
    destroyElement() {
      this.$el.removeEventListener("transitionend", this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },

    click() {
      if (typeof this.onClick === "function") {
        this.onClick();
      }
    },

    close() {
      this.closed = true;
      if (typeof this.onClose === "function") {
        this.onClose();
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
      if (e.keyCode === 46 || e.keyCode === 8) {
        this.clearTimer(); // detele 取消倒计时
      } else if (e.keyCode === 27) {
        // esc关闭消息
        if (!this.closed) {
          this.close();
        }
      } else {
        this.startTimer(); // 恢复倒计时
      }
    },
  },
  mounted() {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this.close();
        }
      }, this.duration);
    }
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

@include b(notification) {
  display: flex;
  width: $--notification-width;
  padding: $--notification-padding;
  border-radius: $--notification-radius;
  box-sizing: border-box;
  border: 1px solid $--notification-border-color;
  position: fixed;
  background-color: $--color-white;
  box-shadow: $--notification-shadow;
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
    bottom 0.3s;
  overflow: hidden;

  &.right {
    right: 16px;
  }

  &.left {
    left: 16px;
  }

  @include e(group) {
    margin-left: $--notification-group-margin-left;
    margin-right: $--notification-group-margin-right;
  }

  @include e(title) {
    font-weight: bold;
    font-size: $--notification-title-font-size;
    color: $--notification-title-color;
    margin: 0;
  }

  @include e(content) {
    font-size: $--notification-content-font-size;
    line-height: 21px;
    margin: 6px 0 0 0;
    color: $--notification-content-color;
    text-align: justify;

    p {
      margin: 0;
    }
  }

  @include e(icon) {
    height: $--notification-icon-size;
    width: $--notification-icon-size;
    font-size: $--notification-icon-size;
  }

  @include e(closeBtn) {
    position: absolute;
    top: 18px;
    right: 15px;
    cursor: pointer;
    color: $--notification-close-color;
    font-size: $--notification-close-font-size;

    &:hover {
      color: $--notification-close-hover-color;
    }
  }

  .z-icon-success {
    color: $--notification-success-icon-color;
  }

  .z-icon-error {
    color: $--notification-danger-icon-color;
  }

  .z-icon-info {
    color: $--notification-info-icon-color;
  }

  .z-icon-warning {
    color: $--notification-warning-icon-color;
  }
}

.z-notification-fade-enter {
  &.right {
    right: 0;
    transform: translateX(100%);
  }

  &.left {
    left: 0;
    transform: translateX(-100%);
  }
}

.z-notification-fade-leave-active {
  opacity: 0;
}
</style>
