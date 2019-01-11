//校友圈路由

var express = require('express')
var router = express.Router()
var control = require('../control/groupControl')
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
	res.json({head: {code: 10001, msg: '缺少参数'}, data: {}})
  }else {
	callback&&callback(req,res)
  }
}
//获取banner图
router.post('/group/getBannerList',function (req,res,next) {
  filter(req,res,control.getBannerList)
})
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

//点赞
router.post('/group/addLiked',function (req,res,next) {
  filter(req,res,control.addLikedByTopicId)
})
//获取用户未读消息数
router.post('/group/user/getUserUnReadMessageCount',function (req,res,next) {
  filter(req,res,control.getUserUnReadMessageCount)
})
//获取用户通知
router.post('/group/user/getUserMessage',function (req,res,next) {
  filter(req,res,control.getUserMessage)
})
//获取系统通知
router.post('/group/user/getSystemMessage',function (req,res,next) {
  filter(req,res,control.getSystemMessage)
})
//系统通知添加阅读数
router.post('/group/user/systemMessageRead',function (req,res,next) {
  filter(req,res,control.systemMessageRead)
})
//已读通知
router.post('/group/user/readMessage',function (req,res,next) {
  filter(req,res,control.readMessage)
})
//获取用户基本信息
router.post('/group/user/getUserInfo',function (req,res,next) {
  filter(req,res,control.getUserInfo)
})
//获取用户基本信息
router.post('/group/user/getSelectUserInfo',function (req,res,next) {
  filter(req,res,control.getSelectUserInfo)
})
//更新用户基础信息
router.post('/group/user/updateUserInfo',function (req,res,next) {
  filter(req,res,control.updateUserInfo)
})

module.exports = router

