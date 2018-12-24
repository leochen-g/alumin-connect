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
	  obj.id = item.id
	  obj.content = item.content
	  obj.commentCount = item.commentCount
	  obj.updatedAt = item.updatedAt
	  obj.location = item.location
	  userInfo = this.getUserBaseInfo([item.openId])
	  likeCount =  topicService.getLikedCountByTid(item.id)
	  hasLiked =  topicService.hasUserLikedByTid(item.id,uid)
	  obj.userInfo = await userInfo
	  obj.likeCount = await likeCount
	  obj.hasLiked = await hasLiked===null?false:true
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
	  let userInfo,likeCount,hasLiked
	  obj.id = item.id
	  obj.content = item.content
	  obj.commentCount = item.commentCount
	  obj.updatedAt = item.updatedAt
	  obj.location = item.location
	  likeCount = topicService.getLikedCountByTid(item.id)
	  hasLiked = topicService.hasUserLikedByTid(item.id,arr[0])
	  userInfo = this.getUserBaseInfo([item.openId])
	  obj.likeCount = await likeCount
	  obj.hasLiked = await hasLiked===null?false:true
	  obj.userInfo = await userInfo
	  list.push(obj)
	}
	return list
  },
  // 获取指定ID话题详情
  getTopicById: async function (arr,uid) {
	let results = await sqlDao.group.getTopicById(arr)
	if (results.length > 0) {
	  let obj = {userInfo: {}};
	  let userInfo,likeCount,hasLiked
	  var item = results[0]
	  obj.id = item.id
	  obj.content = item.content
	  obj.commentCount = item.commentCount
	  obj.likeCount = item.likeCount
	  obj.updatedAt = item.updatedAt
	  obj.location = item.location
	  userInfo = this.getUserBaseInfo([item.openId])
	  likeCount = topicService.getLikedCountByTid(item.id)
	  hasLiked =  topicService.hasUserLikedByTid(item.id,uid)
	  obj.userInfo = await userInfo
	  obj.likeCount = await likeCount
	  obj.hasLiked = await hasLiked===null?false:true
	  return obj
	} else {
	  return null
	}
  },
  //获取简单的话题详情
  getSimpleTopicInfo: async function (arr) {
	let results = await sqlDao.group.getTopicById(arr)
	return results[0]
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
	  let userInfo,reply
	  item = commentList[0][item]
	  com.id = item.id
	  com.cid = item.cid
	  com.content = item.content
	  com.topicId = item.topicId
	  com.updatedAt = item.updatedAt
	  userInfo = this.getUserBaseInfo([item.openId])
	  reply = this.getReplyList([item.cid, item.cid])
	  replyObj = await reply
	  com.userInfo = await userInfo
	  com.replyCount = replyObj.count
	  com.topComment =  replyObj.list
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
  checkLikedMessage: async function(arr) {
    return await  sqlDao.group.user.checkLikedMessage(arr)
  },
  //添加用户消息
  addUserMessage: async function (arr) {
	let result = await sqlDao.group.user.addUserMessage(arr)
	return result.affectedRows
  },
  //获取用户通知
  getUserMessage: async function (arr) {
	let result = await sqlDao.group.user.getUserMessage(arr)
	let list = []
	let time1 = new Date()
	for (item in  result[1]) {
	  let msg = {}
	  var ite = result[1][item]
	  msg.id = ite.id
	  msg.updateAt = ite.updatedAt
	  msg.contentType = ite.contentType
	  msg.flag = ite.flag
	  producer = this.getUserBaseInfo(ite.producer)
	  topicInfo = this.getTopicById(ite.topicId)
	  msg.producer = await producer
	  msg.topicInfo = await topicInfo
	  list.push(msg)
	}
	let time2 = new Date()
	console.log('耗时',time2.getTime()-time1.getTime())
	return {count: result[0][0].count, list: list}
  },
  //获取系统通知
  getSystemMessage: async function (arr) {
    let result =  await sqlDao.group.user.getSystemMessage(arr)
	let list = []
	for (item in  result[1]) {
	  let msg = {}
	  var ite = result[1][item]
	  msg.id = ite.id
	  msg.updateAt = ite.updatedAt
	  msg.contentType = ite.contentType
	  msg.content = ite.content
	  msg.flag = ite.flag
	  msg.imgSrc = ite.imgSrc
	  msg.detail = ite.detail
	  list.push(msg)
	}
	return {count: result[0][0].count, list: list}
  },
  // 标记消息已读
  readMessage: async function (arr) {
    let result = await sqlDao.group.user.readMessage(arr)
	return result.affectedRows
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
	  wechat: results[0].wechat,
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
    let results = await sqlDao.group.user.updateUserInfo(arr)
	return results.affectedRows
  }
}

module.exports = groupService
