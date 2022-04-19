const express = require('express')
const moment = require('moment')
const url = require('url')
const app = express()
const cors = require('cors')
const fs = require('fs')
const path=require('path')
app.use(cors())
    // http://127.0.0.1:3100/exe/log?date=1649760928923&count=12&name=css&tel=13312941203
app.get('/exe/log', function(req, ress) {
    const query = url.parse(req.url, true).query;
    const date = moment(Number(query.date)).format('YYYY-MM-DD HH:mm:ss')
    const count = query.count;
    const name = query.name;
    let tel=query.tel;
    let telC=''
    let telText=fs.readFileSync('./log/tel.txt','utf-8').replace(/\n/g,'');
    let info="";
    if(telText){
        telC=','+'\n'+tel
    }else{
        telC=tel;
    }
    let telArr=telText.split(',')
    // console.log(telArr.length)
    // console.log(telArr)
    var phone_reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if(telArr.indexOf(tel)==-1&&phone_reg.test(tel)){
        // fs.appendFileSync('./log/tel.txt',telC)
    }else if(telArr.indexOf(tel)>-1){
        console.log(`手机号重复:${tel},导致不能填写问卷`)
        info=`,但是手机号重复:${tel},导致不能填写问卷`
    }else if(!phone_reg.test(tel)){
        console.log(`手机号格式:${tel},导致不能填写问卷`)
        info=`,但是手机号格式不对:${tel},导致不能填写问卷`
    }
    console.log(__dirname)
    fs.readFile(path.join(process.cwd(),'./log/log.txt'),'utf-8',(err,data)=>{
        console.log('读取文件：',data)
    })
    ress.json('成功！')
        // console.log(Number(query.date))
        // console.log(date)
        // console.log(count)
    const log = `${name}--在${date}提交了文件，第${count}个提交问卷的人${info}\n`;
    
    // fs.readFile('./log/log.txt', 'utf-8', (err, data) => {
    //         if (err) {
    //             // console.log('读取报错', err)
    //             ress.json('1错误')
    //         } else {
    //             // console.log(data)
    //             let newData = log + data
    //             fs.writeFile('./log/log.txt', newData, 'utf-8', function(err) {
    //                 if (err) {
    //                     // console.log(err)
    //                     ress.json('2错误')
    //                 } else {
    //                     console.log('写入成功！')
    //                     ress.json('记录成功！')
    //                 }
    //             })
    //         }

    //     })
        // res.json('成功')
})
app.listen(3100, function(res) {
    console.log('服务启动 http://127.0.0.1:3100')
})