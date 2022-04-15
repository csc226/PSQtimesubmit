"use strict";

// const open = require('open')
// open('https://wx.bjcpn.com/wmcpwj');
var fs = require('fs');

fs.readFile('userInfo.json', 'utf-8', function (err, res) {
  if (err) {
    console.log('报错：', err);
  } else {
    var data = JSON.parse(res);
    var len = Math.ceil(data.length / 200);
    console.log('长度:', len);

    var _loop = function _loop(i) {
      var data1 = data.filter(function (item, index) {
        return index < i * 200 && index >= (i - 1) * 200;
      }); // console.log(data1)

      fs.writeFile("./day/day".concat(i, ".json"), JSON.stringify(data1), 'utf-8', function (err) {
        if (err) console.log('写入错误:', err);
        console.log("\u7B2C".concat(i, "\u5929\u5199\u5165\u6210\u529F"));
      });
      var text = "// \u7B2C".concat(i, "\u5929 // 3\u5206\u949F1\u6761 10\u4E2A\u5C0F\u65F6 200\u6761\n            $.get('http://127.0.0.1:3500/day/day").concat(i, ".json',function(res){\n                let arr=res;\n                let time=").concat((i - 1) * 200, "\n                var interval=setInterval(()=>{\n                    if(time==arr.length-1){\n                        clearInterval(interval)\n                    }\n                    let subject2 = 0;\n                    let subject3 = 0;\n                    $(\"input[name=username]\").val(arr[time].name);\n                    $(\"input[name=phone]\").val(arr[time].tel);\n                    $('#sch').val('\u970D\u8425\u8857\u9053')\n                    $(\"#cla\").val('\u970D\u5BB6\u8425\u793E\u533A')\n                    $(\"#trigger4\").text('\u970D\u8425\u8857\u9053 \u970D\u5BB6\u8425\u793E\u533A')\n                    if (time < 1500) {\n                        subject2 = 2\n                    } else if (time < 4000 && time >= 1500) {\n                        subject2 = 1\n                    } else if (time > 4000) {\n                        subject2 = 0\n                    }\n                    if (arr[time].age < 16) {\n                        subject3 = 0\n                    } else if (arr[time].age >= 16 && arr[time].age <= 25) {\n                        subject3 = 1\n                    } else if (arr[time].age >= 26 && arr[time].age <= 35) {\n                        subject3 = 2\n                    } else if (arr[time].age >= 36 && arr[time].age <= 45) {\n                        subject3 = 3\n                    } else if (arr[time].age >= 46 && arr[time].age <= 55) {\n                        subject3 = 4\n                    } else if (arr[time].age >= 56 && arr[time].age <= 65) {\n                        subject3 = 5\n                    } else if (arr[time].age >= 66) {\n                        subject3 = 6\n                    }\n                    for (let i = 2; i < 33; i++) {\n                        let len = $(\"input[name=a\" + i + \"]\").length;\n                        if (i == 2) {\n                            $(\"input[name=a\" + i + \"]\")[subject2].checked = true;\n                        } else if (i == 3) {\n                            $(\"input[name=a\" + i + \"]\")[subject3].checked = true;\n                        } else if (i == 4) {\n                            $(\"input[name=a\" + i + \"]\")[1].checked = true;\n                        } else if (i == 32) {\n                            let num = arr[time].sex == '\u7537' ? 0 : 1;\n                            $(\"input[name=a\" + i + \"]\")[num].checked = true;\n                        } else if (i == 24) {\n                            $(\"#xuqiu\").val('\u65E0')\n                        } else {\n                            $(\"input[name=a\" + i + \"]\")[0].checked = true;\n                        }\n                    }\n                    \n                    let date=new Date().getTime()\n                    $.ajax({\n                        type: \"get\",\n                        url: \"http://127.0.0.1:3000/exe/log?date=\" + date + \"&count=\" + time + \"&name=\" + arr[time].name,\n                        success: function(res) {\n                            console.log(res)\n                            // setTimeout(()=>{\n                            //     window.history.back()\n                            // },60000)\n                        }\n                    })\n                    $('.zbtn').click()\n                    time+=1;\n                    console.log(time)\n                },180000)\n            })");
      fs.writeFile("./day/day".concat(i, ".js"), text, 'utf-8', function (err) {
        if (err) console.log('写入错误:', err);
        console.log("\u7B2C".concat(i, "js\u5929\u5199\u5165\u6210\u529F"));
      });
    };

    for (var i = 1; i <= len; i++) {
      _loop(i);
    }
  }
});