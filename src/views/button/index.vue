<template>
  <div class="button-demo">
    <div class="example-header">1、基础用法：</div>
    <div class="example-content">
      <z-row>
        <z-button>默认按钮</z-button>
        <z-button type="primary">主要按钮</z-button>
        <z-button type="success">成功按钮</z-button>
        <z-button type="info">信息按钮</z-button>
        <z-button type="warning">警告按钮</z-button>
        <z-button type="danger">危险按钮</z-button>
      </z-row>

      <z-row>
        <z-button plain>朴素按钮</z-button>
        <z-button type="primary" plain>主要按钮</z-button>
        <z-button type="success" plain>成功按钮</z-button>
        <z-button type="info" plain>信息按钮</z-button>
        <z-button type="warning" plain>警告按钮</z-button>
        <z-button type="danger" plain>危险按钮</z-button>
      </z-row>

      <z-row>
        <z-button round>圆角按钮</z-button>
        <z-button type="primary" round>主要按钮</z-button>
        <z-button type="success" round>成功按钮</z-button>
        <z-button type="info" round>信息按钮</z-button>
        <z-button type="warning" round>警告按钮</z-button>
        <z-button type="danger" round>危险按钮</z-button>
      </z-row>

      <z-row>
        <z-button icon="z-icon-search" circle></z-button>
        <z-button type="primary" icon="z-icon-edit" circle></z-button>
        <z-button type="success" icon="z-icon-check" circle></z-button>
        <z-button type="info" icon="z-icon-message" circle></z-button>
        <z-button type="warning" icon="z-icon-star-off" circle></z-button>
        <z-button type="danger" icon="z-icon-delete" circle></z-button>
      </z-row>
    </div>

    <div class="example-header">2、禁用状态：</div>
    <div class="example-content">
      <z-row>
        <z-button disabled>默认按钮</z-button>
        <z-button type="primary" disabled>主要按钮</z-button>
        <z-button type="success" disabled>成功按钮</z-button>
        <z-button type="info" disabled>信息按钮</z-button>
        <z-button type="warning" disabled>警告按钮</z-button>
        <z-button type="danger" disabled>危险按钮</z-button>
      </z-row>

      <z-row>
        <z-button plain disabled>朴素按钮</z-button>
        <z-button type="primary" plain disabled>主要按钮</z-button>
        <z-button type="success" plain disabled>成功按钮</z-button>
        <z-button type="info" plain disabled>信息按钮</z-button>
        <z-button type="warning" plain disabled>警告按钮</z-button>
        <z-button type="danger" plain disabled>危险按钮</z-button>
      </z-row>
    </div>

    <div class="example-header">3、文字按钮：</div>
    <div class="example-content">
      <z-button type="text">文字按钮</z-button>
      <z-button type="text" disabled>文字按钮</z-button>
    </div>

    <div class="example-header">4、图标按钮：</div>
    <div class="example-content">
      <z-button type="primary" icon="z-icon-edit"></z-button>
      <z-button type="primary" icon="z-icon-share"></z-button>
      <z-button type="primary" icon="z-icon-delete"></z-button>
      <z-button type="primary" icon="z-icon-search">搜索</z-button>
      <z-button type="primary"
        >上传<i class="z-icon-upload z-icon--right"></i
      ></z-button>
    </div>

    <div class="example-header">5、按钮组：</div>
    <div class="example-content">
      <z-button-group>
        <z-button type="primary" icon="z-icon-arrow-left">上一页</z-button>
        <z-button type="primary"
          >下一页<i class="z-icon-arrow-right z-icon--right"></i
        ></z-button>
      </z-button-group>
      <z-button-group>
        <z-button type="primary" icon="z-icon-edit"></z-button>
        <z-button type="primary" icon="z-icon-share"></z-button>
        <z-button type="primary" icon="z-icon-delete"></z-button>
      </z-button-group>
    </div>

    <div class="example-header">6、加载中：</div>
    <div class="example-content">
      <z-button type="primary" :loading="true">加载中</z-button>
    </div>

    <div class="example-header">7、不同尺寸：</div>
    <div class="example-content">
      <z-row>
        <z-button>默认按钮</z-button>
        <z-button size="medium">中等按钮</z-button>
        <z-button size="small">小型按钮</z-button>
        <z-button size="mini">超小按钮</z-button>
      </z-row>
      <z-row>
        <z-button round>默认按钮</z-button>
        <z-button size="medium" round>中等按钮</z-button>
        <z-button size="small" round>小型按钮</z-button>
        <z-button size="mini" round>超小按钮</z-button>
      </z-row>
    </div>
  </div>
</template>
