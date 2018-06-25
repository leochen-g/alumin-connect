var express = require('express')
var router = express.Router()
var control = require('../control/userControl')

//获取用户openid
router.post('/user/openid',function (req,res,next) {
  control.getUserOpenid(req,res,next)
})
//保存用户基本信息
router.post('/user/save',function (req, res, next) {
  control.saveUserInfo(req,res,next)
})
//更新用户基本信息接口保存用户位置
router.post('/user/update',function (req, res, next) {
  control.updateUserInfo(req,res,next)
})
//更新用户学校
router.post('/user/updateUniversity',function (req, res, next) {
    control.updateUserUniversity(req,res,next)
})
//获取用户信息
router.get('/user/info',function (req,res,next) {
  control.getUserBaseInfo(req,res,next)
})
//获取用户位置接口
router.get('/user/getLocation',function (req,res,next) {
  control.getUserLocation(req,res,next)
})
//学校模糊搜索接口
router.get('/user/getUniversity',function (req,res,next) {
  control.getUniversity(req,res,next)
})
//获取学校分布数据
router.post('/user/getMapData',function (req,res,next) {
  control.getMapData(req,res,next)
})
module.exports = router

