<template>
  <div class="home">
    <el-container style="height: 100%; flex-direction: column">
      <Header></Header>
      <el-container class="content">
        <Sidebar></Sidebar>
        <el-container class="right">
          <el-container>
            <el-main>
              <!-- <Bread></Bread> -->
              <!-- <Tabs></Tabs> -->
              <router-view :key="key"></router-view>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import Sidebar from "./sideBar";
import Header from './header'
import Bread from './bread'
import Tabs from './tabs'
export default {
  components: {
    Sidebar,
    Header,
    Bread,
    Tabs
  },
  computed: {
    key: {
      get() {
        return this.$route.path;
      },
      set() {
        this.editableTabsValue = this.$route.path;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
main.el-main {
  background-color: rgb(212, 212, 212);
  padding-bottom: 0;
}
</style>
