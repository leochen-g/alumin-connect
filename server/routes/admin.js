//管理员校友圈路由
var express = require('express')
var router = express.Router()
var control = require('../control/adminControl')
//校验参数是否为空
function isEmpty(body) {
  for (i in body){
	if(body[i]===''||body[i]===undefined||body[i]===null||body==null)
	  return true
  }
  return false
}
function filter(req,res,callback) {
  if(isEmpty(req.body)){
	res.json({head: {code: 10000, msg: '缺少必须的参数'}, data: {}})
  }else {
	callback&&callback(req,res)
  }
}
//获取举报的话题
router.post('/admin/topic/getTipOffs',function (req,res,next) {
  filter(req,res,control.getTipOffs)
})
//添加系统通知
router.post('/admin/topic/addSystemMessage',function (req,res,next) {
  filter(req,res,control.addSystemMessage)
})
//添加大学图标
router.post('/admin/addUniversityLogo',function (req,res,next) {
  filter(req,res,control.addUniversityLogo)
})
module.exports = router