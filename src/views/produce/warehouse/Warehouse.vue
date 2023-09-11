<template>
  <div>
    <div class="d-flex">
      <el-form :inline="true">
        <el-form-item label="仓库名称">
          <el-input
            v-model="form.name"
            size="small"
            placeholder="请输入仓库名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="ms-auto">
        <el-button
          size="small"
          @click="drawer = true"
          type="success"
          class="mt-6"
          >添加仓库</el-button
        >
      </div>
    </div>
    <div class="warhouse-container">
      <div class="warehouse-card" v-for="(wh, idx) of warehouses" :key="idx">
        <p class="warehouse-name">{{ wh.name }}</p>
        <p>
          位置：<span>{{ wh.address }}</span>
        </p>
        <p>
          总容量：<span>{{ wh.volume }}</span>
        </p>
        <p>
          剩余容量：<span>{{ wh.left }}</span>
        </p>
        <p>
          创建时间：<span>{{ wh.create_time }}</span>
        </p>
        <el-tag
          size="small"
          class="mt-12"
          v-for="(tag, idx) of wh.tags"
          :key="idx"
          >{{ tag }}</el-tag
        >
      </div>
    </div>
    <el-drawer title="添加仓库" :visible.sync="drawer" direction="rtl">
      <el-form label-width="100px" class="pd-20">
        <el-form-item label="仓库名称">
          <el-input
            v-model="form.name"
            size="small"
            placeholder="请输入仓库名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="存放位置">
          <el-input
            v-model="form.address"
            size="small"
            placeholder="请输入仓库所在位置"
          ></el-input>
        </el-form-item>
        <el-form-item label="仓库管理员">
          <el-input
            v-model="form.manager"
            size="small"
            placeholder="请输入仓库名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="容量">
          <el-input
            type="number"
            v-model="form.volume"
            size="small"
            placeholder="请输入仓库容量"
          ></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-select
            v-model="form.tags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入仓库标签"
            size="small"
            style="width: 100%"
          >
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="addWarehouse"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "Warehouse",
  data() {
    return {
      drawer: false,
      form: {
        name: "",
        address: "",
        manager: 1,
        volume: 2000,
        tags: [],
      },
      warehouses: [],
    };
  },
  methods: {
    addWarehouse() {
      this.$axios.post("/warehouse/add", this.form).then((res) => {
        this.$message.success("添加成功");
        this.drawer = false;
        this.getWarehouseList();
      });
    },
    getWarehouseList() {
      this.$axios.get("/warehouse/list").then((res) => {
        this.warehouses = res.data;
      });
    },
  },
  mounted() {
    this.getWarehouseList();
  },
};
</script>
<style scoped>
.warhouse-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px; /* 列之间的间距 */
}
.warehouse-card {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
}
.warehouse-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.warehouse-card .warehouse-name {
  font-size: 24px;
  font-weight: 500;
}
.warehouse-card p {
  margin-top: 20px;
}
.warehouse-card p:first-child {
  margin-top: 10px;
}
</style>