<template>
  <div style="margin: 0 20%">
    <p
      style="
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
        margin-top: 20px;
      "
    >
      物料入库
    </p>
    <el-form
      label-width="100px"
      label-position="left"
      :rules="rules"
      :model="form"
      ref="form"
    >
      <el-form-item label="物料名称" prop="name">
        <el-input placeholder="请输入物料名称" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="物料类型" prop="type">
        <el-input placeholder="请输入物料类型" v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="物料单位" prop="unit">
        <el-select
          placeholder="请选择"
          style="width: 100%"
          :filterable="true"
          v-model="form.unit"
        >
          <el-option label="千克" value="千克"></el-option>
          <el-option label="克" value="克"></el-option>
          <el-option label="吨" value="吨"></el-option>
          <el-option label="斤" value="斤"></el-option>
          <el-option label="个" value="个"></el-option>
          <el-option label="件" value="件"></el-option>
          <el-option label="台" value="台"></el-option>
          <el-option label="套" value="套"></el-option>
          <el-option label="箱" value="箱"></el-option>
          <el-option label="瓶" value="瓶"></el-option>
          <el-option label="桶" value="桶"></el-option>
          <el-option label="包" value="包"></el-option>
          <el-option label="盒" value="盒"></el-option>
          <el-option label="罐" value="罐"></el-option>
          <el-option label="卷" value="卷"></el-option>
          <el-option label="片" value="片"></el-option>
          <el-option label="条" value="条"></el-option>
          <el-option label="支" value="支"></el-option>
          <el-option label="根" value="根"></el-option>
          <el-option label="块" value="块"></el-option>
          <el-option label="张" value="张"></el-option>
          <el-option label="双" value="双"></el-option>
          <el-option label="对" value="对"></el-option>
          <el-option label="组" value="组"></el-option>
          <el-option label="副" value="副"></el-option>
          <el-option label="辆" value="辆"></el-option>
          <el-option label="本" value="本"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="目标仓库" prop="warehouseId">
        <el-select
          v-model="form.warehouseId"
          placeholder="请选择"
          style="width: 100%"
          :filterable="true"
        >
          <el-option
            v-for="item in warehouses"
            :key="item.id"
            :label="`${item.name} / ${item.address}`"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="物料数量" prop="amount">
        <el-input placeholder="请输入物料数量" v-model="form.amount"></el-input>
      </el-form-item>
      <el-form-item label="物料单价" prop="price">
        <el-input placeholder="请输入物料单价" v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="物料编码" prop="code">
        <el-input placeholder="请输入物料编码" v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="物料规格" prop="spec">
        <el-select
          placeholder="请选择"
          style="width: 100%"
          :filterable="true"
          v-model="form.spec"
        >
          <el-option
            v-for="(spec, idx) of specs"
            :key="idx"
            :label="spec.name"
            :value="spec.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商" prop="supply">
        <el-input
          placeholder="请输入物料供应商"
          v-model="form.supply"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addMaterial">入库</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "MaterialStocking",
  data() {
    return {
      warehouses: [],
      specs: [],
      form: {
        warehouseId: "",
        name: "",
        unit: "",
        type: "",
        amount: "",
        price: "",
        code: "",
        spec: "",
        supply: "",
      },
      rules: {
        warehouseId: [
          { required: true, message: "请选择目标仓库", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入物料名称", trigger: "blur" }],
        unit: [{ required: true, message: "请选择物料单位", trigger: "blur" }],
        type: [{ required: true, message: "请输入物料类型", trigger: "blur" }],
        amount: [
          { required: true, message: "请输入物料数量", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入物料单价", trigger: "blur" }],
        code: [{ required: true, message: "请输入物料编码", trigger: "blur" }],
        spec: [{ required: true, message: "请选择物料规格", trigger: "blur" }],
        supply: [
          { required: true, message: "请输入物料供应商", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    addMaterial() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.$axios.post("/material/stocking", { ...this.form }).then((res) => {
          this.$notify({
            title: "成功",
            message: `物料${this.form.name}添加添加成功`,
            type: "success",
            duration: 2000,
          });
          // this.$router.push("/produce/material/outbound");
        });
      });
    },
  },
  mounted() {
    this.$axios.get("/warehouse/list").then((res) => {
      this.warehouses = res.data;
    });
    this.$axios.get("/material/list/spec").then((res) => {
      this.specs = res.data;
    });
  },
};
</script>
<style scoped>
</style>