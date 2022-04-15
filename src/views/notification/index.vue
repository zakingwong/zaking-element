<template>
  <div class="notification-demo">
    <div class="example-header">1、基本用法</div>
    <div class="example-content">
      <z-button plain @click="open1"> 可自动关闭 </z-button>
      <z-button plain @click="open2"> 不会自动关闭 </z-button>
    </div>

    <div class="example-header">2、带有倾向性</div>
    <div class="example-content">
      <z-button plain @click="openTendentiousness1"> 成功 </z-button>
      <z-button plain @click="openTendentiousness2"> 警告 </z-button>
      <z-button plain @click="openTendentiousness3"> 消息 </z-button>
      <z-button plain @click="openTendentiousness4"> 错误 </z-button>
    </div>

    <div class="example-header">3、自定义位置</div>
    <div class="example-content">
      <z-button plain @click="openPosition1"> 右上角 </z-button>
      <z-button plain @click="openPosition2"> 右下角 </z-button>
      <z-button plain @click="openPosition3"> 左下角 </z-button>
      <z-button plain @click="openPosition4"> 左上角 </z-button>
    </div>

    <div class="example-header">4、带有偏移</div>
    <div class="example-content">
      <z-button plain @click="openDeviation"> 偏移的消息 </z-button>
    </div>

    <div class="example-header">5、使用HTML片段</div>
    <div class="example-content">
      <z-button plain @click="openHTML"> 使用 HTML 片段 </z-button>
    </div>

    <div class="example-header">6、隐藏关闭按钮</div>
    <div class="example-content">
      <z-button plain @click="openHiddenClose"> 隐藏关闭按钮 </z-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    open1() {
      const h = this.$createElement;

      this.$notify({
        title: "标题名称",
        message: h(
          "i",
          { style: "color: teal" },
          "这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案"
        ),
      });
    },

    open2() {
      this.$notify({
        title: "提示",
        message: "这是一条不会自动关闭的消息",
        duration: 0,
      });
    },

    openTendentiousness1() {
      this.$notify({
        title: "成功",
        message: "这是一条成功的提示消息",
        type: "success",
      });
    },

    openTendentiousness2() {
      this.$notify({
        title: "警告",
        message: "这是一条警告的提示消息",
        type: "warning",
      });
    },

    openTendentiousness3() {
      this.$notify.info({
        title: "消息",
        message: "这是一条消息的提示消息",
      });
    },

    openTendentiousness4() {
      this.$notify.error({
        title: "错误",
        message: "这是一条错误的提示消息",
      });
    },

    openPosition1() {
      this.$notify({
        title: "自定义位置",
        message: "右上角弹出的消息",
      });
    },

    openPosition2() {
      this.$notify({
        title: "自定义位置",
        message: "右下角弹出的消息",
        position: "bottom-right",
      });
    },

    openPosition3() {
      this.$notify({
        title: "自定义位置",
        message: "左下角弹出的消息",
        position: "bottom-left",
      });
    },

    openPosition4() {
      this.$notify({
        title: "自定义位置",
        message: "左上角弹出的消息",
        position: "top-left",
      });
    },

    openDeviation() {
      this.$notify({
        title: "偏移",
        message: "这是一条带有偏移的提示消息",
        offset: 100,
      });
    },

    openHTML() {
      this.$notify({
        title: "HTML 片段",
        dangerouslyUseHTMLString: true,
        message: "<strong>这是 <i>HTML</i> 片段</strong>",
      });
    },

    openHiddenClose() {
      this.$notify.success({
        title: "Info",
        message: "这是一条没有关闭按钮的消息",
        showClose: false,
      });
    },
  },
};
</script>
