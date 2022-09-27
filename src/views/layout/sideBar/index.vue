<template>
  <!-- 左侧导航开始 -->
  <el-aside width="200px" class="a-side">
    <el-menu class="el-menu-vertical-demo" background-color="transparent" :router="true">
      <el-submenu :index="item.id + ''" v-for="item in menuData" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
          <template slot="title">
            <!-- 图标 -->
            <i style="padding-right: 10px" :class="subItem.icon"></i>
            <!-- 文本 -->
            <span>{{ subItem.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  <!-- 左侧导航结束 -->
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['userRole']),
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
<style>
aside.el-aside.a-side {
  height: calc(100vh - 60px);
}
</style>
<style scoped lang="scss">

</style>