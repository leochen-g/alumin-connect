/**
 * 校友圈子相关controller
 */
var uuid = require('uuid/v1')
var topicService = require('../service/topicLiked')
var groupService = require('../service/group')
module.exports = {
  // 获取轮播图
  getBannerList: async function (req, res) {
	var param = req.body
	var arr = [param.university]
	var result = await groupService.getBannerList(arr)
	res.send({head: {code: 0, msg: 'ok'}, data: {list: result}})
  },
  //添加话题
  addTopic: async function (req, res) {
	var param = req.body
	var arr = [param.openId, param.location, param.university, param.nickName, param.content]
	var results = await groupService.addTopic(arr)
	if (results) {
	  res.send({head: {code: 0, msg: 'ok'}, data: {}})
	} else {
	  res.send({head: {code: 10000, msg: '添加失败'}, data: {}})
	}
  },
  //删除话题
  deleteTopic: async function (req, res) {
	var param = req.body
	var arr = [param.id, param.openId]
	var results = await groupService.deleteTopic(arr)
	if (results) {
	  res.json({head: {code: 0, msg: 'ok'}, data: {}})
	} else {
	  res.json({head: {code: 10000, msg: '删除失败'}, data: {}})
	}
  },
  //获取话题列表
  getTopicList: async function (req, res) {
	var param = req.body
	var arr = [param.university, param.location, param.university, param.location, parseInt(param.start), parseInt(param.limit)]
	var results = await groupService.getTopicList(arr)
	res.json({
	  head: {code: 0, msg: 'ok'}, data: results
	})
  },
  //获取用户的话题列表
  getTopicListByUserId: async function (req, res) {
	var param = req.body
	var arr = [param.openId]
	var results = await groupService.getTopicListByUserId(arr)
	res.json({
	  head: {code: 0, msg: 'ok'}, data: {
		list: results
	  }
	})
  },
  //获取指定ID话题详情
  getTopicById: async function (req, res) {
	var param = req.body
	var arr = [param.id]
	var results = await groupService.getTopicById(arr)
	if (results == null) {
	  res.json({head: {code: 10000, msg: '此话题已删除'}, data: {}})
	} else {
	  res.json({head: {code: 0, msg: 'ok'}, data: results})
	}
  },
  // 举报话题
  postTipOffsTopic: async function (req, res) {
	var param = req.body
	var arr = [param.openId, param.topicId, param.type]
	var results = await groupService.addTipOffs(arr)
	if (results) {
	  res.send({head: {code: 0, msg: 'ok'}, data: {}})
	} else {
	  res.send({head: {code: 10000, msg: '举报失败'}, data: {}})
	}
  },
  //添加评论
  addComment: async function (req, res) {
	var param = req.body
	const cid = uuid().replace(/-/g, "")
	var arr = [param.openId, cid, param.topicId, param.content]
	var results = await groupService.addComment(arr)
	if (results) {
	  res.send({head: {code: 0, msg: 'ok'}, data: {}})
	} else {
	  res.send({head: {code: 10000, msg: '添加失败'}, data: {}})
	}
  },
  //获取话题评论列表
  getCommentList: async function (req, res) {
	var param = req.body
	var arr = [param.id, parseInt(param.start), parseInt(param.limit), param.id]
	var results = await groupService.getCommentList(arr)
	res.json({
	  head: {code: 0, msg: 'ok'}, data: results
	})
  },
  //获取指定评论ID的回复列表
  getReplyList: async function (req, res) {
	var param = req.body
	var arr = [param.cid, param.cid]
	console.log('参数', arr)
	var results = await groupService.getReplyListNoLimit(arr)
	res.json({
	  head: {code: 0, msg: 'ok'}, data: results
	})
  },
  //添加回复
  addReply: async function (req, res) {
	var param = req.body
	var arr = [param.openId, param.cid, param.replyId, param.replyType, param.content, param.toUid, param.topicId]
	var results = await groupService.addReply(arr)
	if (results) {
	  res.send({head: {code: 0, msg: 'ok'}, data: {}})
	} else {
	  res.send({head: {code: 10000, msg: '添加失败'}, data: {}})
	}
  },
  //删除回复
  deleteReply: async function (req, res) {
	var param = req.body
	var arr = [param.id, param.openId, param.topicId]
	var results = await groupService.deleteReply(arr)
	if (results) {
	  res.json({head: {code: 0, msg: 'ok'}, data: {}})
	} else {
	  res.json({head: {code: 10000, msg: '删除失败'}, data: {}})
	}
  },
  //获取用户基本信息
  getUserInfo: async function (req, res) {
	var param = req.body
	var arr = [param.openId]
	var results = await groupService.getAllUserInfo(arr)
	res.json({
	  head: {code: 0, msg: 'ok'}, data: results
	})
  },
  // 更新用户基本信息
  updateUserInfo: async function (req, res) {
	var param = req.body
	var arr = [param.type, param.value, param.openId]
	var results = await groupService.updateUserInfo(arr)
	if (results) {
	  res.json({head: {code: 0, msg: 'ok'}, data: {}})
	} else {
	  res.json({head: {code: 10000, msg: '修改失败'}, data: {}})
	}
  },
  // 用户点赞
  addLikedByTopicId: function (req, res, next) {
	var param = req.body
	if (param.liked) {
	  topicService.addTopicLiked(param.topicId, param.openId).then(function (result) {
		console.log('点赞成功', result)
		if (result) {
		  res.json({head: {code: 0, msg: 'ok'}, data: {}})
		}
	  })
	} else {
	  topicService.removeTopicLiked(param.topicId, param.openId).then(function (result) {
		console.log('取消点赞成功', result)
		if (res) {
		  res.json({head: {code: 0, msg: 'ok'}, data: {}})
		}
	  })
	}
  },
}
