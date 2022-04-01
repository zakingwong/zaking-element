<template>
  <aside class="z-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>
<script>
export default {
  name: "ZAside",
  componentName: "ZAside",
  props: {
    width: {
      type: String,
      default: "300px",
    },
  },
};
</script>
<style lang="scss">
@import "../../../assets/mixins/mixins";

@include b(aside) {
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
