var express = require('express');
var router = express.Router();
const superagent = require("superagent");
const cheerio = require("cheerio");
let used = undefined,
  all = undefined,
  user = [];
let getInfo = function () {
  console.log('-------------------------------------=-----------------------')
  console.log('进行一次请求')
  superagent
    // .get("http://2988q962j9.qicp.vip/license_monitoring.html")
    .get("http://2988q962j9.qicp.vip/license_monitoring/license_monitoring_details.html?BoxSerial=3-3976917&FirmCode=6000104&ProductCode=1&PiReference=16")
    .end((error, response) => {
      console.log('-------------------------------------=-----------------------')
      console.log('请求成功，准备解析')
      //获取页面文档数据
      var content = response.text;
      console.log(content)
      //cheerio也就是nodejs下的jQuery  将整个文档包装成一个集合，定义一个变量$接收
      var $ = cheerio.load(content);
      used = $("body > section > table.product_item_table.table_width_auto.shadow > tbody > tr.product_code_row > td:nth-child(3)")[0].children[0].data
      all = $("body > section > table.product_item_table.table_width_auto.shadow > tbody > tr.product_code_row > td:nth-child(4)")[0].children[0].data
      var tb = $('.product_code_row')
      // console.log(tb)
      var arr = []
      for (let i = 0; i < 5; i++) {
        if (tb[i + 1] != undefined) arr.push(tb[i + 1])
      }
      user = []
      arr.forEach(ele => {
        user.push([ele.children[3].children[0].data, ele.children[11].children[0].data, ele.children[13].children[0].data.replace('\n', '').trim()])
      })
      console.log('-------------------------------------=-----------------------')
      console.log('解析完成')
      console.log(used, all, user)
    });
}
var timer = setInterval(getInfo, 8000)
router.get('/', function (req, res, next) {
  console.log('收到请求直接返回')
  res.json({ used, all, user });
});
module.exports = router;
