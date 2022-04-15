<template>
  <div class="loading-demo">
    <div class="example-header">1、消息提示</div>
    <div class="example-content">
      <z-button type="text" @click="open">点击打开 Message Box</z-button>
    </div>

    <div class="example-header">2、确认消息</div>
    <div class="example-content">
      <z-button type="text" @click="openConfirm">点击打开 Message Box</z-button>
    </div>

    <div class="example-header">3、提交内容</div>
    <div class="example-content">
      <z-button type="text" @click="openSubmit">点击打开 Message Box</z-button>
    </div>

    <div class="example-header">4、自定义</div>
    <div class="example-content">
      <z-button type="text" @click="openDiy">点击打开 Message Box</z-button>
    </div>

    <div class="example-header">5、使用HTML片段</div>
    <div class="example-content">
      <z-button type="text" @click="openHTML">点击打开 Message Box</z-button>
    </div>

    <div class="example-header">6、区分取消和关闭</div>
    <div class="example-content">
      <z-button type="text" @click="openDistinguish"
        >点击打开 Message Box</z-button
      >
    </div>

    <div class="example-header">7、居中布局</div>
    <div class="example-content">
      <z-button type="text" @click="openCenter">点击打开 Message Box</z-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    open() {
      this.$alert("这是一段内容", "标题名称", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
    openConfirm() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    openSubmit() {
      this.$prompt("请输入邮箱", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern:
          /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "邮箱格式不正确",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的邮箱是: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    openDiy() {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [
          h("span", null, "内容可以是 "),
          h("i", { style: "color: teal" }, "VNode"),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        },
      }).then((action) => {
        this.$message({
          type: "info",
          message: "action: " + action,
        });
      });
    },
    openHTML() {
      this.$alert("<strong>这是 <i>HTML</i> 片段</strong>", "HTML 片段", {
        dangerouslyUseHTMLString: true,
      });
    },
    openDistinguish() {
      this.$confirm(
        "检测到未保存的内容，是否在离开页面前保存修改？",
        "确认信息",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "保存",
          cancelButtonText: "放弃修改",
        }
      )
        .then(() => {
          this.$message({
            type: "info",
            message: "保存修改",
          });
        })
        .catch((action) => {
          this.$message({
            type: "info",
            message:
              action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面",
          });
        });
    },
    openCenter() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
