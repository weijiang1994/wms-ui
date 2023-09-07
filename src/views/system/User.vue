<template>
  <div class="user">
    <div class="d-flex align-center">
      <div>
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input
              v-model="search.user"
              placeholder="请输入用户名（模糊）"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doSearch" size="small"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="ms-auto">
        <el-button size="small" type="success">添加用户</el-button>
      </div>
    </div>
    <el-table style="width: 100%" class="mt-12">
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="name" label="邮箱"></el-table-column>
      <el-table-column prop="name" label="手机号码"></el-table-column>
      <el-table-column prop="name" label="角色"></el-table-column>
      <el-table-column prop="address" label="权限"></el-table-column>
      <el-table-column
        prop="address"
        label="最后一次登录时间"
      ></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "UserManagement",
  data() {
    return {
      search: {
        user: "",
      },
    };
  },
  methods: {
    doSearch() {
      console.log(this.search);
    },
  },
};
</script>