var express = require('express')
var cookieParser = require('cookie-parser')
var index = require('./routes/index')
var path = require('path')
var https = require('https')
var fs = require('fs')
var http = require('http')
var bodyParser = require('body-parser')

var options = {
  key: fs.readFileSync('./https/chain/private.key'),
  cert: fs.readFileSync('./https/chain/full_chain.pem')
}
var app = express()

app.set('trust proxy','loopback')

app.all('*',function (req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

// 配置中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//引用路由
app.use('/api', index)

// catch 404 and forward to error handler 处理404错误 并向下传递错误
app.use(function(req, res, next) {
  var err = new Error('一个不存在的页面');
  err.status = 404;
  next(err);
})

http.createServer(app).listen(3000)
https.createServer(options,app).listen(4000)
console.log('http server start, port:3000');
console.log('http server start, port:4000');