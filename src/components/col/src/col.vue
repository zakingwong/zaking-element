<script>
export default {
  name: "ZCol",

  props: {
    span: {
      type: Number,
      default: 24,
    },
    tag: {
      type: String,
      default: "div",
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object],
  },

  computed: {
    gutter() {
      let parent = this.$parent;
      while (parent && parent.$options.componentName !== "ZRow") {
        parent = parent.$parent;
      }
      return parent ? parent.gutter : 0;
    },
  },
  render(h) {
    let classList = [];
    let style = {};

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + "px";
      style.paddingRight = style.paddingLeft;
    }

    ["span", "offset", "pull", "push"].forEach((prop) => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== "span"
            ? `z-col-${prop}-${this[prop]}`
            : `z-col-${this[prop]}`
        );
      }
    });

    ["xs", "sm", "md", "lg", "xl"].forEach((size) => {
      if (typeof this[size] === "number") {
        classList.push(`z-col-${size}-${this[size]}`);
      } else if (typeof this[size] === "object") {
        let props = this[size];
        Object.keys(props).forEach((prop) => {
          classList.push(
            prop !== "span"
              ? `z-col-${size}-${prop}-${props[prop]}`
              : `z-col-${size}-${props[prop]}`
          );
        });
      }
    });

    return h(
      this.tag,
      {
        class: ["z-col", classList],
        style,
      },
      this.$slots.default
    );
  },
};
</script>
<style lang="scss">
@use "sass:math";
@import "../../../assets/common/var.scss";
@import "../../../assets/mixins/mixins.scss";

[class*="z-col-"] {
  float: left;
  box-sizing: border-box;
}

.z-col-0 {
  display: none;
}

@for $i from 0 through 24 {
  .z-col-#{$i} {
    width: (math.div(1, 24) * $i * 100) * 1%;
  }

  .z-col-offset-#{$i} {
    margin-left: (math.div(1, 24) * $i * 100) * 1%;
  }

  .z-col-pull-#{$i} {
    position: relative;
    right: (math.div(1, 24) * $i * 100) * 1%;
  }

  .z-col-push-#{$i} {
    position: relative;
    left: (math.div(1, 24) * $i * 100) * 1%;
  }
}

@include res(xs) {
  .z-col-xs-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .z-col-xs-#{$i} {
      width: (math.div(1, 24) * $i * 100) * 1%;
    }

    .z-col-xs-offset-#{$i} {
      margin-left: (math.div(1, 24) * $i * 100) * 1%;
    }

    .z-col-xs-pull-#{$i} {
      position: relative;
      right: (math.div(1, 24) * $i * 100) * 1%;
    }

    .z-col-xs-push-#{$i} {
      position: relative;
      left: (math.div(1, 24) * $i * 100) * 1%;
    }
  }
}

@include res(sm) {
  .z-col-sm-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .z-col-sm-#{$i} {
      width: (math.div(1, 24) * $i * 100) * 1%;
    }

    .z-col-sm-offset-#{$i} {
      margin-left: (math.div(1, 24) * $i * 100) * 1%;
    }

    .z-col-sm-pull-#{$i} {
      position: relative;
      right: (math.div(1, 24) * $i * 100) * 1%;
    }

    .z-col-sm-push-#{$i} {
      position: relative;
      left: (math.div(1, 24) * $i * 100) * 1%;
    }
  }
}

@include res(md) {
  .z-col-md-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .z-col-md-#{$i} {
      width: (math.div(1, 24) * $i * 100) * 1%;
    }

    .z-col-md-offset-#{$i} {
      margin-left: (math.div(1, 24) * $i * 100) * 1%;
    }

    .z-col-md-pull-#{$i} {
      position: relative;
      right: (math.div(1, 24) * $i * 100) * 1%;
    }

    .z-col-md-push-#{$i} {
      position: relative;
      left: (math.div(1, 24) * $i * 100) * 1%;
    }
  }
}

@include res(lg) {
  .z-col-lg-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .z-col-lg-#{$i} {
      width: (math.div(1, 24) * $i * 100) * 1%;
    }

    .z-col-lg-offset-#{$i} {
      margin-left: (math.div(1, 24) * $i * 100) * 1%;
    }

    .z-col-lg-pull-#{$i} {
      position: relative;
      right: (math.div(1, 24) * $i * 100) * 1%;
    }

    .z-col-lg-push-#{$i} {
      position: relative;
      left: (math.div(1, 24) * $i * 100) * 1%;
    }
  }
}

@include res(xl) {
  .z-col-xl-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .z-col-xl-#{$i} {
      width: (math.div(1, 24) * $i * 100) * 1%;
    }

    .z-col-xl-offset-#{$i} {
      margin-left: (math.div(1, 24) * $i * 100) * 1%;
    }

    .z-col-xl-pull-#{$i} {
      position: relative;
      right: (math.div(1, 24) * $i * 100) * 1%;
    }

    .z-col-xl-push-#{$i} {
      position: relative;
      left: (math.div(1, 24) * $i * 100) * 1%;
    }
  }
}
</style>
