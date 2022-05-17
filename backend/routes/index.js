var express = require('express');
var router = express.Router();

const maria = require('../mariaConn');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next){
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/select', function(req, res){
  maria.run('select * from addr_cd_lg');
  // maria.query('select * from addr_cd_lg', function(err, rows, fields){
  //   if(!err){
  //     res.send(rows);
  //   }else{
  //     console.log("err : " + err);
  //     res.send(err);
  //   }
  // });
});

module.exports = router;