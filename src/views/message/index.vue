<template>
  <div class="message-demo">
    <div class="example-header">1、基础用法：</div>
    <div class="example-content">
      <z-button :plain="true" @click="open">打开消息提示</z-button>
      <z-button :plain="true" @click="openVn">VNode</z-button>
    </div>

    <div class="example-header">2、不同状态：</div>
    <div class="example-content">
      <z-button :plain="true" @click="open2">成功</z-button>
      <z-button :plain="true" @click="open3">警告</z-button>
      <z-button :plain="true" @click="open1">消息</z-button>
      <z-button :plain="true" @click="open4">错误</z-button>
    </div>

    <div class="example-header">3、可关闭：</div>
    <div class="example-content">
      <z-button :plain="true" @click="openc1">消息</z-button>
      <z-button :plain="true" @click="openc2">成功</z-button>
      <z-button :plain="true" @click="openc3">警告</z-button>
      <z-button :plain="true" @click="openc4">错误</z-button>
    </div>

    <div class="example-header">4、文字居中：</div>
    <div class="example-content">
      <z-button :plain="true" @click="openCenter">文字居中</z-button>
    </div>

    <div class="example-header">5、使用HTML片段：</div>
    <div class="example-content">
      <z-button :plain="true" @click="openHTML">使用 HTML 片段</z-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    open() {
      this.$message("这是一条消息提示");
    },

    openVn() {
      const h = this.$createElement;
      this.$message({
        message: h("p", null, [
          h("span", null, "内容可以是 "),
          h("i", { style: "color: teal" }, "VNode"),
        ]),
      });
    },

    open1() {
      this.$message("这是一条消息提示");
    },

    open2() {
      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success",
      });
    },

    open3() {
      this.$message({
        message: "警告哦，这是一条警告消息",
        type: "warning",
      });
    },

    open4() {
      this.$message.error("错了哦，这是一条错误消息");
    },

    openc1() {
      this.$message({
        duration: 0,
        showClose: true,
        message: "这是一条消息提示",
      });
    },

    openc2() {
      this.$message({
        showClose: true,
        message: "恭喜你，这是一条成功消息",
        type: "success",
      });
    },

    openc3() {
      this.$message({
        showClose: true,
        message: "警告哦，这是一条警告消息",
        type: "warning",
      });
    },

    openc4() {
      this.$message({
        showClose: true,
        message: "错了哦，这是一条错误消息",
        type: "error",
      });
    },

    openCenter() {
      this.$message({
        message: "居中的文字",
        center: true,
      });
    },

    openHTML() {
      this.$message({
        dangerouslyUseHTMLString: true,
        message: "<strong>这是 <i>HTML</i> 片段</strong>",
      });
    },
  },
};
</script>
