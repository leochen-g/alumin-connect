var express = require('express')
var router = express.Router()
var control = require('../control/userControl')

//获取用户openid
router.post('/user/openid',async function (req,res) {
  control.getUserOpenid(req,res)
})
//获取用户位置接口
router.post('/user/getLocation',async function (req,res) {
  control.getUserLocation(req,res)
})
//更新用户基本信息（昵称，头像）
router.post('/user/updateUserBase',async function (req, res, next) {
  control.updateUserBaseInfo(req,res)
})
//更新用户设备信息
router.post('/user/updateUserDevice',async function (req,res) {
  control.updateUserDeviceInfo(req,res)
})
//更新用户学校
router.post('/user/updateUniversity',async function (req, res, next) {
    control.updateUserUniversity(req,res)
})
//获取用户信息
router.get('/user/info',async function (req,res) {
  control.getUserBaseInfo(req,res)
})

//学校模糊搜索接口
router.get('/user/getUniversity',async function (req,res) {
  control.getUniversity(req,res)
})
//获取学校分布数据
router.get('/user/getMapData',async function (req,res) {
  control.getMapData(req,res)
})
//获取学校总人数和分布城市数
router.get('/user/getUserAndLocation',async function (req,res) {
  control.getUserAndLocationCount(req,res)
})
module.exports = router

