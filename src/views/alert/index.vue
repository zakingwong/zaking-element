<template>
  <div class="alert-demo">
    <div class="example-header">1、基本用法：</div>
    <div class="example-content">
      <z-alert title="成功提示的文案" type="success"></z-alert>
      <z-alert title="消息提示的文案" type="info"></z-alert>
      <z-alert title="警告提示的文案" type="warning"></z-alert>
      <z-alert title="错误提示的文案" type="error"></z-alert>
    </div>
    <div class="example-header">2、主题：</div>
    <div class="example-content">
      <z-alert title="成功提示的文案" type="success" effect="dark"></z-alert>
      <z-alert title="消息提示的文案" type="info" effect="dark"></z-alert>
      <z-alert title="警告提示的文案" type="warning" effect="dark"></z-alert>
      <z-alert title="错误提示的文案" type="error" effect="dark"></z-alert>
    </div>
    <div class="example-header">3、自定义关闭按钮：</div>
    <div class="example-content">
      <z-alert title="不可关闭的 alert" type="success" :closable="false">
      </z-alert>
      <z-alert title="自定义 close-text" type="info" close-text="知道了">
      </z-alert>
      <z-alert title="设置了回调的 alert" type="warning" @close="hello">
      </z-alert>
    </div>
    <div class="example-header">4、带有icon：</div>
    <div class="example-content">
      <z-alert
        title="成功提示的文案"
        type="success"
        effect="dark"
        show-icon
      ></z-alert>
      <z-alert
        title="消息提示的文案"
        type="info"
        effect="dark"
        show-icon
      ></z-alert>
      <z-alert
        title="警告提示的文案"
        type="warning"
        effect="dark"
        show-icon
      ></z-alert>
      <z-alert
        title="错误提示的文案"
        type="error"
        effect="dark"
        show-icon
      ></z-alert>
    </div>
    <div class="example-header">5、文字居中：</div>
    <div class="example-content">
      <z-alert
        title="成功提示的文案"
        type="success"
        effect="dark"
        show-icon
        center
      ></z-alert>
      <z-alert
        title="消息提示的文案"
        type="info"
        effect="dark"
        show-icon
        center
      ></z-alert>
      <z-alert
        title="警告提示的文案"
        type="warning"
        effect="dark"
        show-icon
        center
      ></z-alert>
      <z-alert
        title="错误提示的文案"
        type="error"
        effect="dark"
        show-icon
        center
      ></z-alert>
    </div>
    <div class="example-header">6、带有辅助性文字介绍：</div>
    <div class="example-content">
      <z-alert
        title="带辅助性文字介绍"
        type="success"
        description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……"
      >
      </z-alert>
    </div>
    <div class="example-header">7、带有 icon 和辅助性文字介绍：</div>
    <div class="example-content">
      <z-alert
        title="成功提示的文案"
        type="success"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon
      >
      </z-alert>
      <z-alert
        title="消息提示的文案"
        type="info"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon
      >
      </z-alert>
      <z-alert
        title="警告提示的文案"
        type="warning"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon
      >
      </z-alert>
      <z-alert
        title="错误提示的文案"
        type="error"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon
      >
      </z-alert>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    hello() {
      alert("Hello World");
    },
  },
};
</script>
