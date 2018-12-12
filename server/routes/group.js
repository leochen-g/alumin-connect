//校友圈路由

var express = require('express')
var router = express.Router()
var control = require('../control/groupControl')
//校验参数是否为空
function isEmpty(body) {
  for (i in body){
	if(body[i]==''||body[i]==undefined||body==null)
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
//添加校友圈话题
router.post('/group/addTopic',function (req,res,next) {
  filter(req,res,control.addTopic)
})
//删除校友圈话题
router.post('/group/deleteTopic',function (req,res,next) {
  filter(req,res,control.deleteTopic)
})
//获取校友圈话题列表
router.post('/group/getTopicList',function (req,res,next) {
  filter(req,res,control.getTopicList)
})
//获取用户话题列表
router.post('/group/getTopicListByUserId',function (req,res,next) {
  filter(req,res,control.getTopicListByUserId)
})
//获取指定ID话题详情
router.post('/group/getTopicById',function (req,res,next) {
  filter(req,res,control.getTopicById)
})
//举报指定ID话题
router.post('/group/postTipOffsTopic',function (req,res,next) {
  filter(req,res,control.postTipOffsTopic)
})

//添加评论
router.post('/group/addComment',function (req,res,next) {
  filter(req,res,control.addComment)
})
//删除评论
router.post('/group/deleteComment',function (req,res,next) {
  filter(req,res,control.deleteComment)
})
//获取话题评论列表
router.post('/group/getCommentList',function (req,res,next) {
  filter(req,res,control.getCommentList)
})
//获取用户评论列表
router.post('/group/getCommentListByUserId',function (req,res,next) {
  filter(req,res,control.getCommentListByUserId)
})

//添加回复
router.post('/group/addReply',function (req,res,next) {
  filter(req,res,control.addReply)
})
//删除回复
router.post('/group/deleteReply',function (req,res,next) {
  filter(req,res,control.deleteReply)
})
//获取评论回复列表
router.post('/group/getReplyList',function (req,res,next) {
  filter(req,res,control.getReplyList)
})
//获取用户评论回复列表
router.post('/group/getReplyListByUserId',function (req,res,next) {
  filter(req,res,control.getReplyListByUserId)
})


//获取用户基本信息
router.post('/group/user/getUserInfo',function (req,res,next) {
  filter(req,res,control.getUserInfo)
})
//更新用户基础信息
router.post('/group/user/updateUserInfo',function (req,res,next) {
  filter(req,res,control.updateUserInfo)
})
//更新用户昵称
router.post('/group/user/updateUserNickName',function (req,res,next) {
  filter(req,res,control.updateUserNickName)
})
//更新用户联系方式
router.post('/group/user/updateUserContact',function (req,res,next) {
  filter(req,res,control.updateUserContact)
})
//更新用户学校信息
router.post('/group/user/updateUserSchoolInfo',function (req,res,next) {
  filter(req,res,control.updateUserSchoolInfo)
})
//更新用户职业信息
router.post('/group/user/updateUserCompanyInfo',function (req,res,next) {
  filter(req,res,control.updateUserCompanyInfo)
})

module.exports = router

