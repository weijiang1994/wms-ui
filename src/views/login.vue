<template>
  <div class="login-container">
    <div class="right">
      <p>生产部物料管理系统</p>
      <img src="@/assets/imgs/login.png" alt="" />
    </div>
    <div class="left">
      <div class="login-div">
        <div style="text-align: center; margin-top: 10px">
          <p>用户登录</p>
        </div>
        <el-form
          :model="loginForm"
          :rules="validateRule"
          status-icon
          ref="loginForm"
          label-position="left"
          style="width: 100%"
        >
          <el-form-item prop="username" label="用户名">
            <el-input
              type="text"
              v-model="loginForm.username"
              auto-complete="off"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input
              v-model="loginForm.password"
              auto-complete="off"
              placeholder="密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item style="width: 100%">
            <div style="text-align: center">
              <el-button
                type="primary"
                style="width: 50%"
                @click="handleSubmit"
                :loading="logining"
                size="medium"
                >登录</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/auth";
import { setToken } from "@/util/token";

export default {
  data() {
    return {
      logining: false,
      loginForm: {
        username: "",
        password: "",
      },
      validateRule: {
        username: [
          {
            required: true,
            message: "请输入登录用户",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur",
          },
        ],
      },
      checked: false,
    };
  },
  methods: {
    // 提交登录请求
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.logining = true;
          login({
            username: this.loginForm.username,
            password: this.loginForm.password,
          })
            .then((res) => {
              if (res.code === 200) {
                this.showMessage(res.msg || "登录成功", "success");
                setToken("Access-Token", "Bearer " + res.access_token);
                this.$router.push("/");
                this.logining = false;
              }
            })
            .catch((error) => {
              this.logining = false;
              console.log(error);
            });
        }
      });
    },
    // 显示登录提示信息
    showMessage(message, type) {
      this.$message({
        message,
        type,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  .right {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p {
      font-size: 24px;
      font-weight: 600;
      margin: 20px;
    }
    img {
      width: 60%;
      height: auto;
    }
  }
  .left {
    width: 70%;
    background: rgb(238 238 238 / 25%);
    display: flex;
    align-items: center;
    justify-content: center;
    .login-div {
      min-width: 400px;
      background: white;
      padding: 10px 30px;
      border-radius: 10px;
      p {
        font-size: 22px;
        font-weight: bold;
      }
    }
  }
}
</style>