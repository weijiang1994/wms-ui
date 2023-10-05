<template>
  <div id="home">
    <el-row :gutter="10">
      <el-col :span="18">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-card shadow="hover" :height="500">
              <div slot="header">
                <i class="fa fa-cube mr-3" style="color: #71cc59"></i>物料概况
              </div>
              <div style="height: 200px">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <community-card apiUrl="/warehouse"></community-card>
                  </el-col>
                  <el-col :span="12">
                    <community-card apiUrl="/material"></community-card>
                  </el-col>
                </el-row>
                <el-row :gutter="10" class="mt-10">
                  <el-col :span="12">
                    <community-card apiUrl="/material/out"></community-card>
                  </el-col>
                  <el-col :span="12"
                    ><community-card apiUrl="/material/in"></community-card
                  ></el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover" :height="500">
              <div slot="header">
                <i class="fa fa-map-marker mr-3" style="color: #71cc59"></i>
                快捷入口
              </div>
              <div class="flex-div-for-quick">
                <div
                  v-for="(item, index) in quickDatas"
                  :key="index"
                  class="flex-div-for-quick-item"
                >
                  <quick-link
                    :icon="item.icon"
                    :title="item.title"
                    :router="item.router"
                    v-if="
                      $store.state.user &&
                      $store.state.user.permissions.includes(item.permission)
                    "
                  ></quick-link>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card class="mt-10">
          <div slot="header">
            <i class="fa fa-line-chart mr-3" style="color: #71cc59"></i>访问统计
          </div>
          <el-button-group>
            <el-button
              :type="dateRange === 'week' ? 'primary' : ''"
              size="mini"
              @click="changeStatisticsRange('week')"
              >最近一周</el-button
            >
            <el-button
              :type="dateRange === 'half' ? 'primary' : ''"
              size="mini"
              @click="changeStatisticsRange('half')"
              >最近半月</el-button
            >
            <el-button
              :type="dateRange === 'month' ? 'primary' : ''"
              size="mini"
              @click="changeStatisticsRange('month')"
              >最近一月</el-button
            >
          </el-button-group>
          <Chart :optionData="chartData" class=""></Chart>
          <!-- <line-chart class="mt-10" :legends="legends"></line-chart> -->
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header">
            <i
              class="fa fa-arrow-circle-right fa-fw mr-3"
              style="color: #71cc59"
            ></i
            >系统日志
          </div>
          <div>
            <el-button-group>
              <el-button
                :type="currentLog === 1 ? 'primary' : 'default'"
                size="small"
                @click="currentLog = 1"
                >入库记录</el-button
              >
              <el-button
                :type="currentLog === 2 ? 'primary' : 'default'"
                size="small"
                @click="currentLog = 2"
                >出库记录</el-button
              >
              <el-button
                :type="currentLog === 3 ? 'primary' : 'default'"
                size="small"
                @click="currentLog = 3"
                >操作记录</el-button
              >
            </el-button-group>
            <el-timeline class="mt-12" v-show="currentLog === 1">
              <el-timeline-item
                :timestamp="inRecord.date"
                placement="top"
                v-for="(inRecord, idx) of inRecords"
                :key="idx"
              >
                <el-card>
                  <h4>物料入库</h4>
                  <p>物料名称：{{ inRecord.name }}</p>
                  <p>物料编码：{{ inRecord.barcode }}</p>
                  <p>入库数量：{{ inRecord.num }}</p>
                  <p>{{ inRecord.user }} 提交于 {{ inRecord.create_time }}</p>
                </el-card>
              </el-timeline-item>
              <el-button size="mini" class="mt-12">更多记录</el-button>
            </el-timeline>
            <el-timeline class="mt-12" v-show="currentLog === 2">
              <el-timeline-item
                :timestamp="outRecord.date"
                placement="top"
                v-for="(outRecord, idx) of outRecords"
                :key="idx"
              >
                <el-card>
                  <h4>物料出库</h4>
                  <p>物料名称：{{ outRecord.name }}</p>
                  <p>物料编码：{{ outRecord.barcode }}</p>
                  <p>出库数量：{{ outRecord.num }}</p>
                  <p>{{ outRecord.user }} 提交于 {{ outRecord.create_time }}</p>
                </el-card>
              </el-timeline-item>
              <el-button size="mini" class="mt-12">更多记录</el-button>
            </el-timeline>
            <el-timeline class="mt-12" v-show="currentLog === 3">
              <el-timeline-item
                :timestamp="operateRecord.date"
                placement="top"
                v-for="(operateRecord, idx) of operateRecords"
                :key="idx"
              >
                <el-card>
                  <h4>{{ operateRecord.category }}</h4>
                  <div v-html="operateRecord.desc"></div>
                  <p>
                    {{ operateRecord.user }} 提交于
                    {{ operateRecord.create_time }}
                  </p>
                </el-card>
              </el-timeline-item>
              <el-button size="mini" class="mt-12">更多记录</el-button>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CommunityCard from "@/components/CommunityCard";
import { serverStatus } from "@/api/normal";
import { visitStatistic } from "@/api/community";
import QuickLink from "../components/QuickLink.vue";
import Chart from "@/components/charts/Chart";
import { quickEntry } from "@/util/constants";

export default {
  name: "Home",
  components: {
    CommunityCard,
    QuickLink,
    Chart,
  },
  data() {
    return {
      currentLog: 1,
      inRecords: [],
      outRecords: [],
      operateRecords: [],
      quickDatas: [],
      userInfo: {},
      dateRange: "week",
      chart: null,
      adminLogs: [],
      server: {
        cpu: 20,
        mem: 35,
      },
      serverColor: {
        cpu: "#5cb87a",
        mem: "#5cb87a",
      },
      chartData: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [],
      },
    };
  },
  watch: {
    "$store.state.user": {
      handler: function (val) {
        if (val) {
          this.userInfo = val;
          this.quickDatas = [];
          for (let i = 0; i < quickEntry.length; i++) {
            if (
              this.$store.state.user &&
              this.$store.state.user.permissions.includes(
                quickEntry[i].permission
              )
            ) {
              this.quickDatas.push(quickEntry[i]);
            }
          }
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.$axios.get("/material/log?category=stocking").then((res) => {
      this.inRecords = res.data;
    });
    this.$axios.get("/material/log?category=out").then((res) => {
      this.outRecords = res.data;
    });
    this.$axios.get("/material/log?category=operate").then((res) => {
      this.operateRecords = res.data;
    });
    this.getVisitStatistic();
  },
  methods: {
    getVisitStatistic() {
      visitStatistic({ dateRange: this.dateRange }).then((res) => {
        // console.log(this.chartData);
        this.chartData.xAxis = [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              interval: 0,
              rotate: "45",
            },
            data: res.dates,
          },
        ];
        this.chartData.series = res.series;
      });
    },
    changeStatisticsRange(dateRange) {
      this.dateRange = dateRange;
      this.getVisitStatistic();
    },
    getServerStatus() {
      serverStatus().then((res) => {
        this.server = res.data;
        if (this.server.cpu < 40) {
          this.serverColor.cpu = "#5cb87a";
        } else if (40 < this.server.cpu && this.serverColor.cpu < 80) {
          this.serverColor.cpu = "#E6A23C";
        } else this.serverColor.cpu = "#F56C6C";

        if (this.server.mem < 40) {
          this.serverColor.mem = "#5cb87a";
        } else if (40 < this.server.mem && this.server.mem < 80) {
          this.serverColor.mem = "#E6A23C";
        } else this.serverColor.mem = "#F56C6C";
      });
    },
  },
};
</script>
<style scoped>
#home /deep/ .el-card__header {
  padding: 8px;
}
.flex-div-for-quick {
  height: 200px;
  display: flex;
  align-content: space-around;
  flex-wrap: wrap;
}
.flex-div-for-quick-item {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-content: center;
}
#statistics {
  height: 300px;
}
</style>
