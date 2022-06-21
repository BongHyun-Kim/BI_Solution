<template>
  <div class="container">
    <div class="icon_wrapper">
      <h2>Food Production</h2>
      <!-- <img alt="Vue logo" class="icon" src="../assets/land.png" /> -->
      <v-chart :option="option" style="height: 500px" ref="chart" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";
import VueCompositionApi from "@vue/composition-api";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";

Vue.use(VueCompositionApi);

use([TitleComponent, TooltipComponent, LegendComponent]);

export default {
  name: "EchartsDoughnut",
  components: {
    VChart,
  },
  computed: {
    option() {
      return {
        fontFamily: "Roboto Condensed",
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
          icon: "circle",
          // icon:
          //   "image://https://icons.iconarchive.com/icons/paomedia/small-n-flat/64/sign-check-icon.png",
        },
        series: [
          {
            color: [
              "#cd3e49",
              "#33849d",
              "#b9e0e7",
              "#5f86f7",
              "#61c6c0",
              "#b6517f",
              "#a63246",
              "#5f8943",
              "#c4ccd3",
            ],
            //  itemStyle : {
            //   normal : {
            //        label : {
            //           show: true, position: 'inner',
            //           formatter : function (params){
            //                 return  params.value + '%\n'
            //           },
            //       },
            //       labelLine : {
            //           show : true
            //       }
            //   }
            //  },
            name: "Food production",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: true,
            label: {
              show: false,
              position: "center",
              // icon:
              //   "image://https://icons.iconarchive.com/icons/paomedia/small-n-flat/64/sign-check-icon.png",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
            },

            data: [
              {
                value: 1048,
                name: "seafood",
              },
              { value: 735, name: "meat" },
              { value: 580, name: "wheat" },
              { value: 484, name: "fish" },
              { value: 300, name: "other" },
            ],
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.chart {
  height: 100vh;
}
.icon_wrapper {
  position: absolute;
  width: 100%;
}
.icon {
  position: absolute;
  margin-top: 217px;
  margin-left: -50px;
  width: 100px;
}
.container {
  position: relative;
  height: 600px;
}
</style>

<style>
body {
  margin: 0;
}
</style>
