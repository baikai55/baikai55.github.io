<template>
  <!-- 左侧导航开始 -->
  <el-aside width="210px" class="a-side">
    <el-menu class="el-menu-vertical-demo" background-color="transparent" :router="true" :default-active="key">
      <el-menu-item index="/">首页</el-menu-item>
      <template v-for="item in userRole">
        <el-submenu v-if="item.path !=='*' && item.hidden!==true" :key="item.id" :index="item.path">
          <template slot="title">
            <i :class="item.icon" class="iconfont" style="margin-right:10px"></i>
            <span>{{item.title}}</span>
          </template>
          <template v-for="subItem in item.children">
            <el-menu-item :index="subItem.path" v-if="subItem.hidden!==true" :key="subItem.id">
              <template slot="title">
                <!-- 图标 -->
                <!-- <i style="padding-right: 10px" :class="subItem.icon"></i> -->
                <!-- 文本 -->
                <span>{{ subItem.title }}</span>
              </template>
            </el-menu-item>
          </template>
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
      // menuData: []
    };
  },
  mounted() { },
  created() {
    console.log(this.userRole);
    // this.menuData = this.userRole;
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

  .el-menu-item:hover {
    background: rgba($color: rgb(227, 227, 227), $alpha: 0.4) !important;
  }

  :deep .el-submenu__title:hover {
    background: rgba($color: rgb(227, 227, 227), $alpha: 0.4) !important;
  }
}

li.el-menu-item.is-active {
  color: #409eff !important;
  background-color: transparent !important;
}

:deep li.el-submenu.is-active {
  .el-submenu__title {
    color: #409eff;

    i {
      color: #409eff !important;
    }
  }
}

aside.el-aside.a-side::-webkit-scrollbar {
  width: 0;
}
</style>