<template>
  <v-chart :option="option" style="height: 500px" ref="chart" />
</template>

<script>
import VChart from "vue-echarts";
import { use } from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
} from "echarts/components";

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
]);
export default {
  name: "EchartsLine",
  components: {
    VChart,
  },
  data() {
    return {
      option: {
        title: {
          text: "title1",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["aaa", "bbb", "ccc", "ddd", "eee"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["xyz", "zyc", "ryv", "eyf", "sjs", "shd", "dhe"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "s1",
            type: "line",
            stack: "1",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "s2",
            type: "line",
            stack: "2",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "s3",
            type: "line",
            stack: "3",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "s4",
            type: "line",
            stack: "4",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "s5",
            type: "line",
            stack: "5",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
    };
  },
};
</script>

<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
