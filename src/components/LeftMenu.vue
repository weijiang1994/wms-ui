<template>
  <el-aside :width="menuWidth">
    <el-row class="tac">
      <el-col>
        <el-menu
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="/index" @click="goPage('home')">
            <i class="bi bi-house fs-16"></i>首页
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="bi bi-menu-button"></i>
              <span>生产管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="/post/review"
                @click="goSecondPage('/post', '/review')"
                ><i class="bi bi-upload"></i>物料出库</el-menu-item
              >
              <el-menu-item
                index="/post/review"
                @click="goSecondPage('/post', '/review')"
                ><i class="bi bi-download"></i>物料入库</el-menu-item
              >
              <el-menu-item
                index="/post/review"
                @click="goSecondPage('/post', '/review')"
                ><i class="bi bi-database"></i>仓库管理</el-menu-item
              >
              <el-menu-item
                index="/post/edit"
                @click="goSecondPage('/post', '/edit')"
                ><i class="bi bi-pin-angle"></i>物料管理</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="bi bi-person-lock fs-16"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="/post/review"
                @click="goSecondPage('/post', '/review')"
                ><i class="bi bi-person-bounding-box"></i>用户管理</el-menu-item
              >
              <el-menu-item
                index="/post/edit"
                @click="goSecondPage('/post', '/edit')"
                ><i class="bi bi-key"></i>权限管理</el-menu-item
              >
              <el-menu-item
                index="/post/edit"
                @click="goSecondPage('/post', '/edit')"
                ><i class="bi bi-person-vcard"></i>角色管理</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="bi bi-gear"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="/report/unread"
                @click="goSecondPage('/report', '/unread')"
                ><i class="fa fa-bullhorn fa-fw mr"></i>举报管理</el-menu-item
              >
              <el-menu-item
                index="/visit/statistics"
                @click="goSecondPage('/visit', '/statistics')"
                ><i class="fa fa-pie-chart fa-fw mr"></i>访问统计</el-menu-item
              >
              <el-menu-item
                index="/community/configure"
                @click="goSecondPage('/community', '/configure')"
                ><i class="fa fa-pie-chart fa-fw mr"></i>系统配置</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
export default {
  props: {
    isCollapse: { type: Boolean, default: false },
    menuWidth: { type: String, default: "220px" },
  },
  data() {
    return {};
  },
  beforeCreate() {},
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},

    // 跳转到顶级路由页
    goPage(link) {
      if (link === "home") {
        this.$router.push("/index").catch((error) => error);
      } else if (link === "user") {
        this.$router.push("/user").catch((error) => error);
      }
    },

    // 跳转到二级路由页
    goSecondPage(parent, child) {
      this.$router.push(`${parent}${child}`).catch((error) => error);
    },
  },
};
</script>

<style scoped>
.el-row {
  height: 100%;
}

.el-menu {
  border-right: none;
}

.el-aside {
  border-right: 1px solid #f5f1f1;
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;
}

.mr {
  margin-right: 4px;
  font-size: 18px;
}
</style>