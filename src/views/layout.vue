<template>
  <el-container>
    <!-- header部分 -->
    <el-header>
      <navtop></navtop>
    </el-header>
    <el-container>
      <!-- aside部分 -->
      <leftNav
        :isCollapse="leftMenu.collapse"
        :menuWidth="leftMenu.width"
      ></leftNav>
      <el-main>
        <ViewTab></ViewTab>
        <div class="pd-20">
          <bread @collapse-left="collapseLeft" :iconName="breadIcon"></bread>
          <!-- main部分 -->
          <keep-alive><router-view /></keep-alive>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>


 <script>
import navtop from "@/components/NavTop.vue";
import leftNav from "@/components/LeftMenu.vue";
import Bread from "@/components/Bread.vue";
import { getUserInfo } from "@/api/auth";
import ViewTab from "../components/ViewTab.vue";
export default {
  components: {
    navtop,
    leftNav,
    Bread,
    ViewTab,
  },
  data() {
    return {
      leftMenu: {
        collapse: false,
        width: "220px",
      },
      breadIcon: "el-icon-s-unfold",
    };
  },
  async mounted() {
    const user = await getUserInfo();
    this.$store.commit("setUser", user.data);
  },
  methods: {
    collapseLeft(toggle) {
      this.leftMenu.collapse = toggle;
      if (toggle) {
        this.leftMenu.width = "65px";
        this.breadIcon = "el-icon-s-fold";
      } else {
        this.leftMenu.width = "220px";
        this.breadIcon = "el-icon-s-unfold";
      }
    },
  },
};
</script>

 <style>
.el-main {
  background-color: #f5f7f9;
}

.el-header,
.el-footer {
  background-color: white;
  box-sizing: border-box;
  border-bottom: 1px solid #f5f1f1;
}

.el-container {
  height: 100%;
}
.el-main {
  margin: 0px !important;
  padding: 0px;
}
.pd-20 {
  padding: 20px;
}
</style>
