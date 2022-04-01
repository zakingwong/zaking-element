<template>
  <footer class="z-footer" :style="{ height }">
    <slot></slot>
  </footer>
</template>
<script>
export default {
  name: "ZFooter",
  componentName: "ZFooter",
  props: {
    height: {
      type: String,
      default: "60px",
    },
  },
};
</script>
<style lang="scss">
@import "../../../assets/mixins/mixins";
@import "../../../assets/common/var";

@include b(footer) {
  padding: $--footer-padding;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
