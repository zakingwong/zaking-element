<template>
  <main class="z-main">
    <slot></slot>
  </main>
</template>
<script>
export default {
  name: "ZMain",
  componentName: "ZMain",
};
</script>
<style lang="scss">
@import "../../../assets/mixins/mixins";
@import "../../../assets/common/var";

@include b(main) {
  // IE11 supports the <main> element partially https://caniuse.com/#search=main
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: $--main-padding;
}
</style>
