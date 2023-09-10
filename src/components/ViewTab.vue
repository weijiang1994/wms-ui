<template>
  <div class="tag-group">
    <div
      class="tag-item"
      :class="currentTab === item.name ? 'active' : 'un-active'"
      v-for="(item, idx) of tags"
      :key="idx"
      @click="$router.push(item.path)"
    >
      <span
        >{{ item.meta.title
        }}<i
          v-show="currentTab === item.name"
          class="el-icon-close"
          style="margin-left: 4px"
          @click="handleRemoveTag(idx)"
        ></i
      ></span>
    </div>
  </div>
</template>
  <script>
export default {
  name: "ViewTab",
  data() {
    return {
      tags: [{ name: "Centre", path: "/", meta: { title: "首页" } }],
      currentTab: "",
    };
  },
  methods: {
    handleRemoveTag(idx) {
      this.tags.splice(idx, -1);
    },
    addTag(to) {
      if (to.meta.noTab) {
        return;
      }
      const name = to.name || to.path;
      const existTab = this.tags.find((tab) => tab.name === name);
      if (existTab) {
        this.currentTab = existTab.name;
      } else {
        this.tags.push({ name, path: to.path, meta: to.meta });
        this.currentTab = name;
      }
    },
  },
  mounted() {
    this.addTag(this.$route);
    this.$router.afterEach((to, from) => {
      this.addTag(to);
    });
  },
};
</script>
  <style>
.tag-group {
  padding-top: 12px;
  display: flex;
  flex-wrap: wrap;
  background: white;
  margin-bottom: 10px;
}
.tag-item {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  min-width: 80px;
}
.tag-item:hover {
  background-color: #f5f7f9;
}
.tag-item.active {
  background-color: #f5f7f9;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #e5e5e5;
  border-bottom: none;
}
</style>
  