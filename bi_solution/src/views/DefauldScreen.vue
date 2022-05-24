<template>
  <div id="content">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="4">
          <div>
            <b-card title="Card Title" no-body>
              <b-card-header header-tag="nav">
                <b-nav card-header tabs>
                  <b-nav-item active id="regionFirst" @click="show_Sigungu(1)">시 / 도</b-nav-item>
                  <b-nav-item id="regionSecond" @click="show_Sigungu(2)">시 / 군 / 구</b-nav-item>
                  <b-nav-item id="regionThird" @click="show_Sigungu(3)">읍 / 면 / 동</b-nav-item>
                </b-nav>
              </b-card-header>

              <b-card-body class="text-center">
                <b-list-group
                button
                class="region_select"
                v-for="(region, i) in regionlist"
                v-bind:key="region"
                v-show="regionChk1"
                >
                  <div v-if="i < 15">
                    <b-list-group-item>
                      <b-row  class="city_box" @click="search_Sigungu(region)">
                        <b-col>
                        <p class="city_name">{{ region }}</p>
                        </b-col>
                        <b-col style="text-align: right">
                        <b-icon icon="chevron-compact-right"></b-icon>
                        </b-col>
                      </b-row>
                    </b-list-group-item>
                    <button v-show="!showMore1" v-if="i == 14 && regionlist.length > 14" @click="showMore1 = !showMore1">더보기</button>
                  </div>
                  <div v-else v-show="showMore1">
                    <b-list-group-item>
                      <b-row  class="city_box" @click="search_Sigungu(region)">
                        <b-col>
                        <p class="city_name">{{ region }}</p>
                        </b-col>
                        <b-col style="text-align: right">
                        <b-icon icon="chevron-compact-right"></b-icon>
                        </b-col>
                      </b-row>
                    </b-list-group-item>
                    <button v-if="i == regionlist.length -1" @click="showMore1 = !showMore1" v-show="showMore1">- 접기</button>
                  </div>
                </b-list-group>
                
                <b-list-group
                button
                class="region_select"
                v-for="(sigungu, i) in sigunguList"
                v-bind:key="sigungu"
                v-show="regionChk2"
                >
                  <div v-if="i < 15">
                    <b-list-group-item>
                      <b-row class="city_box" @click="search_dong(sigungu)">
                        <b-col>
                        <p class="city_name">{{ sigungu }}</p></b-col
                        >
                        <b-col style="text-align: right">
                        <b-icon icon="chevron-compact-right"></b-icon>
                        </b-col>
                      </b-row>
                    </b-list-group-item>
                    <button v-show="!showMore2" v-if="i == 14 && sigunguList.length > 14" @click="showMore2 = !showMore2">더보기</button>
                  </div>
                  <div v-else v-show="showMore2">
                    <b-list-group-item>
                      <b-row class="city_box" @click="search_dong(sigungu)">
                        <b-col>
                        <p class="city_name">{{ sigungu }}</p></b-col
                        >
                        <b-col style="text-align: right">
                        <b-icon icon="chevron-compact-right"></b-icon>
                        </b-col>
                      </b-row>
                    </b-list-group-item>
                    <button v-if="i == sigunguList.length -1" @click="showMore2 = !showMore2" v-show="showMore2">- 접기</button>
                  </div>
                </b-list-group>

                <b-list-group
                button
                class="region_select"
                v-for="(dong, i) in dongList"
                v-bind:key="dong"
                v-show="regionChk3"
                >
                  <div v-if="i < 15">
                    <b-list-group-item>
                      <b-row class="city_box">
                        <b-col>
                        <p class="city_name" @click="search_tmp(dong)">{{ dong }}</p></b-col
                        >
                        <b-col style="text-align: right">
                        <b-icon icon="chevron-compact-right"></b-icon>
                        </b-col>
                      </b-row>
                    </b-list-group-item>
                    <button v-show="!showMore3" v-if="i == 14 && dongList.length > 15" @click="showMore3 = !showMore3">더보기</button>
                  </div>
                  <div v-else v-show="showMore3">
                    <b-list-group-item>
                      <b-row class="city_box">
                        <b-col>
                        <p class="city_name" @click="search_tmp(dong)">{{ dong }}</p></b-col
                        >
                        <b-col style="text-align: right">
                        <b-icon icon="chevron-compact-right"></b-icon>
                        </b-col>
                      </b-row>
                    </b-list-group-item>
                    <button v-if="i == dongList.length -1 && dongList.length > 15" @click="showMore3 = !showMore3" v-show="showMore3">- 접기</button>
                  </div>
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
      regionlist: [],       // 시/도 리스트
      sigunguList: [],      // 시/군/구 리스트
      dongList: [],         // 읍/면/동 리스트
      trade_amount: [],
      regionChk1: true,     // 시/도 
      regionChk2: false,    // 시/군/구
      regionChk3: false,    // 읍/면/동
      sidoName: '',         // 시도 이름(클릭한)  
      sigunguName: '',      // 시군구 이름(클릭한)
      showMore1: false,     // 시/도 더보기 버튼
      showMore2: false,     // 시/군/구 더보기 버튼
      showMore3: false,     // 읍/면/동 더보기 버튼
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
    //this.getTrade_amount();
  },
  methods: {
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
    search_Sigungu(region){
      this.sigunguList = [];
      this.sidoName = region;
      this.regionChk1 = false;
      this.regionChk2 = true;
      axios.get('http://localhost:3000/searchSigungu?' + 'regionName=' + region).then((res) =>{  
        for(var i = 0; i < res.data.length; i++){
          this.sigunguList.push(res.data[i].city_nm);
          
          document.getElementById('regionFirst').firstChild.classList.remove('active');
          document.getElementById('regionSecond').firstChild.classList.add('active');
        }
      })
    },

    search_dong(sigungu){
      this.dongList = [];
      this.regionChk1 = false;
      this.regionChk2 = false;
      this.regionChk3 = true;
      axios.get('http://localhost:3000/searchDong?' + 'sigunguName=' + sigungu + '&sidoName=' + this.sidoName).then((res) => {
        for(var i = 0; i < res.data.length; i++){
          this.dongList.push(res.data[i].dong);
        }
        document.getElementById('regionSecond').firstChild.classList.remove('active');
        document.getElementById('regionThird').firstChild.classList.add('active');
      })
    },
    show_Sigungu(step){
      if(this.sigunguList.length == 0 && step ==2){
        alert('시/도를 선택해야 읍/면/동을 확인하실 수 있습니다');
        return ;
      }else if(this.dongList.length == 0 && step ==3){
        alert('시/군/구를 선택해야 읍/면/동을 확인하실 수 있습니다')
        return ;
      }

      if(step == 1){          
        this.dongList = [];
        this.sigunguList = [];
        this.regionChk1 = true;
        this.regionChk2 = false;
        this.regionChk3 = false;
        document.getElementById('regionSecond').firstChild.classList.remove('active');
        document.getElementById('regionFirst').firstChild.classList.add('active');
      }else if(step == 2){    
        this.dongList = [];
        this.regionChk1 = false;
        this.regionChk2 = true;
        this.regionChk3 = false;
        document.getElementById('regionThird').firstChild.classList.remove('active');
        document.getElementById('regionSecond').firstChild.classList.add('active');
      }

      this.showMore1 = false;
      this.showMore2 = false;
      this.showMore3 = false;
      
    },
    search_tmp(dong){
      console.log("temp : " + dong);
    },
    show_More(){
      console.log('show_More clicked');
    }
  },
};
//eslint-disable-next-line
function show_Region(numb){
  console.log('show_Region : ' + numb);
}
</script>

<style>
@import "../assets/css/common.css";
</style>
