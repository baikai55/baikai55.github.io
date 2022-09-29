<template>
  <!-- 左侧导航开始 -->
  <el-aside width="210px" class="a-side">
    <el-menu class="el-menu-vertical-demo" background-color="transparent" :router="true" :default-active="key">
      <template v-for="item in menuData">
        <el-submenu v-if="item.path !=='*'" :key="item.id" :index="item.path">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id">
            <template slot="title">
              <!-- 图标 -->
              <i style="padding-right: 10px" :class="subItem.icon"></i>
              <!-- 文本 -->
              <span>{{ subItem.title }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
  <!-- 左侧导航结束 -->
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['userRole']),
    key() {
      return this.$route.path;
    },
  },
  data() {
    return {
      menuData: []
    };
  },
  mounted() { },
  created() {
    this.menuData = this.userRole;
  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
aside.el-aside.a-side {
  height: calc(100vh - 60px);
  background-color: #fff;
  border-right: solid 1px #e6e6e6;

  ul.el-menu-vertical-demo.el-menu {
    border: none;
  }
}

aside.el-aside.a-side::-webkit-scrollbar {
  width: 0;
}
</style>