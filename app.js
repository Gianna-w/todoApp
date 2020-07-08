var express = require('express');
var mongoose = require('mongoose')
//引入自定义模块
var todoController = require('./controller/todoController');
var app = express();

//设置模板引擎为ejs
app.set('view engine','ejs');

app.use(express.static('./public'));

todoController(app);


//连接数据库
mongoose.connect('mongodb://localhost:27019/todoapp',function(err){
    if(err){
        console.log('数据库连接失败！');
    }else{
        console.log("数据库连接成功！");
        app.listen(3000);
        console.log('Server is running...');
    }
});