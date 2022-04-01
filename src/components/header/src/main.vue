<template>
  <header class="z-header" :style="{ height }">
    <slot></slot>
  </header>
</template>
<script>
export default {
  name: "ZHeader",
  componentName: "ZHeader",
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

@include b(header) {
  padding: $--header-padding;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
