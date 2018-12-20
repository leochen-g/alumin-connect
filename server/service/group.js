let sqlDao = require('../sql/sqlDao')
let topicService = require('./topicLiked')
let until = require('../until')

let groupService = {
  // 获取banner图
  getBannerList: async function (arr) {
	let results = await sqlDao.group.getBannerList(arr)
	let list = []
	if (results[1].length > 0) {
	  list.push(results[0][0])
	  list = list.concat(results[1])
	} else {
	  list.push(results[0][0])
	}
	return list
  },
  // 添加话题
  addTopic: async function (arr) {
	let results = await  sqlDao.group.addTopic(arr)
	return results.affectedRows
  },
  // 删除话题
  deleteTopic: async function (arr) {
	let results = await sqlDao.group.deleteTopic(arr)
	return results.affectedRows
  },
  // 获取话题列表
  getTopicList: async function (arr,uid) {
	let results = await sqlDao.group.getTopicList(arr)
	let res = {}
	let list = []
	let count = results[0][0].count
	for (item in results[1]) {
	  item = results[1][item]
	  let obj = {userInfo: {}};
	  obj.userInfo = await this.getUserBaseInfo([item.openId])
	  obj.id = item.id
	  obj.content = item.content
	  obj.commentCount = item.commentCount
	  obj.likeCount = await topicService.getLikedCountByTid(item.id)
	  obj.updatedAt = item.updatedAt
	  obj.location = item.location
	  obj.hasLiked = await topicService.hasUserLikedByTid(item.id,uid)===null?false:true
	  list.push(obj)
	}
	res.count = count
	res.list = list
	return res
  },
  //获取用户的话题列表
  getTopicListByUserId: async function (arr) {
	let results = await  sqlDao.group.getTopicListByUserId(arr)
	let list = []
	for (item in results) {
	  item = results[item]
	  let obj = {userInfo: {}};
	  obj.userInfo = await this.getUserBaseInfo([item.openId])
	  obj.id = item.id
	  obj.content = item.content
	  obj.likeCount = await topicService.getLikedCountByTid(item.id)
	  obj.hasLiked = await topicService.hasUserLikedByTid(item.id,arr[0])===null?false:true
	  obj.commentCount = item.commentCount
	  obj.updatedAt = item.updatedAt
	  obj.location = item.location
	  list.push(obj)
	}
	return list
  },
  // 获取指定ID话题详情
  getTopicById: async function (arr,uid) {
	let results = await sqlDao.group.getTopicById(arr)
	if (results.length > 0) {
	  let obj = {userInfo: {}};
	  var item = results[0]
	  obj.userInfo = await this.getUserBaseInfo([item.openId])
	  obj.id = item.id
	  obj.content = item.content
	  obj.likeCount = await topicService.getLikedCountByTid(item.id)
	  obj.hasLiked = await topicService.hasUserLikedByTid(item.id,uid)===null?false:true
	  obj.commentCount = item.commentCount
	  obj.likeCount = item.likeCount
	  obj.updatedAt = item.updatedAt
	  obj.location = item.location
	  return obj
	} else {
	  return null
	}
  },
  // 举报话题
  addTipOffs: async function (arr) {
	let results = await sqlDao.group.addTipOffs(arr)
	return results.affectedRows
  },
  // 添加评论
  addComment: async function (arr) {
	let results = await sqlDao.group.addComment(arr)
	if (results.affectedRows) {
	  let res = await sqlDao.group.updateCommentCount([arr[2]])
	  return res.affectedRows
	} else {
	  return false
	}
  },
  // 获取评论列表
  getCommentList: async function (arr) {
	let commentList = await sqlDao.group.getCommentList(arr)
	let obj = {
	  targetId: arr[0],
	  count: commentList[1][0].count,
	  comments: []
	}
	for (item in commentList[0]) {
	  var com = {topComment: []};
	  item = commentList[0][item]
	  com.id = item.id
	  com.cid = item.cid
	  com.content = item.content
	  com.topicId = item.topicId
	  com.updatedAt = item.updatedAt
	  com.userInfo = await this.getUserBaseInfo([item.openId])
	  let reply = await this.getReplyList([item.cid, item.cid])
	  com.replyCount = reply.count
	  com.topComment = reply.list
	  obj.comments.push(com)
	}
	return obj
  },
  // 获取回复列表带分页
  getReplyList: async function (arr) {
	let results = await sqlDao.group.getReplyList(arr)
	var obj = {
	  count: results[0][0].count,
	  list: []
	}
	for (item in results[1]) {
	  let ite = results[1][item]
	  let replyObj = {}
	  replyObj.id = ite.id
	  replyObj.reply_id = ite.replyId
	  replyObj.reply_type = ite.replyType
	  replyObj.cid = ite.cid
	  replyObj.content = ite.content
	  replyObj.respUserId = ite.replyId
	  replyObj.userId = ite.toUid
	  replyObj.respUserInfo = await this.getUserBaseInfo([ite.toUid])
	  replyObj.userInfo = await this.getUserBaseInfo([ite.openId])
	  obj.list.push(replyObj)
	}
	return obj
  },
  // 获取回复列表无分页
  getReplyListNoLimit: async function (arr) {
	let results = await sqlDao.group.getReplyListNoLimit(arr)
	var obj = {
	  count: results[0][0].count,
	  topComment: []
	}
	for (item in results[1]) {
	  let ite = results[1][item]
	  let replyObj = {}
	  replyObj.id = ite.id
	  replyObj.reply_id = ite.replyId
	  replyObj.reply_type = ite.replyType
	  replyObj.cid = ite.cid
	  replyObj.content = ite.content
	  replyObj.respUserId = ite.replyId
	  replyObj.userId = ite.toUid
	  replyObj.respUserInfo = await this.getUserBaseInfo([ite.toUid])
	  replyObj.userInfo = await this.getUserBaseInfo([ite.openId])
	  obj.topComment.push(replyObj)
	}
	return obj
  },
  // 添加回复
  addReply: async function (arr) {
	let results = await sqlDao.group.addReply(arr)
	if(results.affectedRows) {
	  let res = await sqlDao.group.updateCommentCount([arr[6]]) // 评论数加1
	  return res.affectedRows
	}else {
	  return false
	}
  },
  // 删除回复
  deleteReply: async function (arr) {
    let results = await group.deleteReply(arr)
	if(results.affectedRows){
      let res = await  sqlDao.group.reduceCommentCount(arr[2]) //评论数减1
	  return res.affectedRows
	}else {
      return false
	}
  },
  //点赞
  addLike: async function(arr) {
    return await topicService.addTopicLiked(arr[0], arr[1])
  },
  //取消点赞
  removeLiked: async function(arr) {
	return await topicService.removeTopicLiked(arr[0], arr[1])
  },
  // 获取用户所有信息
  getAllUserInfo: async function (arr) {
	let results = await sqlDao.group.user.getUserInfo(arr)
	return {
	  openId: results[0].openid,
	  nickName: results[0].nickName,
	  gender: results[0].gender,
	  location: results[0].location,
	  avataUrl: results[0].avataUrl,
	  phone: results[0].phone,
	  company: results[0].company,
	  job: results[0].job,
	  school: {
		university: results[0].university,
		graduationTime: results[0].graduationTime,
		college: results[0].college,
		major: results[0].major,
	  }
	}
  },
  // 获取基础信息，不含敏感信息
  getUserBaseInfo: async function (arr) {
	let results = await sqlDao.group.user.getUserInfo(arr)
	if (results[0]) {
	  delete  results[0].phone
	  delete  results[0].gender
	  delete  results[0].company
	  delete  results[0].job
	  return results[0]
	} else {
	  return {}
	}
  },
  // 更新用户基础信息
  updateUserInfo: async function (arr) {
    let results = await group.user.updateUserInfo(arr)
	return results.affectedRows
  }
}

module.exports = groupService
