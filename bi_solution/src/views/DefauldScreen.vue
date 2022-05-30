<template>
  <div id="content">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="4">
          <b-card>
            <div>
              <b-tabs content-class="mt-3" justified>
                <b-tab title="시 / 도" active @click="moveTabs(1)">
                  <b-list-group-item
                    button
                    v-for="region in regionlist"
                    v-bind:key="region"
                    v-show="regionChk1"
                  >
                    <b-row class="city_box" @click="search_Sigungu(region)">
                      <b-col>
                        <p class="city_name">{{ region }}</p></b-col
                      >
                      <b-col style="text-align: right">
                        <b-icon icon="chevron-compact-right"></b-icon>
                      </b-col>
                    </b-row> </b-list-group-item
                ></b-tab>
                <b-tab
                  title="시 / 군 / 구"
                  @click="moveTabs(2)"
                  :disabled="!regionChk2"
                  ><b-list-group-item
                    button
                    v-for="sigungu in sigunguList"
                    v-bind:key="sigungu"
                    v-show="regionChk2"
                  >
                    <b-row class="city_box" @click="search_dong(sigungu)">
                      <b-col>
                        <p class="city_name">{{ sigungu }}</p></b-col
                      >
                      <b-col style="text-align: right">
                        <b-icon icon="chevron-compact-right"></b-icon>
                      </b-col>
                    </b-row> </b-list-group-item
                ></b-tab>
                <b-tab
                  title="읍 / 면 / 동"
                  @click="moveTabs(3)"
                  :disabled="!regionChk3"
                  ><b-list-group-item
                    button
                    v-for="dong in dongList"
                    v-bind:key="dong"
                    v-show="regionChk3"
                  >
                    <b-row class="city_box">
                      <b-col>
                        <p class="city_name" @click="search_tmp(dong)">
                          {{ dong }}
                        </p></b-col
                      >
                      <b-col style="text-align: right">
                        <b-icon icon="chevron-compact-right"></b-icon>
                      </b-col>
                    </b-row> </b-list-group-item
                ></b-tab>
              </b-tabs>
            </div>
          </b-card>
        </b-col>
        <b-col cols="8">
          <b-row>
            <div id="graph_switch">
              <b-form-checkbox
                v-model="method"
                name="check-button"
                value="매매"
                unchecked-value="전,월세"
                switch
                id="graph_type"
                @change="destroy_chart()"
              >
                그래프 전환 <b>(거래방식: {{ method }})</b>
              </b-form-checkbox>
            </div>
          </b-row>
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
                        <b-dropdown id="dropdown-right" right class="m-2">
                          <b-dropdown-form>
                            <b-button-group>
                              <b-button>전체</b-button>
                              <b-button>1 개월</b-button>
                              <b-button>3 개월</b-button>
                              <b-button>6 개월</b-button>
                            </b-button-group>
                            <b-form-checkbox
                              v-model="graph_set"
                              value="기준금리"
                              >기준금리</b-form-checkbox
                            >
                            <b-form-checkbox
                              v-model="graph_set"
                              value="최저시급"
                              >최저시급</b-form-checkbox
                            >
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-form-tags
                              id="tags-component-select"
                              v-model="graph_set"
                              size="sm"
                              placeholder=""
                              add-on-change
                              no-outer-focus
                            ></b-form-tags>
                          </b-dropdown-form>
                        </b-dropdown>
                      </b-col>
                    </b-row>
                    <LineChartGenerator
                      id="top_graph"
                      :chart-options="chartOptions_top"
                      :chart-data="top_chart"
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
                      id="bottom_graph"
                      :chart-options="chartOptions_bottom"
                      :chart-data="bottom_chart"
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
                      <h5 id="rank_title">전국 시도별 아파트 랭킹</h5>
                    </b-row>
                    <b-row>
                      <h6 id="rank_sub_title1">
                        전국 아파트 매매 가격 변동률 Top 5
                      </h6>
                      <!-- <b-col
                        class="rank1_content"
                        v-for="(trade, i) in rankData_trade"
                        v-bind:key="i"
                        cols="4"
                      >
                        <p>
                          {{ i + 1 }}위 : {{ trade.region }} :
                          {{ trade.avg_rate }}%
                        </p></b-col
                      > -->
                      <Doughnut
                        :chart-options="chartOptions_Rank1"
                        :chart-data="rankGraph_l"
                        :chart-id="chartId"
                        :dataset-id-key="datasetIdKey"
                        :plugins="plugins"
                        :css-classes="cssClasses"
                        :styles="styles"
                        :width="300"
                        :height="150"
                      />
                    </b-row>
                    <br />
                    <b-row>
                      <h6 id="rank_sub_title1">
                        전국 아파트 전,월세 변동률 Top 5
                      </h6>
                      <Doughnut
                        :chart-options="chartOptions_Rank2"
                        :chart-data="rankGraph_r"
                        :chart-id="chartId"
                        :dataset-id-key="datasetIdKey"
                        :plugins="plugins"
                        :css-classes="cssClasses"
                        :styles="styles"
                        :width="300"
                        :height="150"
                      />
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
                    <span>기준금리 : {{ baseMoney.rate }}%</span>
                  </b-col>
                  <b-col class="etc_content">
                    <span>최저시급 : {{ minimumWage.wage }}원</span>
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
import $ from "jquery";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import { Doughnut } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
    Doughnut,
  },
  props: {
    chartId: {
      type: String,
      default: "data_chart",
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
      method: "매매",
      regionlist: [], // 시/도 리스트
      sigunguList: [], // 시/군/구 리스트
      dongList: [], // 읍/면/동 리스트
      trade_amount: [],
      regionChk1: true, // 시/도
      regionChk2: false, // 시/군/구
      regionChk3: false, // 읍/면/동
      sidoName: "", // 시도 이름 (클릭한)
      sigunguName: "", // 시군구 이름 (클릭한)
      rankData_trade: [], // 랭크 데이터 (매매)
      rankData_charter: [], // 랭크 데이터 (전,월세)
      baseMoney: { rate: null }, // 기본지표 (기준금리)
      minimumWage: { wage: null }, // 기본지표 (최저시급)
      wageList: [], // 년도별 시급
      rankGraph_l: {
        // 왼쪽 랭크 그래프 데이터 설정
        labels: [],
        datasets: [{ label: null, backgroundColor: [], data: [] }],
      },
      rankGraph_r: {
        // 오른쪽 랭크 그래프 데이터 설정
        labels: [],
        datasets: [{ label: null, backgroundColor: [], data: [] }],
      },
      chartOptions_Rank1: {
        // 왼쪽 랭크 옵션 설정
        plugins: {
          legend: { display: true, position: null },
          title: { display: true, align: "", text: "" },
        },
        resposive: null,
        maintainAspectRatio: null,
      },
      chartOptions_Rank2: {
        // 오른쪽 랭크 옵션 설정
        plugins: {
          legend: { display: true, position: null },
          title: { display: true, align: "", text: "" },
        },
        resposive: null,
        maintainAspectRatio: null,
      },
      graph_set: [], // 그래프 설정 버튼
      top_chart: {
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
      bottom_chart: {
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
      chartOptions_top: {
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
      chartOptions_bottom: {
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
    this.getRank_trade();
    this.getRank_charter();
    this.getRank_dataL();
    this.getRank_dataR();
    this.getBaseMoney();
    this.getMinimun_wage();
    this.getWage();
  },
  methods: {
    destroy_chart() {
      if ($("#graph_switch>div>label>b").text() == "(거래방식: 매매)") {
        $(".chart_title:first").text("전국 아파트 매매 가격 지수");
        $(".chart_title:last").text("전국 아파트 매매 가격 변동률");
        (this.top_chart.datasets = [
          {
            label: "매매 가격 지수",
            backgroundColor: "rgb(118, 118, 118)",
            data: [84.26, 86.28, 87.2, 87.88, 86.44, 89.55, 100.52],
          },
        ]),
          (this.bottom_chart.datasets = [
            {
              label: "매매 가격 변동률",
              backgroundColor: "rgb(118, 118, 118)",
              data: [0.4, 0.07, 0.09, 0.01, -0.12, 0.61, 1.11],
            },
          ]);
      } else if (
        $("#graph_switch>div>label>b").text() == "(거래방식: 전,월세)"
      ) {
        $(".chart_title:first").text("전국 아파트 전,월세 통합 지수");
        $(".chart_title:last").text("전국 아파트 전,월세 통합 변동률");
        (this.top_chart.datasets = [
          {
            label: "전,월세 통합 지수",
            backgroundColor: "rgb(118, 118, 118)",
            data: [92.94, 94.46, 95.04, 93.93, 91.65, 93.4, 100.46],
          },
        ]),
          (this.bottom_chart.datasets = [
            {
              label: "전,월세 통합 변동률",
              backgroundColor: "rgb(118, 118, 118)",
              data: [0.34, 0.09, 0.01, -0.18, -0.13, 0.44, 0.6],
            },
          ]);
      }
    },
    getRegionList() {
      axios
        .get("http://localhost:3000/select")
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
      axios.get("http://localhost:3000/getTotaltrade").then((res) => {
        console.log(res.data);
      });
    },
    // eslint-disable-next-line
    moveRegion(region) {
      // 시/도, 시/군/구, 읍/면/동 리스트 클릭시
      if (this.regionChk1) {
        // 최초 진입시, 나머지 regionChk2와 regionChk3를 false로...
        this.regionChk2 = false;
        this.regionChk3 = false;
      } else if (this.regionChk2) {
        // 시/군/구
        this.sigunguList = []; // 시/군/구 리스트 초기화
        this.regionChk3 = false; // 읍/면/동 false로 disabled
      } else if (this.regionChk3) {
        // 읍/면/동
        this.dongList = []; // 읍/면/동 리스트 초기화
      }
    },
    search_Sigungu(region) {
      this.sigunguList = [];
      this.sidoName = region;
      this.regionChk1 = false;
      this.regionChk2 = true;
      axios
        .get("http://localhost:3000/searchSigungu?" + "regionName=" + region)
        .then((res) => {
          for (var i = 1; i < res.data.length; i++) {
            this.sigunguList.push(res.data[i].city_nm);
          }
          $(".nav-tabs>li:nth-child(1)>a").removeClass("active");
          $(".tab-content>div:nth-child(1)").removeClass("active");
          $(".nav-tabs>li:nth-child(2)>a").addClass("active");
          $(".tab-content>div:nth-child(2)").addClass("active");
          $(".tab-content>div:nth-child(2)").css("display", "block");
        });
    },

    search_dong(sigungu) {
      this.dongList = [];
      this.regionChk1 = true;
      this.regionChk2 = true;
      this.regionChk3 = true;
      axios
        .get(
          "http://localhost:3000/searchDong?" +
            "sigunguName=" +
            sigungu +
            "&sidoName=" +
            this.sidoName
        )
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            this.dongList.push(res.data[i].dong);
          }
          $(".nav-tabs>li:nth-child(2)>a").removeClass("active");
          $(".tab-content>div:nth-child(2)").removeClass("active");
          $(".tab-content>div:nth-child(2)").css("display", "none");
          $(".nav-tabs>li:nth-child(3)>a").addClass("active");
          $(".tab-content>div:nth-child(3)").addClass("active");
          $(".tab-content>div:nth-child(3)").css("display", "block");
        });
    },
    // eslint-disable-next-line
    moveTabs(step) {
      if (this.sigunguList.length == 0 && step == 2) {
        alert("시/도를 선택해야 시/군/구를 확인하실 수 있습니다");
        this.$nextTick(() => {
          $(".tab-content>div:nth-child(1)").removeAttr("style");
          $(".tab-content>div:nth-child(2)").css("display", "none");
          this.$nextTick(() => {
            $(".nav-tabs>li:nth-child(2)>a").removeClass("active");
            $(".tab-content>div:nth-child(2)").removeClass("active");
            $(".nav-tabs>li:nth-child(1)>a").addClass("active");
            $(".tab-content>div:nth-child(1)").addClass("active");
          });
        });
        return;
      } else if (this.dongList.length == 0 && step == 3) {
        alert("시/군/구를 선택해야 읍/면/동을 확인하실 수 있습니다");
        return;
      }

      if (step == 1) {
        console.log("시/도 클릭");
        this.dongList = [];
        this.sigunguList = [];
        this.regionChk1 = true;
        this.regionChk2 = false;
        this.regionChk3 = false;
        $(".nav-tabs>li:nth-child(2)").addClass("disabled");
        $(".nav-tabs>li:nth-child(3)").addClass("disabled");
        $(".nav-tabs>li:nth-child(1)>a").addClass("active");
        $(".tab-content>div:nth-child(1)").addClass("active");
        $(".tab-content>div:nth-child(1)").css("display", "block");
      } else if (step == 2) {
        this.dongList = [];
        this.regionChk1 = false;
        this.regionChk2 = true;
        this.regionChk3 = false;
        $(".nav-tabs>li:nth-child(3)>a").removeClass("active");
      }
    },
    search_tmp(dong) {
      console.log("temp : " + dong);
    },
    getBaseMoney() {
      axios.get("http://localhost:3000/getBaseMoney").then((res) => {
        this.baseMoney = res.data[0];
        console.log(res.data[0]);
      });
    },
    getMinimun_wage() {
      axios.get("http://localhost:3000/getMinimunWage").then((res) => {
        this.minimumWage = res.data[0];
      });
    },

    getRank_dataL() {
      axios.get("http://localhost:3000/getRank_trade").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.rankGraph_l.labels.push(res.data[i].region);
          this.rankGraph_l.datasets[0].label = "전국 매매가 변동률 Top 5";
          this.rankGraph_l.datasets[0].backgroundColor = [
            "#41B883",
            "#E46651",
            "#00D8FF",
            "#DD1B16",
            "#F3FF00",
          ];
          this.rankGraph_l.datasets[0].data.push(res.data[i].avg_rate);
        }
      });
      console.log(this.chartOptions_Rank1.title);

      this.chartOptions_Rank1.plugins.legend.position = "left";
      this.chartOptions_Rank1.plugins.title.align = "end";
      this.chartOptions_Rank1.plugins.title.text = "기준월(2016.06=100)";
      this.chartOptions_Rank1.resposive = true;
      this.chartOptions_Rank1.maintainAspectRatio = false;
    },

    getRank_dataR() {
      axios.get("http://localhost:3000/getRank_charter").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.rankGraph_r.labels.push(res.data[i].region);
          this.rankGraph_r.datasets[0].label = "전국 전,월세 변동률 Top 5";
          this.rankGraph_r.datasets[0].backgroundColor = [
            "#41B883",
            "#E46651",
            "#00D8FF",
            "#DD1B16",
            "#F3FF00",
          ];
          this.rankGraph_r.datasets[0].data.push(res.data[i].avg_rate);
        }
      });
      console.log(this.chartOptions_Rank1.title);

      this.chartOptions_Rank2.plugins.legend.position = "left";
      this.chartOptions_Rank2.plugins.title.align = "end";
      this.chartOptions_Rank2.plugins.title.text = "기준월(2016.06=100)";
      this.chartOptions_Rank2.resposive = true;
      this.chartOptions_Rank2.maintainAspectRatio = false;
    },
    getRank_trade() {
      axios.get("http://localhost:3000/getRank_trade").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.rankData_trade.push(res.data[i]);
        }
      });
    },
    getRank_charter() {
      axios.get("http://localhost:3000/getRank_charter").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.rankData_charter.push(res.data[i]);
        }
      });
    },
    getWage() {
      axios.get("http://localhost:3000/getWages").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.wageList.push(res.data[i]);
        }
      });
    },
  },
};
</script>

<style>
@import "../assets/css/common.css";
</style>
