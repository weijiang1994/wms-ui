<template>
  <div>
    <div class="d-flex">
      <el-button
        class="ms-auto"
        type="success"
        size="small"
        @click="show = true"
        >新增规格</el-button
      >
    </div>
    <el-table class="mt-12">
      <el-table-column prop="date" label="材料名称" width="300px">
      </el-table-column>
      <el-table-column prop="name" label="材料规格及其型号"> </el-table-column>
      <el-table-column prop="address" label="示例图"> </el-table-column>
    </el-table>
    <el-drawer :visible.sync="show">
      <template #title>
        <span>新增规格</span>
      </template>
      <el-form style="padding: 24px">
        <el-form-item label="材料名称">
          <el-input
            v-model="name"
            placeholder="请输入内容"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="材料规格及其型号">
          <el-input
            v-model="specification"
            placeholder="请输入内容"
            size="small"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="示例图">
          <div></div>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "MaterialSpec",
  data() {
    return {
      show: false,
      name: "",
      specification: "",
      example: "",
    };
  },
  methods: {
    // 新增规格
    addSpec() {
      // 发送请求
      // 提示
      this.$message({
        message: "新增成功",
        type: "success",
      });
    },
  },
  mounted() {},
  // 监听
  watch: {},
  // 计算属性
};
</script>