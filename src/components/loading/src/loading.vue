<template>
  <transition class="z-loading-fade" @after-leave="handleAfterLeave">
    <div
      class="z-loading-mask"
      v-show="visible"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]"
    >
      <div class="z-loading-spinner">
        <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" />
        </svg>
        <i v-else :class="spinner"></i>
        <p v-if="text" class="z-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      text: null,
      spinner: null,
      background: null,
      fullscreen: true,
      visible: false,
      customClass: "",
    };
  },
  methods: {
    handleAfterLeave() {
      this.$emit("after-leave");
    },
    setText(text) {
      this.text = text;
    },
  },
};
</script>
<style lang="scss">
@use "sass:math";
@import "../../../assets/mixins/mixins";
@import "../../../assets/common/var";

@include b(loading-parent) {
  @include m(relative) {
    position: relative !important;
  }

  @include m(hidden) {
    overflow: hidden !important;
  }
}

@include b(loading-mask) {
  position: absolute;
  z-index: 2000;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;

  @include when(fullscreen) {
    position: fixed;

    .zs-loading-spinner {
      margin-top: #{math.div(-$--loading-fullscreen-spinner-size, 2)};

      .circular {
        height: $--loading-fullscreen-spinner-size;
        width: $--loading-fullscreen-spinner-size;
      }
    }
  }
}

@include b(loading-spinner) {
  top: 50%;
  margin-top: #{math.div(-$--loading-spinner-size, 2)};
  width: 100%;
  text-align: center;
  position: absolute;

  .z-loading-text {
    color: $--color-primary;
    margin: 3px 0;
    font-size: 14px;
  }

  .circular {
    height: $--loading-spinner-size;
    width: $--loading-spinner-size;
    animation: loading-rotate 2s linear infinite;
  }

  .path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: $--color-primary;
    stroke-linecap: round;
  }

  i {
    color: $--color-primary;
  }
}

.z-loading-fade-enter,
.z-loading-fade-leave-active {
  opacity: 0;
}

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
