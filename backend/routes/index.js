var express = require("express");
var request = require("request");
var convert = require("xml-js");
var router = express.Router();

const maria = require("../mariaConn");

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

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

router.get("/getapi", function (req, res) {
  var url =
    "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev";
  var queryParams =
    "?" +
    /* Service Key*/
    // queryParams +=
    //   "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
    // queryParams +=
    //   "&" +
    //   encodeURIComponent("numOfRows") +
    //   "=" +
    //   encodeURIComponent("10"); /* */
    encodeURIComponent("LAWD_CD") +
    "=" +
    encodeURIComponent("11110"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("DEAL_YMD") +
    "=" +
    encodeURIComponent("202204") +
    "&" +
    encodeURIComponent("serviceKey") +
    "=" +
    "bt1l9ZZf%2FPw1gog7Dab2RM16AgkVkn07K%2FbieKxpMVvm7mh5AEES%2BzYFsPB%2FfE58AScqIo1cuJLXOS6XGIONcg%3D%3D"; /* */

  request(
    {
      url: url + queryParams,
      method: "GET",
    },
    function (err, res) {
      if (!err) {
        if (res.statusCode == 200) {
          var result = res.body;
          // console.log(result);
          var xmlToJson = convert.xml2json(result, {
            compact: true,
            spaces: 4,
          });
          var json = JSON.parse(xmlToJson);
          // console.log(json);
          console.log(Object.values(json.response.body.totalCount)[0]);
        }
      }
    }
  );
});

module.exports = router;
