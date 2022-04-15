// const open = require('open')
// open('https://wx.bjcpn.com/wmcpwj');
const fs = require('fs')
fs.readFile('userInfo.json', 'utf-8', function (err, res) {
    if (err) {
        console.log('报错：', err)
    } else {
        let data = JSON.parse(res);
        let len = Math.ceil(data.length / 200);
        console.log('长度:', len)
        for (let i = 1; i <= len; i++) {
            let data1 = data.filter((item, index) => {
                return index < i * 200&&index >= (i-1) * 200;
            })
            // console.log(data1)
            fs.writeFile(`./day/day${i}.json`, JSON.stringify(data1), 'utf-8', function (err) {
                if (err) console.log('写入错误:', err)
                console.log(`第${i}天写入成功`)
            })
            let text = `// 第${i}天 // 3分钟1条 10个小时 200条
            $.get('http://127.0.0.1:3500/day/day${i}.json',function(res){
                let arr=res;
                let time=${(i - 1) * 200}
                var interval=setInterval(()=>{
                    if(time==arr.length-1){
                        clearInterval(interval)
                    }
                    let subject2 = 0;
                    let subject3 = 0;
                    $("input[name=username]").val(arr[time].name);
                    $("input[name=phone]").val(arr[time].tel);
                    $('#sch').val('霍营街道')
                    $("#cla").val('霍家营社区')
                    $("#trigger4").text('霍营街道 霍家营社区')
                    if (time < 1500) {
                        subject2 = 2
                    } else if (time < 4000 && time >= 1500) {
                        subject2 = 1
                    } else if (time > 4000) {
                        subject2 = 0
                    }
                    if (arr[time].age < 16) {
                        subject3 = 0
                    } else if (arr[time].age >= 16 && arr[time].age <= 25) {
                        subject3 = 1
                    } else if (arr[time].age >= 26 && arr[time].age <= 35) {
                        subject3 = 2
                    } else if (arr[time].age >= 36 && arr[time].age <= 45) {
                        subject3 = 3
                    } else if (arr[time].age >= 46 && arr[time].age <= 55) {
                        subject3 = 4
                    } else if (arr[time].age >= 56 && arr[time].age <= 65) {
                        subject3 = 5
                    } else if (arr[time].age >= 66) {
                        subject3 = 6
                    }
                    for (let i = 2; i < 33; i++) {
                        let len = $("input[name=a" + i + "]").length;
                        if (i == 2) {
                            $("input[name=a" + i + "]")[subject2].checked = true;
                        } else if (i == 3) {
                            $("input[name=a" + i + "]")[subject3].checked = true;
                        } else if (i == 4) {
                            $("input[name=a" + i + "]")[1].checked = true;
                        } else if (i == 32) {
                            let num = arr[time].sex == '男' ? 0 : 1;
                            $("input[name=a" + i + "]")[num].checked = true;
                        } else if (i == 24) {
                            $("#xuqiu").val('无')
                        } else {
                            $("input[name=a" + i + "]")[0].checked = true;
                        }
                    }
                    
                    let date=new Date().getTime()
                    $.ajax({
                        type: "get",
                        url: "http://127.0.0.1:3000/exe/log?date=" + date + "&count=" + time + "&name=" + arr[time].name,
                        success: function(res) {
                            console.log(res)
                            // setTimeout(()=>{
                            //     window.history.back()
                            // },60000)
                        }
                    })
                    $('.zbtn').click()
                    time+=1;
                    console.log(time)
                },180000)
            })`
            fs.writeFile(`./day/day${i}.js`, text, 'utf-8', function (err) {
                if (err) console.log('写入错误:', err)
                console.log(`第${i}js天写入成功`)
            })
        }
    }
})
