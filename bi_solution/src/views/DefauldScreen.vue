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
                v-model="changeGraph"
                name="check-button"
                value="매매"
                unchecked-value="전,월세"
                switch
                id="graph_type"
                @change="trans_chart()"
              >
                그래프 전환 <b>(거래방식: {{ changeGraph }})</b>
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
                        <h5
                          class="chart_title"
                          id="changeGraph1"
                          ref="click_graph1"
                        >
                          전국 아파트 매매 가격
                        </h5>
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
                              id="rate_ck"
                              @change="compare_top_rate"
                              >기준금리</b-form-checkbox
                            >
                            <b-form-checkbox
                              v-model="graph_set"
                              value="최저시급"
                              id="wage_ck"
                              @change="compare_top_wage"
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
                    <Bar
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
                        <h5
                          class="chart_title"
                          id="changeGraph2"
                          ref="click_graph2"
                        >
                          전국 아파트 매매 가격 변동률
                        </h5>
                      </b-col>
                      <b-col cols="1">
                        <div>
                          <b-dropdown id="" text="" class="m-md-2">
                            <b-dropdown-group>
                              <b-dropdown-item @click="graphPeriod('all')"
                                >전체</b-dropdown-item
                              >
                              <b-dropdown-item @click="graphPeriod('1')"
                                >1개월</b-dropdown-item
                              >
                              <b-dropdown-item @click="graphPeriod('3')"
                                >3개월</b-dropdown-item
                              >
                              <b-dropdown-item @click="graphPeriod('6')"
                                >6개월</b-dropdown-item
                              >
                            </b-dropdown-group>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-group>
                              <b-check-group>
                                <b-checkbox
                                  v-model="chkDataArr"
                                  value="standard"
                                  >기준금리</b-checkbox
                                >
                                <b-checkbox v-model="chkDataArr" value="minimum"
                                  >최저시급</b-checkbox
                                >
                              </b-check-group>
                              {{ chkDataArr }}
                              {{ clickPeriod }}
                              <b-card
                                v-for="chkData in chkDataArr"
                                :key="chkData"
                                tag="li"
                                class="mt-1 mr-1"
                                body-class="py-1 pr-2 text-nowrap"
                              >
                                <strong>{{ chkData }}</strong>
                                <b-button
                                  @click="removeTag(chkData)"
                                  variant="lint"
                                  size="sm"
                                >
                                  remove
                                </b-button>
                              </b-card>
                            </b-dropdown-group>
                          </b-dropdown>
                        </div>
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
                      <!-- <b-col
                        class="rank1_content"
                        v-for="(charter, i) in rankData_charter"
                        v-bind:key="i"
                        cols="4"
                      >
                        <p>
                          {{ i + 1 }}위 : {{ charter.region }} :
                          {{ charter.avg_rate }}%
                        </p></b-col
                      > -->
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
                      <span
                        id="trade"
                        :style="[
                          trade_data == 'curr'
                            ? { color: 'red' }
                            : { color: 'blue' },
                        ]"
                        >{{ trade_data.cnt }}
                        <b-icon
                          v-if="trade_data == 'curr'"
                          icon="arrow-up"
                        ></b-icon>
                        <b-icon v-else icon="arrow-down"></b-icon>
                      </span>
                    </span>
                  </b-col>
                  <b-col class="etc_content">
                    <span
                      >전세 :
                      <span
                        id="charter"
                        :style="[
                           rental_data.whoWin == 'curr'
                            ? { color: 'red' }
                            : { color: 'blue' },
                        ]"
                        >{{ rental_data.cnt }}
                        <b-icon
                          v-if="rental_data.whoWin == 'curr'"
                          icon="arrow-up"
                        ></b-icon>
                        <b-icon v-else icon="arrow-down"></b-icon>
                      </span>
                    </span>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <h6 class="etc_title">기본 지표</h6>
                </b-row>
                <b-row>
                  <b-col class="etc_content">
                    <span
                      >기준금리 :
                      <span
                        id="trade"
                        :style="[
                          baseMoney > baseMoney_compare
                            ? { color: 'red' }
                            : { color: 'blue' },
                        ]"
                        >{{ baseMoney }}%
                        <b-icon
                          v-if="baseMoney > baseMoney_compare"
                          icon="arrow-up"
                        ></b-icon>
                        <b-icon v-else icon="arrow-down"></b-icon
                      ></span>
                    </span>
                  </b-col>
                  <b-col class="etc_content">
                    <span
                      >최저시급 :
                      <span
                        id="trade"
                        :style="[
                          minimumWage > minimumWage_compare
                            ? { color: 'red' }
                            : { color: 'blue' },
                        ]"
                        >{{ minimumWage }}원<b-icon
                          v-if="minimumWage > minimumWage_compare"
                          icon="arrow-up"
                        ></b-icon>
                        <b-icon v-else icon="arrow-down"></b-icon
                      ></span>
                    </span>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <!-- <Bar
              :chart-options="chartOptions_Bar1"
              :chart-data="barGraph_r"
              :chart-id="chartId"
              :dataset-id-key="datasetIdKey"
              :plugins="plugins"
              :css-classes="cssClasses"
              :styles="styles"
              :width="300"
              :height="150"
            /> -->
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
import { Bar } from "vue-chartjs/legacy";

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
  BarElement, // 막대그래프 추가
  BarController, // 막대그래프 추가
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement,
  BarController
);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
    Doughnut,
    Bar,
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
      // 지역 선택 리스트

      regionlist: [], // 시/도 리스트
      sigunguList: [], // 시/군/구 리스트
      dongList: [], // 읍/면/동 리스트
      regionChk1: true, // 시/도
      regionChk2: false, // 시/군/구
      regionChk3: false, // 읍/면/동
      sidoName: "", // 시도 이름 (클릭한)
      sigunguName: "", // 시군구 이름 (클릭한)

      // 메인 그래프 데이터

      trade_amount: [], // 매매 거래 금액
      trade_avg: [], // 매매 거래 금액 변동률
      charter_list: [], // 전,월세 평균 거래 금액
      charter_avg: [], // 전,월세 평균 거래 금액 변동률
      rankData_trade: [], // 랭크 데이터 (매매)
      rankData_charter: [], // 랭크 데이터 (전,월세)
      basemoney_list: [], // 메인그래프 기준금리
      wage_list: [], //  메인그래프 최저시급
      trade_list: [], // 메인그래프 년도별 평균 매매금액

      // 하단 거래량 및 기본 지표

      baseMoney: null, // 기본지표 (기준금리)
      baseMoney_compare: null, // 기본지표 (직전 기준금리)
      minimumWage: null, // 기본지표 (최저시급)
      minimumWage_compare: null, // 기본지표 (직전 최저시급)
      rental_data:{       // 아파트 거래량
        cnt: null,        // 거래 카운트
        whoWin:''         // before : 전전달의 데이터가 더 높음, curr : 전달의 데이터가 더 높음
      },
      trade_data:{        //아파트 거래량(매매)
        cnt:null,         // 거래 카운트
        whoWin:''         // before : 전전달의 데이터가 더 높음, curr : 전달의 데이터가 더 높음
      },
      chkDataArr: [], // 그래프설정 체크박스

      // 그래프 설정

      clickPeriod: "", // 그래프설정 기간
      changeGraph: "매매", // 그래프 전환 구분

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
      chartOptions_Bar1: {
        indexAxis: "y",
        responsive: true,
        title: {
          display: true,
          text: "막대차트",
        },
        Tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
      },
      barGraph_r: {
        // 오른쪽 랭크 그래프 데이터 설정
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
          {
            label: "테스트 데이터셋",
            backgroundColor: [],
            data: [1, 2, 3, 4, 5],
          },
        ],
      },
      graph_set: [], // 그래프 설정 버튼

      top_chart: {
        // 메인 상단 그래프
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
            yAxisID: "trade",
            label: "매매 가격",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            borderColor: "rgba(255, 0, 0, 0.5)",
            data: null,
          },
        ],
      },
      bottom_chart: {
        // 메인 하단 그래프
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
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            borderColor: "rgba(255, 0, 0, 0.5)",
            data: null,
          },
        ],
      },
      chartOptions_top: {
        // 메인 상단 그래프 옵션
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            align: "end",
            text: "(단위 : 천원)",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      chartOptions_bottom: {
        // 메인 하단 그래프 옵션
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
    this.getRegionList(); // 지역 리스트
    this.getRank_trade(); // 랭크(매매)
    this.getRank_charter(); // 랭크(전,월세)
    this.getRank_dataL(); // 랭크 좌측 그래프 (매매)
    this.getRank_dataR(); // 랭크 우측 그래프 (전,월세)
    this.getBaseMoney_rank(); // 기본지표(기준금리)
    this.getBaseMoney_compare(); // 기본지표(직전 기준금리)
    this.getBaseMoney_chart(); // 그래프 데이터 (년도별 기준금리)
    this.getMinimun_wage(); // 기본지표(최저시급)
    this.getMinimun_compare(); // 기본지표(직전 최저시급)
    this.getWage(); // 그래프 데이터 (년도별 최저시급)
    this.getTrade_payment(); // 그래프 데이터 (매매 거래 금액)
    this.getTrade_avg(); // 그래프 데이터 (매매 거래 금액 변동률)
    this.getCharter_payment(); // 그래프 데이터 (전,월세 평균 거래 금액)
    this.getCharter_avg(); // 그래프 데이터 (전,월세 평균 거래 금액 변동률)
    this.getRental_data();  // 아파트 거래량(전세), rental_data 참조
    this.getTrade_data();   // 아파트 거래량(매매), 
  },
  methods: {
    trans_chart() {
      this.chartOptions_top.plugins.legend = { display: false };
      if (this.changeGraph == "매매") {
        this.$refs.click_graph1.textContent = "전국 아파트 매매 가격";
        this.$refs.click_graph2.textContent = "전국 아파트 매매 가격 변동률";
        (this.top_chart.datasets = [
          {
            label: "매매 가격",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            borderColor: "rgba(255, 0, 0, 0.5)",
            data: this.trade_list,
            yAxisID: "trade",
          },
        ]),
          (this.bottom_chart.datasets = [
            {
              label: "매매 가격 변동률",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              borderColor: "rgba(255, 0, 0, 0.5)",
              data: this.trade_avg,
            },
          ]);
      } else if (this.changeGraph == "전,월세") {
        this.$refs.click_graph1.textContent =
          "전국 아파트 전,월세 통합 거래 금액";
        this.$refs.click_graph2.textContent = "전국 아파트 전,월세 통합 변동률";
        (this.top_chart.datasets = [
          {
            label: "전,월세 통합 거래 금액",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            borderColor: "rgba(255, 0, 0, 0.5)",
            data: this.charter_list,
            yAxisID: "trade",
          },
        ]),
          (this.bottom_chart.datasets = [
            {
              label: "전,월세 통합 변동률",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              borderColor: "rgba(255, 0, 0, 0.5)",
              data: this.charter_avg,
            },
          ]);
      }
      delete this.chartOptions_top.scales;
      this.graph_set = [];
      // 기준금리, 최저시급 체크박스 조건문
      // if (this.graph_set.length > 0) {
      //   for (var i = 0; i < this.graph_set.length; i++) {
      //     if (this.graph_set[i] == "기준금리") {
      //       this.top_chart.datasets = [
      //         {
      //           label: "매매 가격",
      //           backgroundColor: "rgba(255, 0, 0, 0.5)",
      //           borderColor: "rgba(255, 0, 0, 0.5)",
      //           data: this.trade_list,
      //         },
      //       ];
      //       $("#rate_ck").prop("checked", false);
      //       console.log(this.chartOptions_top.scales);
      //       this.graph_set.splice(i);
      //     } else if (this.graph_set[i] == "최저시급") {
      //       this.top_chart.datasets = [
      //         {
      //           label: "매매 가격",
      //           backgroundColor: "rgba(255, 0, 0, 0.5)",
      //           borderColor: "rgba(255, 0, 0, 0.5)",
      //           data: this.trade_list,
      //         },
      //       ];
      //       $("#wage_ck").prop("checked", false);
      //       console.log(this.chartOptions_top.scales);
      //       this.graph_set.splice(i);
      //     }
      //   }
      //   delete this.chartOptions_top.scales;
      // }
    },
    getRegionList() {
      // 지역 리스트 가져오기
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
      // 거래량 가져오기 (보류) 
      // eslint-disable-next-line
      axios.get("http://localhost:3000/getTotaltrade").then((res) => {
        //console.log(res.data);
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
        //console.log("시/도 클릭");
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
    // eslint-disable-next-line
    search_tmp(dong) {
      //console.log("temp : " + dong);
    },
    getBaseMoney_rank() {
      // 기본지표 (기준금리)
      axios.get("http://localhost:3000/getBaseMoney_rank").then((res) => {
        this.baseMoney = res.data[0].rate;
      });
    },
    getBaseMoney_compare() {
      // 기본지표 (직전 기준금리)
      axios.get("http://localhost:3000/getBaseMoney_compare").then((res) => {
        this.baseMoney_compare = res.data[0].rate;
      });
    },
    getMinimun_wage() {
      // 기본지표 (최저시급)
      axios.get("http://localhost:3000/getMinimunWage").then((res) => {
        this.minimumWage = res.data[0].wage;
      });
    },
    getMinimun_compare() {
      // 기본지표 (직전 최저시급)
      axios.get("http://localhost:3000/getMinimunWage_compare").then((res) => {
        this.minimumWage_compare = res.data[0].wage;
      });
    },

    getRank_dataL() {
      // 랭크 그래프(전국 매매가 변동률)
      axios.get("http://localhost:3000/getRank_trade").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.rankGraph_l.labels.push(res.data[i].region);
          this.rankGraph_l.datasets[0].label = "전국 매매가 변동률 Top 5";
          this.rankGraph_l.datasets[0].backgroundColor = [
            "#ffcc00",
            "#754100",
            "#7bcabf",
            "#586fab",
            "#444c57",
          ];
          this.rankGraph_l.datasets[0].data.push(res.data[i].avg_rate);
        }
      });

      this.chartOptions_Rank1.plugins.legend.position = "left";
      this.chartOptions_Rank1.plugins.title.align = "end";
      this.chartOptions_Rank1.plugins.title.text = "기준월(2016.06=100)";
      this.chartOptions_Rank1.resposive = true;
      this.chartOptions_Rank1.maintainAspectRatio = false;
    },

    getRank_dataR() {
      // 랭크 그래프(전국 전,월세 변동률)
      axios.get("http://localhost:3000/getRank_charter").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.rankGraph_r.labels.push(res.data[i].region);
          this.rankGraph_r.datasets[0].label = "전국 전,월세 변동률 Top 5";
          this.rankGraph_r.datasets[0].backgroundColor = [
            "#93b3b7",
            "#eaa18a",
            "#f55354",
            "#518d7d",
            "#b6d1d4",
          ];
          this.rankGraph_r.datasets[0].data.push(res.data[i].avg_rate);
        }
      });

      this.chartOptions_Rank2.plugins.legend.position = "left";
      this.chartOptions_Rank2.plugins.title.align = "end";
      this.chartOptions_Rank2.plugins.title.text = "기준월(2016.06=100)";
      this.chartOptions_Rank2.resposive = true;
      this.chartOptions_Rank2.maintainAspectRatio = false;
    },
    getRank_trade() {
      // 랭크 텍스트(전국 매매가 변동률)
      axios.get("http://localhost:3000/getRank_trade").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.rankData_trade.push(res.data[i]);
        }
      });
    },
    getRank_charter() {
      // 랭크 텍스트(전국 전,월세 변동률)
      axios.get("http://localhost:3000/getRank_charter").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.rankData_charter.push(res.data[i]);
        }
      });
    },
    getWage() {
      // 년도별 최저시급 리스트(그래프 사용)
      axios.get("http://localhost:3000/getWages").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.wage_list.push(res.data[i].wage);
        }
      });
    },
    getBaseMoney_chart() {
      // 년도별 기준금리 리스트(그래프 사용)
      axios.get("http://localhost:3000/getBasemoney_chart").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.basemoney_list.push(res.data[i].avg_rate);
        }
      });
    },
    graphPeriod(value) {
      this.clickPeriod = value;
    },
    removeTag(tag) {
      this.chkDataArr.splice();
      for (var i = 0; i < this.chkDataArr.length; i++) {
        if (this.chkDataArr[i] == tag) {
          this.chkDataArr.splice(i, 1);
        }
      }
    },
    compare_top_rate() {
      // 메인 상단 그래프 비교 데이터 {체크박스:(기준금리)}
      if ($("#rate_ck").is(":checked")) {
        this.top_chart.datasets.push({
          yAxisID: "rate",
          label: "기준금리",
          type: "line",
          backgroundColor: "rgba(255, 128, 0, 0.5)",
          borderColor: "rgba(255, 128, 0, 0.5)",
          data: this.basemoney_list,
        });
        if ($("#rate_ck").is(":checked") && $("#wage_ck").is(":checked")) {
          this.chartOptions_top.scales = {
            trade: {
              type: "linear",
              position: "left",
            },
            rate: {
              type: "linear",
              position: "right",
              grid: {
                drawOnChartArea: false,
              },
            },
            wage: {
              type: "linear",
              position: "right",
              grid: {
                drawOnChartArea: false,
              },
            },
          };
          this.chartOptions_top.plugins.legend = {
            display: true,
            position: "bottom",
          };
        } else {
          this.chartOptions_top.scales = {
            trade: {
              type: "linear",
              position: "left",
            },
            rate: {
              type: "linear",
              position: "right",
              grid: {
                drawOnChartArea: false,
              },
            },
          };
          this.chartOptions_top.plugins.legend = {
            display: true,
            position: "bottom",
          };
        }
      } else {
        for (var i = 0; i < this.top_chart.datasets.length; i++) {
          if (this.top_chart.datasets[i].yAxisID == "rate") {
            this.top_chart.datasets.splice(i, 1);
            break;
          }
        }

        this.chartOptions_top.plugins.legend = {
          display: false,
        };

        delete this.chartOptions_top.scales.rate;

        if ($("#wage_ck").is(":checked")) {
          // 최저임금을 제외하고 체크된 것이 있을 경우 범례 유지
          this.chartOptions_top.plugins.legend = {
            display: true,
            position: "bottom",
          };
        } else {
          // 최저임금만 체크됬을 경우 범례 삭제
          this.chartOptions_top.plugins.legend = { display: false };
        }
      }
    },
    compare_top_wage() {
      // 메인 상단 그래프 비교 데이터 {체크박스:(최저시급)}
      if ($("#wage_ck").is(":checked")) {
        this.top_chart.datasets.push({
          yAxisID: "wage",
          label: "최저시급",
          type: "line",
          backgroundColor: "rgba(255, 255, 0, 0.5)",
          borderColor: "rgba(255, 255, 0, 0.5)",
          data: this.wage_list,
        });
        if ($("#rate_ck").is(":checked") && $("#wage_ck").is(":checked")) {
          this.chartOptions_top.scales = {
            trade: {
              type: "linear",
              position: "left",
            },
            rate: {
              type: "linear",
              position: "right",
              grid: {
                drawOnChartArea: false,
              },
            },
            wage: {
              type: "linear",
              position: "right",
              grid: {
                drawOnChartArea: false,
              },
            },
          };
          this.chartOptions_top.plugins.legend = {
            display: true,
            position: "bottom",
          };
        } else {
          this.chartOptions_top.scales = {
            trade: {
              type: "linear",
              position: "left",
            },
            wage: {
              type: "linear",
              position: "right",
              grid: {
                drawOnChartArea: false,
              },
            },
          };
          this.chartOptions_top.plugins.legend = {
            display: true,
            position: "bottom",
          };
        }
      } else {
        for (var i = 0; i < this.top_chart.datasets.length; i++) {
          if (this.top_chart.datasets[i].yAxisID == "wage") {
            this.top_chart.datasets.splice(i, 1);
            break;
          }
        }
        delete this.chartOptions_top.scales.wage;

        if ($("#rate_ck").is(":checked")) {
          // 최저임금을 제외하고 체크된 것이 있을 경우 범례 유지
          this.chartOptions_top.plugins.legend = {
            display: true,
            position: "bottom",
          };
        } else {
          // 최저임금만 체크됬을 경우 범례 삭제
          this.chartOptions_top.plugins.legend = { display: false };
        }
      }
    },
    getTrade_payment() {
      // 매매 거래 금액
      axios.get("/getTrade_payment").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.trade_list.push(res.data[i].avg_amount);
        }
      });
      this.top_chart.datasets[0].data = this.trade_list;
    },
    getTrade_avg() {
      // 매매 거래 금액 변동률
      axios.get("/getTrade_avg").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.trade_avg.push(res.data[i].avg_rate);
        }
      });
      this.bottom_chart.datasets[0].data = this.trade_avg;
    },
    getCharter_payment() {
      // 전,월세 거래 금액
      axios.get("/getCharter_payment").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.charter_list.push(res.data[i].avg_amount);
        }
      });
    },
    getCharter_avg() {
      // 전,월세 거래 금액 변동률
      axios.get("/getCharter_avg").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.charter_avg.push(res.data[i].avg_rate);
        }
      });
    },
    getTrade_data(){
      axios.get("/getTrade_data").then((res) => {
        this.trade_data = res.data[0];
      });
    },
    getRental_data() {
      axios.get("/getRental_data").then((res) => {
        this.rental_data = res.data[0];
      });
    },
  },
};
</script>

<style>
@import "../assets/css/common.css";
</style>
