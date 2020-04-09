var express = require('express');
var router = express.Router();
var connection = require('../public/javascripts/mysql');
router.post('/login', function(req, res, next) {
  console.log(req.body)
  console.log(req.headers)
  var sql = `SELECT * FROM tb_member where account='${req.body.username}' and password='${req.body.password}' `;
  console.log(sql)
  var str = " ";
  console.log('before mysql');
  new Promise((s,f)=>{
    connection.querySql(sql,s,f)
  }).then(
    (data)=>{
    res.send('登录成功'+data);
  },(err)=>{
    res.send('登录失败'+err);
  })
});

module.exports = router;