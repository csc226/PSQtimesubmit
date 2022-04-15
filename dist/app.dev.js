"use strict";

var express = require('express');

var moment = require('moment');

var url = require('url');

var app = express();

var cors = require('cors');

var fs = require('fs');

app.use(cors()); // http://127.0.0.1:3000/exe/log?date=1649760928923&count=12&name=css&tel=13312941203

app.get('/exe/log', function (req, ress) {
  var query = url.parse(req.url, true).query;
  var date = moment(Number(query.date)).format('YYYY-MM-DD HH:mm:ss');
  var count = query.count;
  var name = query.name;
  var tel = query.tel;
  var telC = '';
  var telText = fs.readFileSync('./log/tel.txt', 'utf-8').replace(/\n/g, '');
  var info = "";

  if (telText) {
    telC = ',' + '\n' + tel;
  } else {
    telC = tel;
  }

  var telArr = telText.split(','); // console.log(telArr.length)
  // console.log(telArr)

  var phone_reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

  if (telArr.indexOf(tel) == -1 && phone_reg.test(tel)) {
    fs.appendFileSync('./log/tel.txt', telC);
  } else if (telArr.indexOf(tel) > -1) {
    console.log("\u624B\u673A\u53F7\u91CD\u590D:".concat(tel, ",\u5BFC\u81F4\u4E0D\u80FD\u586B\u5199\u95EE\u5377"));
    info = ",\u4F46\u662F\u624B\u673A\u53F7\u91CD\u590D:".concat(tel, ",\u5BFC\u81F4\u4E0D\u80FD\u586B\u5199\u95EE\u5377");
  } else if (!phone_reg.test(tel)) {
    console.log("\u624B\u673A\u53F7\u683C\u5F0F:".concat(tel, ",\u5BFC\u81F4\u4E0D\u80FD\u586B\u5199\u95EE\u5377"));
    info = ",\u4F46\u662F\u624B\u673A\u53F7\u683C\u5F0F\u4E0D\u5BF9:".concat(tel, ",\u5BFC\u81F4\u4E0D\u80FD\u586B\u5199\u95EE\u5377");
  } // console.log(Number(query.date))
  // console.log(date)
  // console.log(count)


  var log = "".concat(name, "--\u5728").concat(date, "\u63D0\u4EA4\u4E86\u6587\u4EF6\uFF0C\u7B2C").concat(count, "\u4E2A\u63D0\u4EA4\u95EE\u5377\u7684\u4EBA").concat(info, "\n");
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
          ress.json('记录成功！');
        }
      });
    }
  }); // res.json('成功')
});
app.listen(3000, function (res) {
  console.log('服务启动 http://127.0.0.1:3000');
});