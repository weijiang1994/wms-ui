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
      <el-form style="padding: 24px" :rules="rules" ref="form">
        <el-form-item label="材料名称" prop="name">
          <el-input
            v-model="name"
            placeholder="请输入内容"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="材料规格及其型号" prop="specification">
          <el-input
            v-model="specification"
            placeholder="请输入内容"
            size="small"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="示例图">
          <br />
          <input
            type="file"
            ref="exampleImage"
            style="display: none"
            @change="uploadImg"
          />
          <div class="d-flex" style="flex-wrap: wrap">
            <div
              class="uploaded-img"
              v-for="(img, idx) of images"
              :key="idx"
              @mouseover="currentIndex = idx"
              @mouseleave="currentIndex = -1"
            >
              <div
                class="img-mask"
                :class="currentIndex === idx ? 'active' : ''"
              >
                <p @click="deleteUploadedImg(idx)">
                  <i class="bi bi-trash"></i>
                </p>
              </div>
              <img class="uploaded-img" :src="img" alt="idx" />
            </div>
            <div class="img-upload-div" @click="addImage">
              <p>
                <i
                  style="
                    font-size: 50px;
                    color: rgb(167, 167, 167);
                    margin-right: 0px;
                  "
                  class="bi bi-plus"
                ></i>
              </p>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="addSpec"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import { guid } from "@/util/constants";
export default {
  name: "MaterialSpec",
  data() {
    return {
      currentIndex: -1, // 当前选中图片的索引
      show: true,
      name: "",
      specification: "",
      example: "",
      uuid: "",
      images: [],
      rules: {
        name: [{ required: true, message: "请输入规格名称", trigger: "blur" }],
        specification: [
          { required: true, message: "请输入规格", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    addImage() {
      this.$refs.exampleImage.click();
    },
    uploadImg() {
      const file = this.$refs.exampleImage.files[0];
      const form = new FormData();
      form.append("file", file);
      form.append("uuid", this.uuid);
      this.$axios
        .post("/tools/upload-img", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.images.push(res.url);
        });
    },
    deleteUploadedImg(idx) {
      this.images.splice(idx, 1);
    },
    // 新增规格
    addSpec() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.specs.push(this.form);
          this.form = {
            name: "",
            specification: "",
            example: "",
            images: [
              "https://bbs.2dogz.cn/normal/image/avatars/14a0c76d1717406fa19495e2868cd7a1_l.png",
            ],
          };
          this.dialogVisible = false;
        }
      });
    },
  },
  mounted() {
    this.uuid = guid();
  },
  // 监听
  watch: {},
  // 计算属性
};
</script>
<style scoped>
.img-upload-div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100px;
  cursor: pointer;
  background: rgb(228, 228, 228);
}
.img-upload-div:hover {
  background: rgb(201, 201, 201);
}
.uploaded-img {
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.img-mask {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #10101054;
  z-index: 1;
  text-align: center;
  display: none;
}
.img-mask p {
  margin-top: 30px;
  color: white;
}
.img-mask.active {
  display: block;
}
</style>