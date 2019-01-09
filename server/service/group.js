let sqlDao = require('../sql/sqlDao')
let topicService = require('./topicLiked')
let until = require('../until')

let groupService = {
  // 获取banner图
  getBannerList: async function (arr) {
	let publicBanner = this.getPublicBanner()
	let locationBanner = this.getLocationBanner([arr[0]])
	let universityBanner = this.getUniversityBanner([arr[1]])
	let list = []
	bannerp = await publicBanner
	bannerl = await locationBanner
	banneru = await universityBanner

	if (bannerp.length>0) {
	  list = list.concat(bannerp)
	}
	if (bannerl.length>0) {
	  list = list.concat(bannerl)
	}
	if (banneru.length>0) {
	  list = list.concat(banneru)
	}
	return list
  },
  // 获取公共banner图
  getPublicBanner: async function (arr) {
	return await sqlDao.group.getPublicBanner(arr)
  },
  // 获取基于位置的banner图
  getLocationBanner: async function (arr) {
	return await sqlDao.group.getLocationBanner(arr)
  },
  // 获取基于院校的banner图
  getUniversityBanner: async function (arr) {
	return await sqlDao.group.getUniversityBanner(arr)
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
	for (item of results[1]) {
	  let obj = {userInfo: {}};
	  obj.id = item.id
	  obj.content = item.content
	  obj.commentCount = item.commentCount
	  obj.updatedAt = item.updatedAt
	  obj.location = item.location
	  obj.userInfo ={
		avataUrl: item.avataUrl,
		college: item.college,
		graduationTime: item.graduationTime,
		location: item.location,
		major: item.major,
		nickName: item.nickName,
		openid: item.openId,
		university: item.university
	  }
	  likeCount =  topicService.getLikedCountByTid(item.id)
	  hasLiked =  topicService.hasUserLikedByTid(item.id,uid)
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
	for (item of results) {
	  let obj = {userInfo: {}};
	  obj.id = item.id
	  obj.content = item.content
	  obj.commentCount = item.commentCount
	  obj.updatedAt = item.updatedAt
	  obj.location = item.location
	  likeCount = topicService.getLikedCountByTid(item.id)
	  hasLiked = topicService.hasUserLikedByTid(item.id,arr[0])
	  obj.userInfo ={
		avataUrl: item.avataUrl,
		college: item.college,
		graduationTime: item.graduationTime,
		location: item.location,
		major: item.major,
		nickName: item.nickName,
		openid: item.openId,
		university: item.university
	  }
	  obj.likeCount = await likeCount
	  obj.hasLiked = await hasLiked===null?false:true
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
	  obj.id = item.id
	  obj.content = item.content
	  obj.commentCount = item.commentCount
	  obj.likeCount = item.likeCount
	  obj.updatedAt = item.updatedAt
	  obj.location = item.location
	  obj.userInfo ={
		avataUrl: item.avataUrl,
		college: item.college,
		graduationTime: item.graduationTime,
		location: item.location,
		major: item.major,
		nickName: item.nickName,
		openid: item.openId,
		university: item.university
	  }
	  likeCount = topicService.getLikedCountByTid(item.id)
	  hasLiked =  topicService.hasUserLikedByTid(item.id,uid)
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
	for (item of commentList[0]) {
	  var com = {topComment: []};
	  com.id = item.id
	  com.cid = item.cid
	  com.content = item.content
	  com.topicId = item.topicId
	  com.updatedAt = item.updatedAt
	  com.userInfo ={
		avataUrl: item.avataUrl,
		college: item.college,
		graduationTime: item.graduationTime,
		location: item.location,
		major: item.major,
		nickName: item.nickName,
		openid: item.openId,
		university: item.university
	  }
	  com.replyCount = item.replyCount
	  reply = await topicService.getReplyList(item.cid)
	  if (reply.length){
	    console.log('取redis')
		com.topComment =  reply.map(function (current,index) {
		  return JSON.parse(current)
		})
	  }else {
		console.log('查mysql')
	    replyList = await this.getReplyList([item.cid,item.cid])
		com.topComment = replyList.list
		if(com.topComment.length){
		  console.log('更新到redis')
		  topicService.addReplyObj(com.topComment[1].cid,JSON.stringify(com.topComment[1]))
		  topicService.addReplyObj(com.topComment[0].cid,JSON.stringify(com.topComment[0]))
		}
	  }
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
	for (item of results[1]) {
	  let ite = item
	  let replyObj = {}
	  replyObj.id = ite.id
	  replyObj.replyId = ite.replyId
	  replyObj.replyType = ite.replyType
	  replyObj.cid = ite.cid
	  replyObj.content = ite.content
	  replyObj.respUserInfo = {
	    nickName: ite.toNickName,
		openid: ite.toUid
	  }
	  replyObj.userInfo = {
		avataUrl: ite.avataUrl,
		college: ite.college,
		graduationTime: ite.graduationTime,
		location: ite.location,
		major: ite.major,
		nickName: ite.nickName,
		openid: ite.openId,
		university: ite.university
	  }
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
	for (item of results[1]) {
	  let ite = item
	  let replyObj = {}
	  replyObj.id = ite.id
	  replyObj.reply_id = ite.replyId
	  replyObj.reply_type = ite.replyType
	  replyObj.cid = ite.cid
	  replyObj.content = ite.content
	  replyObj.respUserId = ite.replyId
	  replyObj.userId = ite.toUid
	  replyObj.respUserInfo = {
		nickName: ite.toNickName,
		openid: ite.toUid
	  }
	  replyObj.userInfo = {
		avataUrl: ite.avataUrl,
		college: ite.college,
		graduationTime: ite.graduationTime,
		location: ite.location,
		major: ite.major,
		nickName: ite.toNickName,
		openid: ite.openId,
		university: ite.university
	  }
	  obj.topComment.push(replyObj)
	}
	return obj
  },
  // 添加回复
  addReply: async function (arr) {
	let results = await sqlDao.group.addReply(arr)
	if(results.affectedRows) {
	  sqlDao.group.updateReplyCount(arr[1]) // 评论的回复数加1
	  sqlDao.group.updateCommentCount([arr[7]]) // 评论数加1
	  return results.insertId
	}else {
	  return false
	}
  },
  // 获取指定Id的回复详情
  getReplyById: async function (arr) {
    let results = await sqlDao.group.getReplyById(arr)
	ite = results[0]
	let replyObj = {}
	replyObj.id = ite.id
	replyObj.reply_id = ite.replyId
	replyObj.reply_type = ite.replyType
	replyObj.cid = ite.cid
	replyObj.content = ite.content
	replyObj.respUserId = ite.replyId
	replyObj.userId = ite.toUid
	replyObj.respUserInfo = {
	  nickName: ite.toNickName,
	  openid: ite.toUid
	}
	replyObj.userInfo = {
	  avataUrl: ite.avataUrl,
	  college: ite.college,
	  graduationTime: ite.graduationTime,
	  location: ite.location,
	  major: ite.major,
	  nickName: ite.nickName,
	  openid: ite.openId,
	  university: ite.university
	}
	return replyObj
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
  // 获取用户未读消息数
  getUnReadMessageCount: async function (arr) {
    let result = await sqlDao.group.user.getUnReadMessageCount(arr)
	return {count: result[0].count}
  },
  //获取用户消息通知
  getUserMessage: async function (arr) {
	let result = await sqlDao.group.user.getUserMessage(arr)
	let list = []
	for (item of  result) {
	  let msg = {}
	  var ite = item
	  msg.id = ite.id
	  msg.updateAt = ite.updatedAt
	  msg.contentType = ite.contentType
	  msg.flag = ite.flag
	  msg.topicInfo = {
		id:ite.topicId,
		content:ite.content,
		flag:ite.topicFlag
	  }
	  msg.producer ={
	    openId: ite.producer,
	    nickName:ite.nickName,
		avataUrl:ite.avataUrl
	  }
	  list.push(msg)
	}
	return {list: list}
  },
  //获取系统通知
  getSystemMessage: async function (arr) {
    let result =  await sqlDao.group.user.getSystemMessage(arr)
	let list = []
	for (item in  result[1]) {
	  let msg = {}
	  var ite = result[1][item]
	  msg.id = ite.id
	  msg.type = ite.type
	  msg.imgSrc = ite.thumbnailUrl
	  msg.title = ite.title
	  msg.detail = ite.detail
	  msg.updatedAt = ite.updatedAt
	  msg.flag = ite.flag
	  list.push(msg)
	}
	return {count: result[0][0].count, list: list}
  },
  // 标记消息已读
  readMessage: async function (arr) {
    console.log('已读',arr)
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
	let start = new Date()
	let results = await sqlDao.group.user.getUserInfo(arr)
	let end = new Date()
	console.log('用户信息查询耗时', end.getTime()-start.getTime())
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
