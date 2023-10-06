<template>
  <div>
    <div class="d-flex">
      <div style="margin-left: auto"></div>
      <el-form inline>
        <el-form-item>
          <el-input
            v-model="form.name"
            placeholder="请输入物料名称"
            size="small"
            class="mr-3"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            clearable
            filterable
            size="small"
            v-model="form.warehouse_id"
            placeholder="请选择仓库"
            @change="
              paginate.page = 1;
              getMaterialList();
            "
          >
            <el-option
              v-for="item in warehouseList"
              :key="item.id"
              :label="`${item.name}/${item.address}`"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            size="small"
            v-model="form.spec"
            placeholder="请选择规格"
            clearable
            filterable
            @change="
              paginate.page = 1;
              getMaterialList();
            "
          >
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="$router.push('/material/stocking')"
            >物料入库</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="batchDrawer = true"
            >批量入库</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="materialList" height="600px">
      <el-table-column prop="name" label="物料名称" width="300px" fixed>
      </el-table-column>
      <el-table-column prop="spec" label="规格" fixed width="200px">
        <template #default="{ row }">
          <pre style="font-family: MicroSoft YaHei">{{ row.spec }}</pre>
        </template>
      </el-table-column>
      <el-table-column prop="warehouse" label="仓库" width="200px">
        <template #default="{ row }">
          <pre style="font-family: MicroSoft YaHei">{{ row.warehouse }}</pre>
        </template>
      </el-table-column>
      <el-table-column
        label="物料编码"
        prop="barcode"
        width="200px"
      ></el-table-column>
      <el-table-column label="存量总数" prop="total"> </el-table-column>
      <el-table-column label="可用数量" prop="left"> </el-table-column>
      <el-table-column label="已用数量" prop="used"> </el-table-column>
      <el-table-column label="状态">
        <template #default="{ row }">
          <el-tag v-if="row.status === '充足'" type="success">{{
            row.status
          }}</el-tag>
          <el-tag v-if="row.status === '告警'" type="warning">{{
            row.status
          }}</el-tag>
          <el-tag v-if="row.status === '缺乏'" type="danger">{{
            row.status
          }}</el-tag>
          <el-tag v-if="row.status === '无余量'" type="danger">{{
            row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="200px">
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="200px">
      </el-table-column>
      <el-table-column prop="user" label="创建人"> </el-table-column>
      <el-table-column prop="user" label="操作">
        <template #default="{ row }">
          <el-dropdown>
            <span class="el-dropdown-link hand-cursor">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                @click.native="editMaterial(row.id)"
                v-if="user && user.permissions.includes('material-admin')"
                >编辑</el-dropdown-item
              >
              <el-dropdown-item
                @click.native="addStorage(row.id)"
                v-if="user && user.permissions.includes('material-admin')"
                >添加库存</el-dropdown-item
              >
              <el-dropdown-item
                @click.native="outMaterial(row.id)"
                v-if="user && user.permissions.includes('material-out')"
                >出库</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="paginate.total"
      @page-change="changePage"
      @size-change="changeSize"
    ></pagination>
    <el-drawer title="添加库存" :visible.sync="drawer" direction="rtl">
      <el-form ref="form" :model="storage" label-width="80px">
        <el-form-item label="物料名称">
          <el-input v-model="storage.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="物料规格">
          <el-input v-model="storage.spec" disabled></el-input>
        </el-form-item>
        <el-form-item label="物料编码">
          <el-input v-model="storage.barcode" disabled></el-input>
        </el-form-item>
        <el-form-item label="仓库">
          <el-input v-model="storage.warehouse" disabled></el-input>
        </el-form-item>
        <el-form-item label="剩余数量">
          <el-input v-model="storage.left" disabled></el-input>
        </el-form-item>
        <el-form-item label="添加数量">
          <el-input-number
            v-model="storage.num"
            :min="1"
            :precision="0"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input
            type="textarea"
            v-model="storage.reason"
            placeholder="请输入添加库存备注信息"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddStorage">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-drawer title="物料批量入库" :visible.sync="batchDrawer" direction="rtl">
      <div style="padding: 20px">
        <p style="color: #ff1145; font-size: 14px">
          批量入库请先下载模板文件，并根据模板文件的内容填写需要入库的物料信息！
        </p>
        <el-button
          class="mt-12"
          type="success"
          size="small"
          @click="downloadBatchTemplate"
          >下载模板文件</el-button
        >
        <el-form class="mt-12" label-width="">
          <el-form-item label="上传文件">
            <el-upload
              :headers="batchStocking.headers"
              ref="uploadBatch"
              class="upload-demo"
              drag
              :auto-upload="false"
              :action="`${backendUrl}/material/batch/stocking`"
              :data="batchStocking"
              :on-success="finishedUpload"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                仅支持xlsx文件格式，且不超过10M
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="同名物料新增库存">
            <el-radio-group v-model="batchStocking.same">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="submitUpload"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination.vue";
import { getToken } from "@/util/token";
export default {
  components: { Pagination },
  name: "MaterialList",
  data() {
    return {
      backendUrl: process.env.VUE_APP_BASE_BACKEND_URL,
      batchDrawer: false,
      drawer: false,
      materialList: [],
      batchStocking: {
        same: false,
        headers: {
          "Access-Token": getToken("Access-Token"),
        },
      },
      storage: {
        name: "",
        mid: "",
        spec: "",
        barcode: "",
        warehouse: "",
        num: 0,
        reason: "",
        left: 0,
      },
      paginate: {
        page: 1,
        size: 20,
        total: 0,
      },
      warehouseList: [],
      specList: [],
      form: {
        name: "",
        spec: "",
        warehouse_id: "",
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    finishedUpload(response, file, fileList) {
      if (response.code === 200) {
        this.$message.success(response.msg || "批量入库成功！");
        this.getMaterialList();
      } else {
        this.$message.error(response.msg || "批量入库失败！");
      }
    },
    submitUpload() {
      this.$refs.uploadBatch.submit();
    },
    downloadBatchTemplate() {
      this.$axios
        .get("/material/batch/template", { responseType: "blob" })
        .then((res) => {
          const blob = new Blob([res]);
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "物料批量入库模板.xlsx";
          link.click();
        });
    },
    addStorage(materialId) {
      this.drawer = true;
      const material = this.materialList.find((item) => item.id === materialId);
      this.storage = {
        mid: material.id,
        name: material.name,
        spec: material.spec,
        barcode: material.barcode,
        warehouse: material.warehouse,
        num: 0,
        reason: "",
        left: material.left,
      };
    },
    handleAddStorage() {
      this.$axios
        .post("/material/add/storage", { ...this.storage })
        .then((res) => {
          this.$message.success(res.msg || "添加库存成功！");
          this.getMaterialList();
          this.drawer = false;
        });
    },
    changePage(page) {
      this.paginate.page = page;
      this.getMaterialList();
    },
    changeSize(size) {
      this.paginate.size = size;
      this.getMaterialList();
    },
    getMaterialList() {
      this.$axios
        .get("/material/list", { params: { ...this.form, ...this.paginate } })
        .then((res) => {
          this.materialList = res.data;
          this.paginate.total = res.total;
        });
    },
    editMaterial(materialId) {
      console.log({ materialId });
      console.log(this.user);
    },
    outMaterial(materialId) {
      if (this.materialList.find((item) => item.id === materialId).left <= 0) {
        return this.$message.error("库存不足，请联系物料管理员添加库存！");
      }
      this.$router.push(`/material/out/${materialId}`);
    },
  },
  mounted() {
    this.$axios.get("/warehouse/list").then((res) => {
      this.warehouseList = res.data;
    });
    this.$axios.get("/material/list/spec").then((res) => {
      this.specList = res.data;
    });
    this.getMaterialList();
  },
};
</script>
