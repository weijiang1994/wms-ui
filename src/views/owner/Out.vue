<template>
  <div>
    <el-table :data="outList" style="width: 100%" height="650px">
      <el-table-column prop="name" label="物料名称"></el-table-column>
      <el-table-column prop="warehouse" label="仓库"></el-table-column>
      <el-table-column prop="num" label="出库数量"></el-table-column>
      <el-table-column prop="reason" label="出库用途">
        <template #default="{ row }">
          <pre class="code">{{ row.reason }}</pre>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="出库 日期" width="180">
      </el-table-column>
    </el-table>
    <pagination :total="paginate.total"></pagination>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination.vue";
export default {
  name: "OwnerOut",
  components: {
    Pagination,
  },
  data() {
    return {
      outList: [],
      paginate: {
        page: 1,
        size: 20,
        total: 0,
      },
    };
  },
  methods: {
    getOutLists() {
      this.$axios
        .get("/material/owner/out", {
          params: {
            ...this.paginate,
          },
        })
        .then((res) => {
          this.outList = res.data;
          this.paginate.total = res.total;
        });
    },
  },
  mounted() {
    this.getOutLists();
  },
};
</script>