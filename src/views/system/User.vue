<template>
  <div class="user">
    <div class="d-flex">
      <div>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input
              v-model="user"
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
        <el-button
          size="small"
          type="success"
          @click="drawer = true"
          style="margin-top: 5px"
          >添加用户</el-button
        >
      </div>
    </div>
    <el-table style="width: 100%" :data="users">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="roles" label="角色">
        <template slot-scope="scope">
          <el-tag
            style="margin: 3px"
            class="hand-cursor"
            :title="role.desc"
            v-for="role in scope.row.roles"
            :key="role"
            size="small"
            >{{ role.name }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="last_login"
        label="最后一次登录时间"
      ></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag
            style="margin: 3px"
            class="hand-cursor"
            :title="scope.row.status == 1 ? '正常' : '禁用'"
            :type="scope.row.status == 1 ? 'success' : 'danger'"
            size="small"
            >{{ scope.row.status == 1 ? "正常" : "禁用" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary">编辑</el-button
          ><el-button
            size="small"
            type="danger"
            v-if="scope.row.status == 1"
            @click="changeUserStatus(scope.row.id, 0)"
            >禁用</el-button
          ><el-button
            size="small"
            type="success"
            v-if="scope.row.status == 0"
            @click="changeUserStatus(scope.row.id, 1)"
            >激活</el-button
          >
        </template></el-table-column
      >
    </el-table>
    <el-drawer title="新增用户" :visible.sync="drawer" direction="rtl">
      <div class="pd-20">
        <el-form
          :model="newUserForm"
          label-width="90px"
          label-position="left"
          :rules="rules"
          ref="newUserForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="newUserForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="newUserForm.name"
              placeholder="请输入用户姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="newUserForm.email"
              placeholder="请输入用户邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input
              v-model="newUserForm.phone"
              placeholder="请输入用户手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input
              v-model="newUserForm.password"
              show-password
              clearable
              placeholder="请输入用户登录密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roles"
            ><el-checkbox-group v-model="newUserForm.roles">
              <el-checkbox
                :key="idx"
                :label="role.name"
                v-for="(role, idx) of roles"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            ><el-button size="small" @click="addNewUser" type="success"
              >添加</el-button
            ><el-button size="small" @click="resetNewUserForm"
              >重置</el-button
            ></el-form-item
          >
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "UserManagement",
  data() {
    return {
      keyword: "",
      users: [],
      drawer: false,
      roles: [],
      newUserForm: {
        username: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        roles: [],
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+.[a-z]+$/,
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        roles: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getUserList();
    this.$axios.get("/user/role/list").then((res) => {
      this.roles = res.data.roles;
    });
  },
  methods: {
    changeUserStatus(uid, status) {
      this.$axios
        .post("/user/status", { uid, status })
        .then((res) => {
          this.$message({
            message: res.msg || "操作成功",
            type: "success",
          });
          this.users.find((user) => user.id === uid).status = status;
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            type: "error",
          });
        });
    },
    addNewUser() {
      this.$refs.newUserForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post("/user/add", this.newUserForm)
            .then((res) => {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.drawer = false;
              this.getUserList();
            })
            .catch((err) => {
              this.$message({
                message: err.response.data.message,
                type: "error",
              });
            });
        } else {
          return false;
        }
      });
    },
    resetNewUserForm() {
      this.$refs.newUserForm.resetFields();
    },
    doSearch() {
      console.log(this.search);
    },
    getUserList() {
      this.$axios.get("/user/list").then((res) => {
        this.users = res.data;
      });
    },
  },
};
</script>