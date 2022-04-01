<template>
  <section class="z-container" :class="{ 'is-vertical': isVertical }">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "ZContainer",
  componentName: "ZContainer",
  props: {
    direction: String,
  },
  computed: {
    isVertical() {
      if (this.direction === "vertical") {
        return true;
      } else if (this.direction === "horizontal") {
        return false;
      }
      // 这一块就是判断是否有插槽，并且如果有插槽，则判断插槽是否存在header或footer
      // 如果存在则返回true
      return this.$slots && this.$slots.default
        ? this.$slots.default.some((vnode) => {
            const tag = vnode.componentOptions && vnode.componentOptions.tag;
            return tag === "z-header" || tag === "z-footer";
          })
        : false;
    },
  },
};
</script>
<style lang="scss">
@import "../../../assets/mixins/mixins";

@include b(container) {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;

  @include when(vertical) {
    flex-direction: column;
  }
}
</style>
