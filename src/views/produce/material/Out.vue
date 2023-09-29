<template>
  <div>
    <div class="d-flex">
      <div class="flex-grow-1">
        <p class="title">物料信息</p>
        <div class="material-info" v-if="material.material">
          <p><b>名称：</b>{{ material.material.name }}</p>
          <p><b>编码：</b>{{ material.material.barcode }}</p>
          <p><b>价格：</b>￥{{ material.material.price }}（元）/{{material.material.unit}}</p>
          <p><b>总量：</b>{{ material.material.total }}</p>
          <p><b>剩余：</b>{{ material.material.left }}</p>
          <p><b>已用：</b>{{ material.material.used }}</p>
          <p>
            <b>状态：</b
            ><el-tag
              v-if="material.material.status === '充足'"
              type="success"
              >{{ material.material.status }}</el-tag
            >
            <el-tag v-if="material.material.status === '告警'" type="warning">{{
              material.material.status
            }}</el-tag>
            <el-tag v-if="material.material.status === '缺乏'" type="danger">{{
              material.material.status
            }}</el-tag>
            <el-tag
              v-if="material.material.status === '无余量'"
              type="danger"
              >{{ material.material.status }}</el-tag
            >
          </p>
          <p><b>入库时间：</b>{{ material.material.create_time }}</p>
          <p><b>入库人：</b>{{ material.material.user }}</p>
        </div>
      </div>
      <div class="flex-grow-1">
        <p class="title">仓库信息</p>
        <div class="material-info" v-if="material.material">
          <p><b>名称：</b>{{ material.warehouse.name }}</p>
          <p><b>位置：</b>{{ material.warehouse.address }}</p>
          <p><b>容量：</b>{{ material.warehouse.volume }}</p>
          <p><b>状态：</b><el-tag :type="material.warehouse.status?'success': 'warning'">{{ material.warehouse.status?'正常': '弃用' }}</el-tag></p>
          <p><b>标签：</b><el-tag style="margin-right: 5px;" v-for="tag, idx of material.warehouse.tags" :key="idx">{{ tag }}</el-tag></p>
        </div>
      </div>
      <div class="flex-grow-1">
        <p class="title">规格信息</p>
        <div class="material-info" v-if="material.material">
          <p><b>名称：</b>{{ material.spec.name }}</p>
          <p><b>规格：</b><pre class="code">{{ material.spec.description }}</pre></p>
          <p><b>示例图：</b></p>
          <div class="d-flex">
            <viewer
              ><img
                class="uploaded-img"
                v-for="(img, idx) of material.spec.images"
                :key="idx"
                :src="img"
                alt="idx"
            /></viewer>
          </div>
        </div>
      </div>
    </div>
    <p class="title">物料出库</p>
    <el-form :model="form" label-width="80px" :rules="rules" ref="form">
      <el-form-item label="出库数量" prop="out">
        <el-input-number
          v-model="form.out"
          :min="1"
          :max="material.material? material.material.left: 1"
          :precision="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="出库原因" prop="reason">
        <el-input v-model="form.reason" type="textarea" placeholder="请输入出库原因"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">出库</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Out",
  data() {
    return {
      material: {},
      form: {
        out: 0,
        reason: "",
      },
      rules: {
        out: [
          { required: true, message: "请输入出库数量", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value <= 0) {
                callback(new Error("出库数量必须大于0"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        reason: [
          { required: true, message: "请输入出库原因", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value.length > 200) {
                callback(new Error("出库原因不能超过200个字符"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.$confirm("确认出库？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios
              .post("/material/out", {
                ...this.form,
                material_id: this.material.material.id,
              })
              .then((res) => {
                this.$message.success("出库成功");
                this.$router.push("/owner/out");
              });
          })
          .catch(() => {});
      });
    },
  },
  mounted() {
    this.$axios
      .get("/material/get/" + this.$route.params.materialId)
      .then((res) => {
        this.material = res.data;
      });
  },
};
</script>
<style scoped>
.material-info {
  padding-left: 10px;
}
.material-info p {
  margin-bottom: 20px;
}
</style>