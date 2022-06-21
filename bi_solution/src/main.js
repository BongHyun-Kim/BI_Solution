import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);

Vue.component("vueApexchart", VueApexCharts);
Vue.config.productionTip = true;

Vue.prototype.$axios = axios;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
