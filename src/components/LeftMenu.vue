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
            <i class="bi bi-house fs-16"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="bi bi-menu-button"></i>
              <span>生产管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="/material/out"
                @click="$router.push('/material/out')"
                ><i class="bi bi-upload"></i>物料出库</el-menu-item
              >
              <el-menu-item
                v-if="user && user.permissions.includes('in-admin')"
                index="/post/review"
                @click="goSecondPage('/post', '/review')"
                ><i class="bi bi-download"></i>物料入库</el-menu-item
              >
              <el-menu-item
                v-if="user && user.permissions.includes('warehouse-admin')"
                index="/warehouse/manager"
                @click="goSecondPage('/warehouse', '/manager')"
                ><i class="bi bi-database"></i>仓库管理</el-menu-item
              >
              <el-menu-item
                v-if="user && user.permissions.includes('material-admin')"
                index="/post/edit"
                @click="goSecondPage('/post', '/edit')"
                ><i class="bi bi-pin-angle"></i>物料管理</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu
            index="3"
            v-if="user && user.permissions.includes('user-admin')"
          >
            <template slot="title">
              <i class="bi bi-person-lock fs-16"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="/user/manager"
                @click="goSecondPage('/user', '/manager')"
                ><i class="bi bi-person-bounding-box"></i>用户管理</el-menu-item
              >
              <el-menu-item
                index="/permission/manager"
                @click="goSecondPage('/permission', '/manager')"
                ><i class="bi bi-key"></i>权限管理</el-menu-item
              >
              <el-menu-item
                index="/role/manager"
                @click="goSecondPage('/role', '/manager')"
                ><i class="bi bi-person-vcard"></i>角色管理</el-menu-item
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
  computed: {
    user() {
      return this.$store.state.user;
    },
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