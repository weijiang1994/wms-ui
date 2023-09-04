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
            <i class="fa fa-file-o mr-3" style="color: #71cc59"></i>操作记录
          </div>
          <div>
            <el-timeline>
              <el-timeline-item
                v-for="(log, index) in adminLogs"
                :key="index"
                :timestamp="log.timestamp"
                color="#0bbd87"
              >
                {{ log.content }}
              </el-timeline-item>
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
import { getUserInfo } from "@/api/auth";
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
  created() {},
  async mounted() {
    const user = await getUserInfo();
    this.$store.commit("setUser", user.data);
    for (let i = 0; i < quickEntry.length; i++) {
      if (
        this.$store.state.user &&
        this.$store.state.user.permissions.includes(quickEntry[i].permission)
      ) {
        this.quickDatas.push(quickEntry[i]);
      }
    }
  },
  destroyed() {
    window.clearInterval(this.timer);
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
