`
<template>
  <div>
    <EchartPie />
    <EchartsDoughnut />
    <EchartsDoughnut2 />
    <EchartsLine />
    <EchartsSankey />
    <EchartsSankey2 />
  </div>
</template>

<script>
import EchartsDoughnut from "../components/echarts/EchartsDoughnut.vue";
import EchartsDoughnut2 from "../components/echarts/EchartsDoughnut2.vue";
import EchartsLine from "../components/echarts/EchartsLine.vue";
import EchartsSankey from "../components/echarts/EchartsSankey.vue";
import EchartsSankey2 from "../components/echarts/EchartsSankey2.vue";
import EchartPie from "../components/echarts/EchartPie.vue";

export default {
  name: "echartComponent",
  components: {
    EchartPie,
    EchartsDoughnut,
    EchartsDoughnut2,
    EchartsLine,
    EchartsSankey,
    EchartsSankey2,
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style>
@import "../assets/css/common.css";
</style>
