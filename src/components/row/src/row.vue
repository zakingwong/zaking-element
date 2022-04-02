<script>
export default {
  name: "ZRow",
  componentName: "ZRow",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    gutter: Number,
    type: String,
    justify: {
      type: String,
      default: "start",
    },
    align: String,
  },
  computed: {
    style() {
      const ret = {};

      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }

      return ret;
    },
  },
  render(h) {
    return h(
      this.tag,
      {
        class: [
          "z-row",
          this.justify !== "start" ? `is-justify-${this.justify}` : "",
          this.align ? `is-align-${this.align}` : "",
          { "z-row--flex": this.type === "flex" },
        ],
        style: this.style,
      },
      this.$slots.default
    );
  },
};
</script>
<style lang="scss">
@import "../../../assets/common/var";
@import "../../../assets/mixins/mixins";
@import "../../../assets/mixins/utils";

@include b(row) {
  position: relative;
  box-sizing: border-box;
  @include utils-clearfix;

  @include m(flex) {
    display: flex;
    &:before,
    &:after {
      display: none;
    }

    @include when(justify-center) {
      justify-content: center;
    }
    @include when(justify-end) {
      justify-content: flex-end;
    }
    @include when(justify-space-between) {
      justify-content: space-between;
    }
    @include when(justify-space-around) {
      justify-content: space-around;
    }

    @include when(align-top) {
      align-items: flex-start;
    }

    @include when(align-middle) {
      align-items: center;
    }
    @include when(align-bottom) {
      align-items: flex-end;
    }
  }
}
</style>
