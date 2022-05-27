@echo off
start cmd /k "cd /d e:\2022\霍家营街道\问卷\dingshi&&title 接口服务&&node app.js" 
start cmd /k "cd /d e:\2022\霍家营街道\问卷\dingshi&&title 页面服务&&python -m http.server 3500"
start cmd /k "cd /d e:\2022\霍家营街道\问卷\dingshi&&title 打开浏览器&&node openBrowser.js&&exit" 