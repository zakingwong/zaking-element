<template>
  <div class="link-demo">
    <div class="example-header">1、基础用法：</div>
    <div class="example-content">
      <z-link href="https://element.eleme.io" target="_blank">默认链接</z-link>
      <z-link type="primary">主要链接</z-link>
      <z-link type="success">成功链接</z-link>
      <z-link type="warning">警告链接</z-link>
      <z-link type="danger">危险链接</z-link>
      <z-link type="info">信息链接</z-link>
    </div>

    <div class="example-header">2、禁用状态：</div>
    <div class="example-content">
      <z-link disabled>默认链接</z-link>
      <z-link type="primary" disabled>主要链接</z-link>
      <z-link type="success" disabled>成功链接</z-link>
      <z-link type="warning" disabled>警告链接</z-link>
      <z-link type="danger" disabled>危险链接</z-link>
      <z-link type="info" disabled>信息链接</z-link>
    </div>

    <div class="example-header">3、下划线：</div>
    <div class="example-content">
      <z-link :underline="false">无下划线</z-link>
      <z-link>有下划线</z-link>
    </div>

    <div class="example-header">4、图标：</div>
    <div class="example-content">
      <z-link icon="z-icon-edit">编辑</z-link>
      <z-link>查看<i class="z-icon-view z-icon--right"></i> </z-link>
      <z-link
        >文件
        <template #icon>
          <i class="z-icon-folder z-icon--right"></i>
        </template>
      </z-link>
    </div>
  </div>
</template>
