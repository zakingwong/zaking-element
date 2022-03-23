<template>
  <div id="app">
    <div class="header">复刻element源码，讲解核心细节。</div>
    <div class="content">
      <div class="left-nav">
        <ul class="nav-corver">
          <li
            :class="['nav-item', item.active ? 'active' : '']"
            v-for="item in routerConfig"
            :key="item.name"
            @click="changeActive(item)"
          >
            <router-link class="nav-item-link" :to="item.path">{{
              item.name
            }}</router-link>
          </li>
        </ul>
      </div>
      <div class="right-deta">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      routerConfig: [{ path: "/alert", name: "Alert", active: false }],
      storageActive: null,
    };
  },
  methods: {
    changeActive(item) {
      if (this.storageActive && this.storageActive.active) {
        this.storageActive.active = false;
      }
      if (!item.active) {
        item.active = true;
        this.storageActive = item;
      }
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  width: 100%;
  height: 50px;
  border: 2px solid #8fff8f;
  box-sizing: border-box;
}
.content {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.left-nav {
  width: 150px;
  height: 100%;
  overflow: scroll;
}
.nav-corver {
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav-item {
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  background-color: palegoldenrod;
  color: blue;
}
.nav-item:hover {
  cursor: pointer;
  background: pink;
}
.nav-item.active {
  color: white;
  background: orangered;
}
.right-deta {
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #87d;
  flex: 1;
}
.nav-item-link {
  width: 100%;
  display: inline-block;
  text-decoration: none;
  padding: 0 30px;
  box-sizing: border-box;
}
</style>
