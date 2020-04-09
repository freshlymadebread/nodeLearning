
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'192.168.32.1',
    port:'3306',
    user:'root',
    password:'root',
    database:'bookstore'
});
var str = " ";
connection.querySql = (sqlString,resolved,rejected) => {
    connection.connect();
    connection.query(sqlString, function (err,result) {
        if(err){
            console.log('[SELECT ERROR]:',err.message);
            rejected(err);
        }
        str = JSON.stringify(result);
        //数据库查询的数据保存在result中，但浏览器并不能直接读取result中的结果，因此需要用JSON进行解析
        //console.log(result);   //数据库查询结果返回到result中
        console.log(str);
        connection.end();
        resolved(str)
    })
}
module.exports = connection;