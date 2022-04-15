"use strict";

var express = require('express');

var moment = require('moment');

var url = require('url');

var app = express();

var cors = require('cors');

var fs = require('fs');

app.use(cors()); // http://127.0.0.1:3000/exe/log?date=1649760928923

app.get('/exe/log', function (req, ress) {
  var query = url.parse(req.url, true).query;
  var date = moment(Number(query.date)).format('YYYY-MM-DD HH:mm:ss');
  var count = query.count;
  var name = query.name; // console.log(Number(query.date))
  // console.log(date)
  // console.log(count)

  var log = "".concat(name, "--\u5728").concat(date, "\u63D0\u4EA4\u4E86\u6587\u4EF6\uFF0C\u7B2C").concat(count, "\u4E2A\u63D0\u4EA4\u95EE\u5377\u7684\u4EBA\n");
  fs.readFile('./log/log.txt', 'utf-8', function (err, data) {
    if (err) {
      // console.log('读取报错', err)
      ress.json('1错误');
    } else {
      // console.log(data)
      var newData = log + data;
      fs.writeFile('./log/log.txt', newData, 'utf-8', function (err) {
        if (err) {
          // console.log(err)
          ress.json('2错误');
        } else {
          console.log('写入成功！');
          ress.json('22成功');
        }
      });
    }
  }); // res.json('成功')
});
app.listen(3100, function (res) {
  console.log('服务启动 http://127.0.0.1:3100');
});