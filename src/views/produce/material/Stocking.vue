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
    <el-form label-width="100px" label-position="left">
      <el-form-item label="物料名称">
        <el-input placeholder="请输入物料名称"></el-input>
      </el-form-item>
      <el-form-item label="物料类型">
        <el-input placeholder="请输入物料类型"></el-input>
      </el-form-item>
      <el-form-item label="物料单位">
        <el-select placeholder="请选择" style="width: 100%" :filterable="true">
          <el-option label="千克" value="kg"></el-option>
          <el-option label="克" value="g"></el-option>
          <el-option label="吨" value="t"></el-option>
          <el-option label="斤" value="jin"></el-option>
          <el-option label="个" value="ge"></el-option>
          <el-option label="件" value="jian"></el-option>
          <el-option label="台" value="tai"></el-option>
          <el-option label="套" value="tao"></el-option>
          <el-option label="箱" value="xiang"></el-option>
          <el-option label="瓶" value="ping"></el-option>
          <el-option label="桶" value="tong"></el-option>
          <el-option label="包" value="bao"></el-option>
          <el-option label="盒" value="he"></el-option>
          <el-option label="罐" value="guan"></el-option>
          <el-option label="卷" value="juan"></el-option>
          <el-option label="片" value="pian"></el-option>
          <el-option label="条" value="tiao"></el-option>
          <el-option label="支" value="zhi"></el-option>
          <el-option label="根" value="gen"></el-option>
          <el-option label="块" value="kuai"></el-option>
          <el-option label="张" value="zhang"></el-option>
          <el-option label="双" value="shuang"></el-option>
          <el-option label="对" value="dui"></el-option>
          <el-option label="组" value="zu"></el-option>
          <el-option label="件" value="jian"></el-option>
          <el-option label="副" value="fu"></el-option>
          <el-option label="套" value="tao"></el-option>
          <el-option label="台" value="tai"></el-option>
          <el-option label="辆" value="liang"></el-option>
          <el-option label="本" value="ben"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="目标仓库">
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
      <el-form-item label="物料数量">
        <el-input placeholder="请输入物料数量"></el-input>
      </el-form-item>
      <el-form-item label="物料单价">
        <el-input placeholder="请输入物料单价"></el-input>
      </el-form-item>
      <el-form-item label="物料编码">
        <el-input placeholder="请输入物料编码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">入库</el-button>
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
      form: {
        warehouseId: "",
      },
    };
  },
  mounted() {
    this.$axios.get("/warehouse/list").then((res) => {
      this.warehouses = res.data;
    });
  },
};
</script>
<style scoped>
</style>