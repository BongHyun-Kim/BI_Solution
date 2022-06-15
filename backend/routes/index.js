var express = require("express");
var request = require("request");
var convert = require("xml-js");
var path = require("path");
var router = express.Router();

const maria = require("../mariaConn");

const currDate = new Date();
const currYear = currDate.getFullYear();
// .getMonth 로 값을 받아오면 0~11 까지로 받아옴, getMonth + 1 을 해야 현재 달이 된다.
const currMonth = currDate.getMonth();

router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.get("/select", function (req, res) {
  maria.query(
    "select distinct sido_nm from addr_list",
    function (err, rows, fields) {
      if (!err) {
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});
// 지역코드 담을 배열
var addr_cod = [];
var total_trade = 0;
// 쿼리문 결과 배열에 추가
var pushResults = function (rows) {
  for (var i = 0; i < rows.length; i++) {
    addr_cod.push(rows[i].addr_cd);
  }
};

// router.get("/getTotaltrade", function (req, res) {
//   maria.query(
//     "select addr_cd from sm_address_code",
//     function (err, rows, field) {
//       if (!err) {
//         pushResults(rows);
//         // console.log(addr_cod);
//       } else {
//         console.log(err);
//       }
//     }
//   );
//   // console.log(addr_cod);

//   for (var j = 0; j < addr_cod.length; j++) {
//     var url =
//       "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev";
//     var queryParams =
//       "?" +
//       /* Service Key*/
//       // queryParams +=
//       //   "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
//       // queryParams +=
//       //   "&" +
//       //   encodeURIComponent("numOfRows") +
//       //   "=" +
//       //   encodeURIComponent("10"); /* */
//       encodeURIComponent("LAWD_CD") +
//       "=" +
//       encodeURIComponent("11100"); /* */
//     queryParams +=
//       "&" +
//       encodeURIComponent("DEAL_YMD") +
//       "=" +
//       encodeURIComponent("202204") +
//       "&" +
//       encodeURIComponent("serviceKey") +
//       "=" +
//       "bt1l9ZZf%2FPw1gog7Dab2RM16AgkVkn07K%2FbieKxpMVvm7mh5AEES%2BzYFsPB%2FfE58AScqIo1cuJLXOS6XGIONcg%3D%3D"; /* */

//     request(
//       {
//         url: url + queryParams,
//         method: "GET",
//       },
//       function (err, res) {
//         if (!err) {
//           if (res.statusCode == 200) {
//             var result = res.body;
//             // console.log(result);
//             var xmlToJson = convert.xml2json(result, {
//               compact: true,
//               spaces: 4,
//             });
//             var json = JSON.parse(xmlToJson);
//             console.log(json);
//             // console.log(typeof Object.values(json.response.body.totalCount)[0]);
//             count = parseInt(Object.values(json.response.body.totalCount)[j]);
//             console.log(typeof count);
//             total_trade += count;
//             console.log(total_trade);
//           }
//         } else {
//           console.log(err);
//         }
//       }
//     );
//   }
//   // console.log(total_trade);
// });

// 읍/면/동
router.get("/searchDong", function (req, res) {
  // console.log("backend sidoName : " + req.query.sidoName);
  maria.query(
    "SELECT DISTINCT dong FROM addr_list WHERE city_nm = ? and sido_nm = ? AND detailed IS NULL",
    [req.query.sigunguName, req.query.sidoName],
    function (err, rows, fields) {
      if (!err) {
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 시/군/구
router.get("/searchSigungu", function (req, res) {
  maria.query(
    "SELECT DISTINCT city_nm FROM addr_list WHERE sido_nm = ? AND detailed IS NULL",
    req.query.regionName,
    function (err, rows, fields) {
      if (!err) {
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 시/도
router.get("/select", function (req, res) {
  maria.query(
    "select distinct sido_nm from addr_list",
    function (err, rows, fields) {
      if (!err) {
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 랭크 (매매)
router.get("/getRank_trade", function (req, res) {
  maria.query(
    "SELECT CONCAT(sido_nm, ' ', sigungu_nm) AS region, ROUND(AVG(CAST(REPLACE(amount, ',', '') AS UNSIGNED)),0) AS avg_price FROM trade_avg_price GROUP BY sigungu_nm ORDER BY avg_price DESC LIMIT 5",
    function (err, rows, field) {
      if (!err) {
        // console.log(rows);
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 랭크(전,월세)
router.get("/getRank_charter", function (req, res) {
  maria.query(
    "SELECT CONCAT(sido_nm, ' ', sigungu_nm) AS region, ROUND(AVG(CAST(REPLACE(amount, ',', '') AS UNSIGNED)),0) AS avg_price FROM charter_avg_price GROUP BY sigungu_nm ORDER BY avg_price DESC LIMIT 5",
    function (err, rows, field) {
      if (!err) {
        // console.log(rows);
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 매매 변동률
router.get("/getTrade_rate", function (req, res) {
  maria.query(
    "SELECT region, round(AVG(rate),2) FROM trade_change_rate WHERE region = '전국' GROUP BY region, LEFT(period,4);",
    function (err, rows, field) {
      if (!err) {
        // console.log(rows);
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 기본지표 (기준금리)
router.get("/getBasemoney_rank", function (req, res) {
  maria.query(
    "SELECT rate FROM basemoney_rate ORDER BY idx DESC LIMIT 1",
    function (err, rows, field) {
      if (!err) {
        // console.log(rows);
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 기본지표 (직전 기준금리)
router.get("/getBasemoney_compare", function (req, res) {
  maria.query(
    "SELECT rate FROM basemoney_rate WHERE YEAR(period) = YEAR(SYSDATE()) ORDER BY period DESC LIMIT 1, 1",
    function (err, rows, field) {
      if (!err) {
        // console.log(rows);
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 기본지표 (최저시급)
router.get("/getMinimunWage", function (req, res) {
  maria.query(
    "SELECT wage FROM minimum_wage ORDER BY period DESC LIMIT 1",
    function (err, rows, field) {
      if (!err) {
        // console.log(rows);
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 기본지표 (직전 최저시급)
router.get("/getMinimunWage_compare", function (req, res) {
  maria.query(
    "SELECT wage FROM minimum_wage ORDER BY period DESC LIMIT 1,1",
    function (err, rows, field) {
      if (!err) {
        // console.log(rows);
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 그래프 추가 데이터 (최저시급)
router.get("/getWages", function (req, res) {
  maria.query(
    "SELECT idx, period, wage FROM minimum_wage WHERE period BETWEEN 2015 AND 2021",
    function (err, rows, field) {
      if (!err) {
        // console.log(rows);
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 그래프 추가 데이터 (기준금리)
router.get("/getBasemoney_chart", function (req, res) {
  maria.query(
    "SELECT LEFT (period,4), ROUND(AVG(rate),1) AS avg_rate FROM basemoney_rate WHERE left(period,4) BETWEEN 2015 AND 2021 GROUP BY left(period,4)",
    function (err, rows, field) {
      if (!err) {
        // console.log(rows);
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 메인 상단 그래프 (평균 매매 거래 금액)
router.get("/getTrade_payment", function (req, res) {
  maria.query(
    "SELECT sido_nm, LEFT(period,4), ROUND(AVG(amount),0) AS avg_amount FROM trade_avg_price WHERE sido_nm = '전국' AND LEFT(period,4) BETWEEN 2015 AND 2021 GROUP BY LEFT(period,4)",
    function (err, rows, field) {
      if (!err) {
        // console.log(rows);
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 지역 선택 시 해당 지역 상단 그래프 (평균 매매 거래 금액)
router.get("/selected_trade", function async(req, res) {
  console.log("selected Sido = " + req.query.regionName);
  maria.query(
    "SELECT sido_nm, LEFT(period, 4), ROUND(AVG(amount),0) AS avg_amount FROM trade_avg_price WHERE sido_nm = ? AND LEFT(period,4) BETWEEN 2015 AND 2021 GROUP BY LEFT(period,4)",
    req.query.regionName,
    function (err, rows, field) {
      if (!err) {
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 메인 하단 그래프 (평균 매매 거래 금액 변동률)
router.get("/getTrade_avg", function (req, res) {
  maria.query(
    "SELECT region, LEFT(period,4), ROUND(AVG(rate),2) AS avg_rate FROM trade_change_rate WHERE region = '전국' AND LEFT(period,4) BETWEEN 2015 AND 2021 GROUP BY LEFT(period,4)",
    function (err, rows, field) {
      if (!err) {
        // console.log(rows);
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 지역 선택 시 해당 지역 하단 그래프 (평균 매매 거래 금액 변동률)
router.get("/selected_rate", function async(req, res) {
  // console.log("selected Sido = " + req.query.regionName);
  maria.query(
    "SELECT region, LEFT(period, 4), ROUND(AVG(rate),1) AS avg_rate FROM trade_change_rate WHERE region = ? AND LEFT(period,4) BETWEEN 2015 AND 2021 GROUP BY LEFT(period,4)",
    req.query.regionName,
    function (err, rows, field) {
      if (!err) {
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 메인 상단 그래프 (평균 전,월세 거래 금액)
router.get("/getCharter_payment", function (req, res) {
  maria.query(
    "SELECT sido_nm, LEFT(period,4), ROUND(AVG(amount),0) AS avg_amount FROM charter_avg_price WHERE sido_nm = '전국' AND LEFT(period,4) BETWEEN 2015 AND 2021 GROUP BY LEFT(period,4)",
    function (err, rows, field) {
      if (!err) {
        // console.log(rows);
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 메인 하단 그래프 (평균 전,월세 거래 금액 변동률)
router.get("/getCharter_avg", function (req, res) {
  maria.query(
    "SELECT region, LEFT(period,4), ROUND(AVG(rate),2) AS avg_rate FROM charter_change_rate WHERE region = '전국' AND LEFT(period,4) BETWEEN 2015 AND 2021 GROUP BY LEFT(period,4)",
    function (err, rows, field) {
      if (!err) {
        console.log(rows);
        console.log("12341234")
        console.log("13246579813")
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

// 매매 카운트, 전전월과 전월의 데이터 비교 후 어디가 더 큰지 반환
router.get("/getTrade_data", function (req, res) {
  maria.query(
    "SELECT COUNT(*) as deals FROM trade_real_apt WHERE trade_year = ? AND trade_month = ?",
    [currYear, currMonth - 1],
    function (err, rows1, field) {
      if (!err) {
        maria.query(
          "SELECT COUNT(*) as deals FROM trade_real_apt WHERE trade_year = ? AND trade_month = ?",
          [currYear, currMonth],
          function (err, rows2, field) {
            if (!err) {
              if (rows1[0].deals > rows2[0].deals) {
                // 전전달의 데이터가 전달의 데이터보다 큰 경우
                res.send({ cnt: rows2[0].deals, whoWin: "before" });
              } else {
                res.send({ cnt: rows2[0].deals, whoWin: "curr" });
              }
            } else {
              console.log("err : " + err);
              res.send(err);
            }
          }
        );
      }
    }
  );
});

// 지역 선택 시 매매 카운트, 전전월과 전월의 데이터 비교 후 어디가 더 큰지 반환
router.get("/region_trade", function (req, res) {
  maria.query(
    "SELECT COUNT(*) as deals FROM trade_real_apt WHERE INSTR(sigungu_cd, (SELECT LEFT (addr_cd, 2) FROM sm_address_code WHERE addr_nm = ? )) AND trade_year = ? AND trade_month = ?",
    [req.query.regionName, currYear, currMonth - 1],
    function (err, rows1, field) {
      if (!err) {
        maria.query(
          "SELECT COUNT(*) as deals FROM trade_real_apt WHERE INSTR(sigungu_cd, (SELECT LEFT (addr_cd, 2) FROM sm_address_code WHERE addr_nm = ? )) AND trade_year = ? AND trade_month = ?",
          [req.query.regionName, currYear, currMonth],
          function (err, rows2, field) {
            if (!err) {
              if (rows1[0].deals > rows2[0].deals) {
                res.send({ cnt: rows2[0].deals, whoWin: "before" });
              } else {
                res.send({ cnt: rows2[0].deals, whoWin: "curr" });
              }
            } else {
              console.log("err : " + err);
              res.send(err);
            }
          }
        );
      }
    }
  );
});

// 전월세 카운트, 전전월과 전월의 데이터 비교 후 어디가 더 큰지 반환
router.get("/getRental_data", function (req, res) {
  maria.query(
    "SELECT charter + monthly as total_count FROM (SELECT COUNT(*) AS charter FROM charter_real_apt WHERE trade_year = ? AND trade_month = ?) A, (SELECT COUNT(*) AS monthly FROM monthly_real_apt WHERE trade_year = ? AND trade_month = ?) B",
    [currYear, currMonth - 1, currYear, currMonth - 1],
    function (err, rows1, field) {
      if (!err) {
        maria.query(
          "SELECT charter + monthly as total_count FROM (SELECT COUNT(*) AS charter FROM charter_real_apt WHERE trade_year = ? AND trade_month = ?) A, (SELECT COUNT(*) AS monthly FROM monthly_real_apt WHERE trade_year = ? AND trade_month = ?) B",
          [currYear, currMonth, currYear, currMonth],
          function (err, rows2, field) {
            if (!err) {
              if (rows1[0].total_count > rows2[0].total_count) {
                res.send({ cnt: rows2[0].total_count, whoWin: "before" });
              } else {
                res.send({ cnt: rows2[0].total_count, whoWin: "curr" });
              }
            } else {
              console.log("err : " + err);
              res.send(err);
            }
          }
        );
      }
    }
  );
});

// 지역 선택 시 전월세 카운트, 전전월과 전월의 데이터 비교 후 어디가 더 큰지 반환
router.get("/region_rental", function (req, res) {
  maria.query(
    "SELECT COUNT(*) AS total_count FROM charter_real_apt WHERE INSTR(sigungu_cd, (SELECT LEFT (addr_cd, 2) FROM sm_address_code WHERE addr_nm = ? )) AND trade_year = ? AND trade_month = ?",
    [req.query.regionName, currYear, currMonth - 1],
    function (err, rows1, field) {
      if (!err) {
        maria.query(
          "SELECT COUNT(*) AS total_count FROM charter_real_apt WHERE INSTR(sigungu_cd, (SELECT LEFT (addr_cd, 2) FROM sm_address_code WHERE addr_nm = ? )) AND trade_year = ? AND trade_month = ?",
          [req.query.regionName, currYear, currMonth],
          function (err, rows2, field) {
            if (!err) {
              if (rows1[0].deals > rows2[0].deals) {
                res.send({ cnt: rows2[0].total_count, whoWin: "before" });
              } else {
                res.send({ cnt: rows2[0].total_count, whoWin: "curr" });
              }
            } else {
              console.log("err : " + err);
              res.send(err);
            }
          }
        );
      }
    }
  );
});

router.get("/search_tmp", function (req, res) {
  maria.query(
    "SELECT apt_nm, layer, 0 AS deposit, payment, built_year, trade_year, trade_month, sigungu_cd,  dong, land_no, land_area FROM trade_real_apt WHERE dong = ? and trade_year = 2022 AND trade_month = 5 UNION ALL SELECT apt_nm, layer, deposit, payment, built_year, trade_year, trade_month, sigungu_cd, dong, land_no, land_area FROM charter_real_apt WHERE dong = ? and trade_year = 2022 AND trade_month = 5 UNION ALL SELECT apt_nm, layer, deposit, payment, built_year, trade_year, trade_month, sigungu_cd, dong, land_no, land_area FROM monthly_real_apt WHERE dong = ? and trade_year = 2022 AND trade_month = 5",
    [req.query.dong, req.query.dong, req.query.dong],
    function (err, rows, field) {
      if(!err){
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    }
  );
});

module.exports = router;
