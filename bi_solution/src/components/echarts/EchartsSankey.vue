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
} from "echarts/components";

use([TitleComponent, TooltipComponent, LegendComponent]);
export default {
  name: "EchartsSankey",
  components: {
    VChart,
  },
  data() {
    return {
      option: {
        series: {
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
          type: "sankey",
          layout: "none",
          focusNodeAdjacency: "allEdges",
          data: [
            {
              name: "a",
            },
            {
              name: "b",
            },
            {
              name: "a1",
            },
            {
              name: "a2",
            },
            {
              name: "b1",
            },
            {
              name: "c",
            },
          ],
          links: [
            {
              source: "a",
              target: "a1",
              value: 5,
            },
            {
              source: "a",
              target: "a2",
              value: 3,
            },
            {
              source: "b",
              target: "b1",
              value: 8,
            },
            {
              source: "a",
              target: "b1",
              value: 3,
            },
            {
              source: "b1",
              target: "a1",
              value: 1,
            },
            {
              source: "b1",
              target: "c",
              value: 2,
            },
          ],
        },
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
