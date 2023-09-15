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
        <div class="d-flex align-center">
          <div>
            <p class="warehouse-name">{{ wh.name }}</p>
            <p>
              <i class="bi bi-geo-alt"></i><span>{{ wh.address }}</span>
            </p>
          </div>
          <el-tooltip :content="`仓库管理员${wh.manager.name}`">
            <img
              style="width: 15%; border-radius: 50%; margin-left: auto"
              :src="wh.manager.avatar"
              :alt="wh.manager.uname"
          /></el-tooltip>
        </div>

        <div class="warehouse-volume">
          <div
            class="left"
            :style="{
              width: parseInt((wh.left / wh.volume).toFixed(2) * 100) + '%',
            }"
          >
            <el-tooltip :content="`剩余容量${wh.left}`">
              <div style="width: 100%; height: 100%"></div
            ></el-tooltip>
          </div>
          <div
            class="used"
            :style="{
              width:
                parseInt(((wh.volume - wh.left) / wh.volume).toFixed(2) * 100) +
                '%',
            }"
          >
            <el-tooltip :content="`已用容量${wh.volume - wh.left}`">
              <div style="width: 100%; height: 100%"></div
            ></el-tooltip>
          </div>
        </div>
        <div class="d-flex mt-12 align-center">
          <p class="mt-0">
            <i class="bi bi-clock"></i><span>{{ wh.create_time }}</span>
          </p>
          <div class="ms-auto">
            <div
              v-if="wh.status === 1"
              class="d-flex align-center flex-row-reverse"
            >
              <p class="mt-0" style="color: #008558">正常</p>
              <img
                style="width: 20%"
                src="@/assets/imgs/normal.png"
                class="me-6"
              />
            </div>
            <div
              v-if="wh.status === 0"
              class="d-flex align-center flex-row-reverse"
            >
              <p class="mt-0" style="color: #d11b1b">废弃</p>
              <img
                style="width: 20%"
                src="@/assets/imgs/unuse.png"
                class="me-6"
              />
            </div>
          </div>
        </div>

        <el-tag
          size="small"
          class="mt-12 me-6"
          v-for="(tag, idx) of wh.tags"
          :key="idx"
          >{{ tag }}</el-tag
        >
        <div class="text-right mt-12">
          <el-button size="mini" type="primary">物料入库</el-button>
          <el-button size="mini" type="success">物料列表</el-button>
          <el-button size="mini" type="warning">仓库编辑</el-button>
        </div>
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
          <el-select
            v-model="form.manager"
            filterable
            placeholder="请输入仓库管理员"
            size="small"
            style="width: 100%"
          >
            <el-option
              v-for="user in users"
              :key="user.id"
              :label="user.name"
              :value="user.id"
            ></el-option>
          </el-select>
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
      users: [],
      form: {
        name: "",
        address: "",
        manager: "",
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
    this.$axios.get("/user/list").then((res) => {
      this.users = res.data;
    });
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
.warehouse-volume {
  height: 20px;
  display: flex;
  margin-top: 12px;
}
.warehouse-volume .left {
  background: #00bd45bf;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.warehouse-volume .used {
  background: rgb(55 55 55 / 78%);
  height: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>