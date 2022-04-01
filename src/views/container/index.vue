<template>
  <div class="container-demo">
    <div class="example-header">1、常见页面布局：</div>
    <div class="example-content">
      <z-container>
        <z-header>Header</z-header>
        <z-main>Main</z-main>
      </z-container>
    </div>

    <div class="example-content">
      <z-container>
        <z-header>Header</z-header>
        <z-main>Main</z-main>
        <z-footer>Footer</z-footer>
      </z-container>
    </div>

    <div class="example-content">
      <z-container>
        <z-aside width="200px">Aside</z-aside>
        <z-main>Main</z-main>
      </z-container>
    </div>

    <div class="example-content">
      <z-container>
        <z-header>Header</z-header>
        <z-container>
          <z-aside width="200px">Aside</z-aside>
          <z-main>Main</z-main>
        </z-container>
      </z-container>
    </div>

    <div class="example-content">
      <z-container>
        <z-header>Header</z-header>
        <z-container>
          <z-aside width="200px">Aside</z-aside>
          <z-container>
            <z-main>Main</z-main>
            <z-footer>Footer</z-footer>
          </z-container>
        </z-container>
      </z-container>
    </div>

    <div class="example-content">
      <z-container>
        <z-aside width="200px">Aside</z-aside>
        <z-container>
          <z-header>Header</z-header>
          <z-main>Main</z-main>
        </z-container>
      </z-container>
    </div>

    <div class="example-content">
      <z-container>
        <z-aside width="200px">Aside</z-aside>
        <z-container>
          <z-header>Header</z-header>
          <z-main>Main</z-main>
          <z-footer>Footer</z-footer>
        </z-container>
      </z-container>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.z-header,
.z-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.z-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.z-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .z-container {
  margin-bottom: 40px;
}

.z-container:nth-child(5) .z-aside,
.z-container:nth-child(6) .z-aside {
  line-height: 260px;
}

.z-container:nth-child(7) .z-aside {
  line-height: 320px;
}
</style>
