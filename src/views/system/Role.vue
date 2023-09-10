<template>
  <div class="user">
    <div class="d-flex">
      <div class="ms-auto">
        <el-button
          size="small"
          type="success"
          @click="drawer = true"
          style="margin-top: 5px"
          >添加角色</el-button
        >
      </div>
    </div>
    <el-table style="width: 100%" :data="permissions" class="mt-12">
      <el-table-column prop="name" label="角色"></el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column prop="roles" label="权限">
        <template slot-scope="scope">
          <el-tag
            style="margin: 3px"
            class="hand-cursor"
            :title="role.desc"
            v-for="(role, idx) of scope.row.roles"
            :key="idx"
            size="small"
            >{{ role }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="editPerm(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="deletePerm(scope.row.name)"
            >删除</el-button
          >
        </template></el-table-column
      >
    </el-table>
    <el-drawer title="新增权限" :visible.sync="drawer" direction="rtl">
      <div class="pd-20">
        <el-form
          :model="newPermissonForm"
          label-width="90px"
          label-position="left"
          :rules="rules"
          ref="newPermissonForm"
        >
          <el-form-item label="权限名" prop="name">
            <el-input
              v-model="newPermissonForm.name"
              placeholder="请输入权限名"
            ></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input
              v-model="newPermissonForm.desc"
              type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roles"
            ><el-checkbox-group v-model="newPermissonForm.roles">
              <el-checkbox
                :key="idx"
                :label="role.name"
                v-for="(role, idx) of roles"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            ><el-button size="small" @click="addNewPermission" type="success"
              >添加</el-button
            ><el-button size="small" @click="resetNewPermissionForm"
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
  name: "PermissionManagement",
  data() {
    return {
      permissions: [],
      drawer: false,
      roles: [],
      isEdit: false,
      oldName: "",
      newPermissonForm: {
        desc: "",
        name: "",
        roles: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入权限名称", trigger: "blur" },
          {
            min: 3,
            max: 60,
            message: "长度在 3 到 60 个字符",
            trigger: "blur",
          },
        ],
        desc: [
          { required: true, message: "权限描述信息不能为空", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        roles: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.$axios.get("/user/role/list").then((res) => {
      this.roles = res.data.roles;
    });
    this.getPermissionList();
  },
  methods: {
    deletePerm(permName) {
      this.$confirm(
        `删除后可能会影响用户的操作，确认删除权限 ${permName} 吗？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$axios
            .post("/user/permission/delete", { name: permName })
            .then((res) => {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.getPermissionList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editPerm(pid) {
      this.newPermissonForm = this.permissions.find((perm) => perm.id === pid);
      this.oldName = this.newPermissonForm.name;
      this.drawer = true;
      this.isEdit = true;
    },
    addNewPermission() {
      this.$refs.newPermissonForm.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.$axios
              .post("/user/permission/edit", {
                ...this.newPermissonForm,
                old_name: this.oldName,
              })
              .then((res) => {
                this.getPermissionList();
              });
          } else
            this.$axios
              .post("/user/permission/add", this.newPermissonForm)
              .then((res) => {
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
                this.drawer = false;
                this.getPermissionList();
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
    resetNewPermissionForm() {
      this.$refs.newPermissonForm.resetFields();
    },
    doSearch() {
      console.log(this.search);
    },
    getPermissionList() {
      this.$axios.get("/user/permission/list").then((res) => {
        this.permissions = res.data;
      });
    },
  },
};
</script>