var express = require('express')
var router = express.Router()
var control = require('../control/userControl')

//获取用户openid
router.post('/user/openid',function (req,res,next) {
  control.getUserOpenid(req,res,next)
})
//获取用户位置接口
router.post('/user/getLocation',function (req,res,next) {
  control.getUserLocation(req,res,next)
})
//更新用户基本信息（昵称，头像）
router.post('/user/updateUserBase',function (req, res, next) {
  control.updateUserBaseInfo(req,res,next)
})
//更新用户学校
router.post('/user/updateUniversity',function (req, res, next) {
    control.updateUserUniversity(req,res,next)
})
//获取用户信息
router.get('/user/info',function (req,res,next) {
  control.getUserBaseInfo(req,res,next)
})

//学校模糊搜索接口
router.get('/user/getUniversity',function (req,res,next) {
  control.getUniversity(req,res,next)
})
//获取学校分布数据
router.get('/user/getMapData',function (req,res,next) {
  control.getMapData(req,res,next)
})
module.exports = router

