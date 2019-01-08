var express = require('express')
var cookieParser = require('cookie-parser')
require('env2')('./.env');
const config = require('./config')
var user = require('./routes/user')
var group = require('./routes/group')
var admin = require('./routes/admin')
var path = require('path')
var http = require('http')
var bodyParser = require('body-parser')
var app = express()
var jwt = require('./until/token')
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
app.use('/api', user)
//分发路由到管理员
app.use('/api', admin)
//静态文件处理
app.use('/static', express.static('static'));
//token验证
app.use(function (req,res,next) {
  var token = req.body.token || req.query.token || req.headers['authorization']
  var openId = req.body.openId
  var auth =  jwt.verifyToken(token,openId)
  console.log(req.path)
  if(auth || (req.path.indexOf('static')>-1)){
    next()
  }else {
    res.json({head:{code: 401, msg: '身份验证失败'}, data: {}})
  }
})
//分发路由到校友圈
app.use('/api', group)
// catch 404 and forward to error handler 处理404错误 并向下传递错误
app.use(function(req, res, next) {
  var err = new Error('一个不存在的页面');
  err.status = 404;
  next(err);
})

http.createServer(app).listen(config.PORT)
// https.createServer(options,app).listen(4000)
console.log('http server start, port:'+config.PORT);