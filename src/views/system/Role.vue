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
    <el-table style="width: 100%" :data="roles" class="mt-12">
      <el-table-column prop="name" label="角色" width="200px"></el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column prop="permissions" label="权限">
        <template slot-scope="scope">
          <el-tag
            style="margin: 3px"
            class="hand-cursor"
            v-for="(perm, idx) of scope.row.perms"
            :key="idx"
            size="small"
            >{{ perm }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100px">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="editRole(scope.row.id)"
            >编辑</el-button
          >
          <!-- <el-button
            size="small"
            type="danger"
            @click="deletePerm(scope.row.name)"
            >删除</el-button
          > -->
        </template></el-table-column
      >
    </el-table>
    <el-drawer title="新增角色" :visible.sync="drawer" direction="rtl">
      <div class="pd-20">
        <el-form
          :model="newRoleForm"
          label-width="90px"
          label-position="left"
          :rules="rules"
          ref="newRoleForm"
        >
          <el-form-item label="角色名" prop="name">
            <el-input
              v-model="newRoleForm.name"
              placeholder="请输入角色名"
            ></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input v-model="newRoleForm.desc" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="权限" prop="perms"
            ><el-checkbox-group v-model="newRoleForm.perms">
              <el-checkbox
                :key="idx"
                :label="perm"
                v-for="(perm, idx) of permissions"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            ><el-button size="small" @click="addNewRole" type="success"
              >添加</el-button
            ><el-button size="small" @click="resetNewRoleForm"
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
  name: "RoleManagement",
  data() {
    return {
      permissions: [],
      drawer: false,
      roles: [],
      isEdit: false,
      oldName: "",
      newRoleForm: {
        desc: "",
        name: "",
        rid: 0,
        perms: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 60,
            message: "长度在 3 到 60 个字符",
            trigger: "blur",
          },
        ],
        desc: [
          { required: true, message: "角色描述信息不能为空", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        roles: [{ required: true, message: "请权限角色", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getPermissionList();
    this.getRoleLists();
  },
  methods: {
    getRoleLists() {
      this.$axios.get("/user/role/lists").then((res) => {
        this.roles = res.data;
      });
    },
    deletePerm(permName) {
      this.$confirm(
        `删除后可能会影响用户的操作，确认删除角色 ${permName} 吗？`,
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
    editRole(rid) {
      this.newRoleForm = this.roles.find((role) => role.id === rid);
      this.newRoleForm.rid = rid;
      this.drawer = true;
      this.isEdit = true;
    },
    addNewRole() {
      this.$refs.newRoleForm.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.$axios
              .post("/user/role/edit", {
                ...this.newRoleForm,
              })
              .then((res) => {
                this.$message({
                  message: res.msg || "修改成功",
                  type: "success",
                });
                this.drawer = false;
                this.getRoleLists();
              });
          } else
            this.$axios
              .post("/user/role/add", this.newRoleForm)
              .then((res) => {
                this.$message({
                  message: res.msg || "添加成功",
                  type: "success",
                });
                this.drawer = false;
                this.getRoleLists();
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
    resetNewRoleForm() {
      this.$refs.newRoleForm.resetFields();
    },
    getPermissionList() {
      this.$axios.get("/user/permission/list?type=brief").then((res) => {
        this.permissions = res.data;
      });
    },
  },
};
</script>