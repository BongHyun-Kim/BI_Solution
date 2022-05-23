<template>
  <div id="content">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="4">
          <div>
            <b-card title="Card Title" no-body>
              <b-card-header header-tag="nav">
                <b-nav card-header tabs>
                  <b-nav-item active>시 / 도</b-nav-item>
                  <b-nav-item>시 / 군 / 구</b-nav-item>
                  <b-nav-item>읍 / 면 / 동</b-nav-item>
                </b-nav>
              </b-card-header>

              <b-card-body class="text-center">
                <b-list-group>
                  <b-list-group-item
                    button
                    class="region_select"
                    v-for="regions in regionlist"
                    v-bind:key="regions"
                  >
                    <b-row class="city_box">
                      <b-col>
                        <p class="city_name">{{ regions }}</p></b-col
                      >
                      <b-col style="text-align: right">
                        <b-icon icon="chevron-compact-right"></b-icon>
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                </b-list-group>
              </b-card-body>
            </b-card>
          </div>
        </b-col>
        <b-col cols="8">
          <div>
            <b-card>
              <b-container>
                <b-row>
                  <b-card>
                    <b-row>
                      <b-col cols="11">
                        <h5 class="chart_title">전국 아파트 매매 가격 지수</h5>
                      </b-col>
                      <b-col cols="1">
                        <b-button
                          size="sm"
                          v-b-popover.bottom.hover.html="
                            '<div class=' +
                            'set_year' +
                            '>' +
                            '<button class=' +
                            'option_check_l' +
                            '> 전체 </button>' +
                            '<button class=' +
                            'option_check' +
                            '> 1개월 </button>' +
                            '<button class=' +
                            'option_check' +
                            '> 3개월 </button>' +
                            '<button class=' +
                            'option_check_r' +
                            '> 6개월 </button>' +
                            '</div>' +
                            '<div class=' +
                            'set_item' +
                            '>' +
                            '<div class=' +
                            'form-check' +
                            '>' +
                            '<input class=' +
                            'form-check-input ' +
                            'type=' +
                            'checkbox ' +
                            'id=' +
                            'option1 ' +
                            'value=' +
                            '  ' +
                            '>' +
                            '<label class=' +
                            'form-check-label ' +
                            'for=' +
                            'option1' +
                            '> 기준금리' +
                            '</label>' +
                            '</div>' +
                            '<div class=' +
                            'form-check' +
                            '>' +
                            '<input class=' +
                            'form-check-input ' +
                            'type=' +
                            'checkbox ' +
                            'id=' +
                            'option2 ' +
                            'value=' +
                            '  ' +
                            '>' +
                            '<label class=' +
                            'form-check-label ' +
                            'for=' +
                            'option2' +
                            '> 최저시급' +
                            '</label>' +
                            '</div>' +
                            '</div>'
                          "
                          title="그래프 설정"
                          ><b-icon icon="gear-fill" font-scale="0.8"></b-icon
                        ></b-button>
                      </b-col>
                    </b-row>
                    <LineChartGenerator
                      :chart-options="chartOptions"
                      :chart-data="chartData"
                      :chart-id="chartId"
                      :dataset-id-key="datasetIdKey"
                      :plugins="plugins"
                      :css-classes="cssClasses"
                      :styles="styles"
                      :width="width"
                      :height="height"
                    />
                  </b-card>
                </b-row>
                <br />
                <b-row>
                  <b-card>
                    <b-row>
                      <b-col cols="11">
                        <h5 class="chart_title">
                          전국 아파트 매매 가격 변동률
                        </h5>
                      </b-col>
                      <b-col cols="1">
                        <b-button
                          size="sm"
                          v-b-popover.bottom.hover.html="
                            '<div class=' +
                            'set_year' +
                            '>' +
                            '<button class=' +
                            'option_check_l' +
                            '> 전체 </button>' +
                            '<button class=' +
                            'option_check' +
                            '> 1개월 </button>' +
                            '<button class=' +
                            'option_check' +
                            '> 3개월 </button>' +
                            '<button class=' +
                            'option_check_r' +
                            '> 6개월 </button>' +
                            '</div>' +
                            '<div class=' +
                            'set_item' +
                            '>' +
                            '<div class=' +
                            'form-check' +
                            '>' +
                            '<input class=' +
                            'form-check-input ' +
                            'type=' +
                            'checkbox ' +
                            'id=' +
                            'option1 ' +
                            'value=' +
                            '  ' +
                            '>' +
                            '<label class=' +
                            'form-check-label ' +
                            'for=' +
                            'option1' +
                            '> 기준금리' +
                            '</label>' +
                            '</div>' +
                            '<div class=' +
                            'form-check' +
                            '>' +
                            '<input class=' +
                            'form-check-input ' +
                            'type=' +
                            'checkbox ' +
                            'id=' +
                            'option2 ' +
                            'value=' +
                            '  ' +
                            '>' +
                            '<label class=' +
                            'form-check-label ' +
                            'for=' +
                            'option2' +
                            '> 최저시급' +
                            '</label>' +
                            '</div>' +
                            '</div>'
                          "
                          title="그래프 설정"
                          ><b-icon icon="gear-fill" font-scale="0.8"></b-icon
                        ></b-button>
                      </b-col>
                    </b-row>
                    <LineChartGenerator
                      :chart-options="chartOptions1"
                      :chart-data="chartData1"
                      :chart-id="chartId"
                      :dataset-id-key="datasetIdKey"
                      :plugins="plugins"
                      :css-classes="cssClasses"
                      :styles="styles"
                      :width="width"
                      :height="height"
                    />
                  </b-card>
                </b-row>
                <br />
                <b-row>
                  <b-card>
                    <b-row>
                      <h5 class="rank_title">전국 아파트 Rank</h5>
                    </b-row>
                  </b-card>
                </b-row>
              </b-container>
            </b-card>
          </div>
          <b-container id="etc_info">
            <b-row>
              <b-col>
                <b-row>
                  <h6 class="etc_title">전국 아파트 거래량</h6>
                </b-row>
                <b-row>
                  <b-col class="etc_content">
                    <span
                      >매매 :
                      <span id="trade"
                        >26054 <b-icon icon="arrow-up"></b-icon></span
                    ></span>
                  </b-col>
                  <b-col class="etc_content">
                    <span
                      >전세 :
                      <span id="charter"
                        >54714 <b-icon icon="arrow-up"></b-icon></span
                    ></span>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <h6 class="etc_title">기본 지표</h6>
                </b-row>
                <b-row>
                  <b-col class="etc_content">
                    <span>기준금리 : 1.5%</span>
                  </b-col>
                  <b-col class="etc_content">
                    <span>최저시급 : 9,160원</span>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 250,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      regionlist: [],
      trade_amount: [],
      chartData: {
        labels: [
          "2015년",
          "2016년",
          "2017년",
          "2018년",
          "2019년",
          "2020년",
          "2021년",
        ],
        datasets: [
          {
            label: "매매 가격 지수",
            backgroundColor: "rgb(118, 118, 118)",
            data: [84.26, 86.28, 87.2, 87.88, 86.44, 89.55, 100.52],
          },
        ],
      },
      chartData1: {
        labels: [
          "2015년",
          "2016년",
          "2017년",
          "2018년",
          "2019년",
          "2020년",
          "2021년",
        ],
        datasets: [
          {
            label: "매매 가격 변동률",
            backgroundColor: "rgb(118, 118, 118)",
            data: [0.4, 0.07, 0.09, 0.01, -0.12, 0.61, 1.11],
          },
        ],
      },
      chartOptions: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            align: "end",
            text: "기준월(2016.06=100)",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      chartOptions1: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            align: "end",
            text: "기준월(2016.06=100)",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created() {
    this.getRegionList();
    this.getTrade_amount();
  },
  methods: {
    getRegionList() {
      axios
        .get("http://15.164.213.27:3000/select")
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            this.regionlist.push(res.data[i].sido_nm);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getTrade_amount() {
      axios.get("http://15.164.213.27/getTotaltrade").then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>

<style>
@import "../assets/css/common.css";
</style>
