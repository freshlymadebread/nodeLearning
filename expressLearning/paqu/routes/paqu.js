var express = require('express');
var router = express.Router();
const superagent = require("superagent");
const cheerio = require("cheerio");

router.get('/', function(req, res, next) {
  superagent
    .get("http://2988q962j9.qicp.vip/license_monitoring.html")
    .end((error, response) => {
        //获取页面文档数据
        var content = response.text;
        console.log(content)
        //cheerio也就是nodejs下的jQuery  将整个文档包装成一个集合，定义一个变量$接收
        var $ = cheerio.load(content);
        //定义一个空数组，用来接  收数据
        var result = [];
        //分析文档结构  先获取每个li 再遍历里面的内容(此时每个li里面就存放着我们想要获取的数据)
        var used = $("#firm_code_content_table_6000104 > tbody > tr:nth-child(2) > td.column_used.column_ul.assignment_status.assignment_summary")[0].children[0].data

        console.log('-------------------------------------=-----------------------')
        console.log(used)
        res.json({used});

    });
});
module.exports = router;
