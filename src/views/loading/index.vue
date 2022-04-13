<template>
  <div class="loading-demo">
    <div class="example-header">1、区域加载：</div>
    <div class="example-content">
      <div class="loading-demo1" v-loading="true"></div>
    </div>

    <div class="example-header">2、自定义：</div>
    <div class="example-content">
      <div
        class="loading-demo1"
        v-loading="true"
        zlement-loading-text="拼命加载中"
        zlement-loading-spinner="z-icon-loading"
        zlement-loading-background="rgba(0, 0, 0, 0.8)"
      ></div>
    </div>

    <div class="example-header">3、整页加载：</div>
    <div class="example-content">
      <z-button
        type="primary"
        @click="openFullScreen1"
        v-loading.fullscreen.lock="fullscreenLoading"
      >
        指令方式
      </z-button>
      <z-button type="primary" @click="openFullScreen2"> 服务方式 </z-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
    };
  },
  methods: {
    openFullScreen1() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    },
    openFullScreen2() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "z-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
  },
};
</script>
<style lang="scss" scoped>
.loading-demo1 {
  width: 100%;
  height: 200px;
  border: 1px solid red;
}
</style>
