var express = require('express')
var cookieParser = require('cookie-parser')
require('env2')('./.env');
const config = require('./config')
var index = require('./routes/index')
var group = require('./routes/group')
var admin = require('./routes/admin')
var path = require('path')
var http = require('http')
var bodyParser = require('body-parser')
var app = express()

app.set('trust proxy','loopback')

app.all('*',function (req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","POST,GET");
  res.header("X-Powered-By",' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

// 配置中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//分发路由到校友足迹
app.use('/api', index)
//分发路由到校友圈
app.use('/api', group)
//分发路由到管理员
app.use('/api', admin)
//静态文件处理
app.use('/static', express.static('static'));

// catch 404 and forward to error handler 处理404错误 并向下传递错误
app.use(function(req, res, next) {
  var err = new Error('一个不存在的页面');
  err.status = 404;
  next(err);
})

http.createServer(app).listen(config.PORT)
// https.createServer(options,app).listen(4000)
console.log('http server start, port:'+config.PORT);