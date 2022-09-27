<template>
  <div class="home">
    <el-container style="height: 100%; flex-direction: column">
      <!-- 顶部开始 -->
      <Header></Header>
      <!-- 顶部结束 -->
      <el-container class="content">
        <Sidebar></Sidebar>
        <el-container class="right">
          <el-container>
            <!-- 中间内容区开始 -->
            <el-main>
              <router-view :key="key"></router-view>
            </el-main>
            <!-- 中间内容区结束 -->
          </el-container>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import Sidebar from "./sideBar";
import Header from './header'
export default {
  beforeRouteEnter(to, from, next) {
    next()
    console.log(to, from, 'next');
  },
  components: {
    Sidebar,
    Header
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
  background-color: #fff;
}
</style>
