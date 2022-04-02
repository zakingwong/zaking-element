<template>
  <div class="layout-demo">
    <div class="example-header">1、基础布局：</div>
    <div class="example-content">
      <z-row>
        <z-col :span="24"
          ><div class="grid-content bg-purple-dark"></div
        ></z-col>
      </z-row>
      <z-row>
        <z-col :span="12"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="12"
          ><div class="grid-content bg-purple-light"></div
        ></z-col>
      </z-row>
      <z-row>
        <z-col :span="8"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="8"
          ><div class="grid-content bg-purple-light"></div
        ></z-col>
        <z-col :span="8"><div class="grid-content bg-purple"></div></z-col>
      </z-row>
      <z-row>
        <z-col :span="6"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></z-col>
        <z-col :span="6"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></z-col>
      </z-row>
      <z-row>
        <z-col :span="4"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="4"
          ><div class="grid-content bg-purple-light"></div
        ></z-col>
        <z-col :span="4"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="4"
          ><div class="grid-content bg-purple-light"></div
        ></z-col>
        <z-col :span="4"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="4"
          ><div class="grid-content bg-purple-light"></div
        ></z-col>
      </z-row>
    </div>

    <div class="example-header">2、混合布局：</div>
    <div class="example-content">
      <z-row :gutter="20">
        <z-col :span="16"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="8"><div class="grid-content bg-purple"></div></z-col>
      </z-row>
      <z-row :gutter="20">
        <z-col :span="8"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="8"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="4"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="4"><div class="grid-content bg-purple"></div></z-col>
      </z-row>
      <z-row :gutter="20">
        <z-col :span="4"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="16"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="4"><div class="grid-content bg-purple"></div></z-col>
      </z-row>
    </div>

    <div class="example-header">3、分栏偏移：</div>
    <div class="example-content">
      <z-row :gutter="20">
        <z-col :span="6"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="6" :offset="6"
          ><div class="grid-content bg-purple"></div
        ></z-col>
      </z-row>
      <z-row :gutter="20">
        <z-col :span="6" :offset="6"
          ><div class="grid-content bg-purple"></div
        ></z-col>
        <z-col :span="6" :offset="6"
          ><div class="grid-content bg-purple"></div
        ></z-col>
      </z-row>
      <z-row :gutter="20">
        <z-col :span="12" :offset="6"
          ><div class="grid-content bg-purple"></div
        ></z-col>
      </z-row>
    </div>

    <div class="example-header">4、对齐方式：</div>
    <div class="example-content">
      <z-row type="flex" class="row-bg">
        <z-col :span="6"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></z-col>
        <z-col :span="6"><div class="grid-content bg-purple"></div></z-col>
      </z-row>
      <z-row type="flex" class="row-bg" justify="center">
        <z-col :span="6"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></z-col>
        <z-col :span="6"><div class="grid-content bg-purple"></div></z-col>
      </z-row>
      <z-row type="flex" class="row-bg" justify="end">
        <z-col :span="6"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></z-col>
        <z-col :span="6"><div class="grid-content bg-purple"></div></z-col>
      </z-row>
      <z-row type="flex" class="row-bg" justify="space-between">
        <z-col :span="6"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></z-col>
        <z-col :span="6"><div class="grid-content bg-purple"></div></z-col>
      </z-row>
      <z-row type="flex" class="row-bg" justify="space-around">
        <z-col :span="6"><div class="grid-content bg-purple"></div></z-col>
        <z-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></z-col>
        <z-col :span="6"><div class="grid-content bg-purple"></div></z-col>
      </z-row>
    </div>

    <div class="example-header">5、响应式布局：</div>
    <div class="example-content">
      <z-row :gutter="10">
        <z-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
          ><div class="grid-content bg-purple"></div
        ></z-col>
        <z-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
          ><div class="grid-content bg-purple-light"></div
        ></z-col>
        <z-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
          ><div class="grid-content bg-purple"></div
        ></z-col>
        <z-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
          ><div class="grid-content bg-purple-light"></div
        ></z-col>
      </z-row>
    </div>
  </div>
</template>
<style lang="scss">
.z-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.z-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
