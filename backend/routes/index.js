var express = require("express");
var request = require("request");
var convert = require("xml-js");
var path = require("path");
var router = express.Router();

const maria = require("../mariaConn");

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
  console.log("backend sidoName : " + req.query.sidoName);
  maria.query(
    "SELECT DISTINCT dong FROM addr_list WHERE city_nm = ? and sido_nm = ? AND detailed IS NULL",
    [req.query.sigunguName, req.query.sidoName],
    function (err, rows, fields) {
      res.send(rows);
    }
  );
});

// 시/군/구
router.get("/searchSigungu", function (req, res) {
  console.log(req.query.regionName);
  maria.query(
    "SELECT DISTINCT city_nm FROM addr_list WHERE sido_nm = ? AND detailed IS NULL",
    req.query.regionName,
    function (err, rows, fields) {
      console.log("query result : " + rows);
      res.send(rows);
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

router.get("/getRank_trade", function (req, res) {
  maria.query(
    "SELECT region, ROUND(AVG(rate), 2) * 100 AS avg_rate FROM trade_change_rate WHERE region NOT LIKE  '%전국' AND region !='5대광역시' AND region !='6대광역시' AND region !='수도권' AND region !='8개도' GROUP BY region ORDER BY avg_rate DESC LIMIT 5",
    function (err, rows, field) {
      // console.log(rows);
      res.send(rows);
    }
  );
});

router.get("/getRank_charter", function (req, res) {
  maria.query(
    "SELECT region, ROUND(AVG(rate), 2) * 100 AS avg_rate FROM charter_change_rate WHERE region NOT LIKE  '%전국' AND region !='5대광역시' AND region !='6대광역시' AND region !='수도권' AND region !='8개도' GROUP BY region ORDER BY avg_rate DESC LIMIT 5",
    function (err, rows, field) {
      // console.log(rows);
      res.send(rows);
    }
  );
});

router.get("/getTrade_rate", function (req, res) {
  maria.query(
    "SELECT region, round(AVG(rate),2) FROM trade_change_rate WHERE region = '전국' GROUP BY region, LEFT(period,4);",
    function (err, rows, field) {
      // console.log(rows);
      res.send(rows);
    }
  );
});

router.get("/getBasemoney_rank", function (req, res) {
  maria.query(
    "SELECT rate FROM basemoney_rate ORDER BY idx DESC LIMIT 1",
    function (err, rows, field) {
      // console.log(rows);
      res.send(rows);
    }
  );
});

router.get("/getMinimunWage", function (req, res) {
  maria.query(
    "SELECT wage FROM minimum_wage ORDER BY period DESC LIMIT 1",
    function (err, rows, field) {
      // console.log(rows);
      res.send(rows);
    }
  );
});

router.get("/getWages", function (req, res) {
  maria.query(
    "SELECT idx, period, wage FROM minimum_wage WHERE period BETWEEN 2015 AND 2021",
    function (err, rows, field) {
      // console.log(rows);
      res.send(rows);
    }
  );
});

router.get("/getBasemoney_chart", function (req, res) {
  maria.query(
    "SELECT YEAR(period), ROUND(AVG(rate),1) FROM basemoney_rate WHERE YEAR(period) BETWEEN 2012 AND 2021 GROUP BY YEAR(period)",
    function (err, rows, field) {
      console.log(rows);
      res.send(rows);
    }
  );
});

module.exports = router;
