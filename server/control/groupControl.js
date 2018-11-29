/**
 * 校友圈子相关controller
 */
var sqlControl = require('../sql/sqlController')
//获取当前时间，格式yyyy-MM-dd HH:MM:SS
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
	month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
	strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	  + " " + date.getHours() + seperator2 + date.getMinutes()
	  + seperator2 + date.getSeconds();
  return currentdate;
}
module.exports = {
  //添加话题
  addTopic: function (req, res, next) {
	var param = req.body
	var createdAt = getNowFormatDate()
	var arr = [param.openId, param.location, param.university, param.nickName, param.content, createdAt]
	sqlControl.group.addTopic(arr, function (results, fields) {
	  if (results.affectedRows) {
		res.send({head: {code: 0, msg: 'ok'}, data: {}})
	  } else {
		res.send({head: {code: 10000, msg: '添加失败'}, data: {}})
	  }
	})
  },
  //删除话题
  deleteTopic: function (req, res, next) {
	var param = req.body
	var arr = [param.id,param.openId]
	sqlControl.group.deleteTopic(arr, function (results, fields) {
	  if (results.affectedRows) {
		res.json({head: {code: 0, msg: 'ok'}, data: {}})
	  } else {
		res.json({head: {code: 10000, msg: '删除失败'}, data: {}})
	  }
	})
  },
  //更新话题
  updateTopic: function (req, res, next) {
	var param = req.body
	var createdTime = new Date()
	var arr = [param.openid, param.university, param.nickName, param.content, createdTime]
	sqlControl.group.updateTopic(arr, function (results, fields) {
	  if (results.affectedRows) {
		res.json({head: {code: 0, msg: 'ok'}, data: {}})
	  } else {
		res.json({head: {code: 10000, msg: '更新失败'}, data: {}})
	  }
	})
  },
  //获取话题列表
  getTopicList: function (req, res, next) {
	var param = req.body
	var arr = [param.university,param.location]
	sqlControl.group.getTopicList(arr, function (results, fields) {
	  var arr = []
	  for(i in results){
	    var obj = {user:{}}
		obj.id=results[i].id
		obj.content=results[i].content
		obj.commentCount=results[i].commentCount
		obj.likeCount=results[i].likeCount
		obj.createdAt=results[i].createdAt
		obj.location=results[i].location
	    obj.user.openId = results[i].openId
	    obj.user.nickName = results[i].nickName
	    obj.user.location = results[i].userLocation
	    obj.user.uinversity = results[i].university
	    obj.user.gender = results[i].gender
	    obj.user.avataUrl = results[i].avataUrl
	    obj.user.college = results[i].college
	    obj.user.major = results[i].major
		arr.push(obj)
	  }
	  res.json({
		head: {code: 0, msg: 'ok'}, data: {
		  university: param.university,
		  list: arr,
		}
	  })
	})
  },
  //获取用户的话题列表
  getTopicListByUserId: function (req, res, next) {
	var param = req.body
	var arr = [param.openId]
	sqlControl.group.getTopicListByUserId(arr, function (results, fields) {
	  var arr = []
	  for(i in results){
		var obj = {user:{}}
		obj.id=results[i].id
		obj.content=results[i].content
		obj.commentCount=results[i].commentCount
		obj.likeCount=results[i].likeCount
		obj.createdAt=results[i].createdAt
		obj.location=results[i].location
		obj.user.openId = results[i].openId
		obj.user.nickName = results[i].nickName
		obj.user.location = results[i].userLocation
		obj.user.uinversity = results[i].university
		obj.user.gender = results[i].gender
		obj.user.avataUrl = results[i].avataUrl
		obj.user.college = results[i].college
		obj.user.major = results[i].major
		arr.push(obj)
	  }
	  res.json({
		head: {code: 0, msg: 'ok'}, data: {
		  list: arr,
		}
	  })
	})
  },
  //获取指定ID话题详情
  getTopicById: function (req, res, next) {
	var param = req.body
	var arr = [param.id]
	sqlControl.group.getTopicById(arr, function (results, fields) {
	  if(results.length>0){
		var arr = []
		for(i in results){
		  var obj = {user:{}}
		  obj.id=results[i].id
		  obj.content=results[i].content
		  obj.commentCount=results[i].commentCount
		  obj.likeCount=results[i].likeCount
		  obj.createdAt=results[i].createdAt
		  obj.location=results[i].location
		  obj.user.openId = results[i].openId
		  obj.user.nickName = results[i].nickName
		  obj.user.location = results[i].userLocation
		  obj.user.uinversity = results[i].university
		  obj.user.gender = results[i].gender
		  obj.user.avataUrl = results[i].avataUrl
		  obj.user.college = results[i].college
		  obj.user.major = results[i].major
		  arr.push(obj)
		}
		res.json({
		  head: {code: 0, msg: 'ok'}, data: arr[0]
		})
	  }else {
		res.json({
		  head: {code: 10000, msg: '此话题已删除'}, data: {}
		})
	  }
	})
  },
  //添加评论
  addComment: function (req, res, next) {
	var param = req.body
	var createdAt = getNowFormatDate()
	var arr = [param.openId, param.topicId, param.content, createdAt]
	sqlControl.group.addComment(arr, function (results, fields) {
	  if (results.affectedRows) {
		sqlControl.group.updateCommentCount([param.topicId],function (results,fiels) {
		  if (results.affectedRows) {
			res.send({head: {code: 0, msg: 'ok'}, data: {}})
		  }
		})
	  } else {
		res.send({head: {code: 10000, msg: '添加失败'}, data: {}})
	  }
	})
  },
  //删除评论
  deleteComment: function (req, res, next) {
	var param = req.body
	var arr = [param.id,param.openId]
	sqlControl.group.deleteComment(arr, function (results, fields) {
	  if (results.affectedRows) {
		res.json({head: {code: 0, msg: 'ok'}, data: {}})
	  } else {
		res.json({head: {code: 10000, msg: '删除失败'}, data: {}})
	  }
	})
  },
  //更新评论
  updateComment: function (req, res, next) {
	var param = req.body
	var createdTime = new Date()
	var arr = [param.openid, param.university, param.nickName, param.content, createdTime]
	sqlControl.group.updateComment(arr, function (results, fields) {
	  if (results.affectedRows) {
		res.json({head: {code: 0, msg: 'ok'}, data: {}})
	  } else {
		res.json({head: {code: 10000, msg: '更新失败'}, data: {}})
	  }
	})
  },
  //获取话题评论列表
  getCommentList: function (req, res, next) {
	var param = req.body
	var arr = [param.id]
	sqlControl.group.getCommentList(arr, function (results, fields) {
	  var arr = []
	  for(i in results){
		var obj = {user:{}}
		obj.id=results[i].id
		obj.content=results[i].content
		obj.topicId=results[i].topicId
		obj.createdAt=results[i].createdAt
		obj.user.openId = results[i].openId
		obj.user.nickName = results[i].nickName
		obj.user.location = results[i].location
		obj.user.uinversity = results[i].university
		obj.user.gender = results[i].gender
		obj.user.avataUrl = results[i].avataUrl
		obj.user.college = results[i].college
		obj.user.major = results[i].major
		arr.push(obj)
	  }
	  res.json({
		head: {code: 0, msg: 'ok'}, data: {
		  list: arr,
		}
	  })
	})
  },
  //获取用户评论列表
  getCommentListByUserId: function (req, res, next) {
	var param = req.body
	var arr = [param.openId]
	sqlControl.group.getCommentListByUserId(arr, function (results, fields) {
	  var arr = []
	  for(i in results){
		var obj = {user:{}}
		obj.id=results[i].id
		obj.content=results[i].content
		obj.topicId=results[i].topicId
		obj.createdAt=results[i].createdAt
		obj.user.openId = results[i].openId
		obj.user.nickName = results[i].nickName
		obj.user.location = results[i].location
		obj.user.uinversity = results[i].university
		obj.user.gender = results[i].gender
		obj.user.avataUrl = results[i].avataUrl
		obj.user.college = results[i].college
		obj.user.major = results[i].major
		arr.push(obj)
	  }
	  res.json({
		head: {code: 0, msg: 'ok'}, data: {
		  list: arr,
		}
	  })
	})
  },
  //获取用户基本信息
  getUserInfo: function (req, res, next) {
	var param = req.body
	var arr = [param.openId]
	sqlControl.group.user.getUserInfo(arr, function (results, fields) {
	  	var obj = {
	  	  openId:results[0].openid,
		  nickName:results[0].nickName,
		  gender:results[0].gender,
		  location:results[0].location,
	      avataUrl:results[0].avataUrl,
	      phone:results[0].phone,
	      company:results[0].company,
	      job:results[0].job,
		  school:{
			university:results[0].university,
			graduationTime:results[0].graduationTime,
			college:results[0].college,
			major:results[0].major,
		  }
		}
	  res.json({
		head: {code: 0, msg: 'ok'}, data: obj
	  })
	})
  },
  //更新用户昵称
  updateUserNickName:function (req,res,next) {
	var param = req.body
	var arr = [param.nickName,param.openId]
	sqlControl.group.user.updateUserNickName(arr, function (results, fields) {
	  if (results.affectedRows) {
		res.json({head: {code: 0, msg: 'ok'}, data: {}})
	  } else {
		res.json({head: {code: 10000, msg: '修改失败'}, data: {}})
	  }
	})
  },
  //更新用户联系方式
  updateUserContact:function (req,res,next) {
	var param = req.body
	var arr = [param.phone,param.openId]
	sqlControl.group.user.updateUserContact(arr, function (results, fields) {
	  if (results.affectedRows) {
		res.json({head: {code: 0, msg: 'ok'}, data: {}})
	  } else {
		res.json({head: {code: 10000, msg: '修改失败'}, data: {}})
	  }
	})
  },
  //更新用户学校信息
  updateUserSchoolInfo:function (req,res,next) {
	var param = req.body
	var arr = [param.university,param.graduationTime,param.college,param.major,param.openId]
	sqlControl.group.user.updateUserSchoolInfo(arr, function (results, fields) {
	  if (results.affectedRows) {
		res.json({head: {code: 0, msg: 'ok'}, data: {}})
	  } else {
		res.json({head: {code: 10000, msg: '修改失败'}, data: {}})
	  }
	})
  },
  //更新用户公司信息
  updateUserCompanyInfo:function (req,res,next) {
	var param = req.body
	var arr = [param.company,param.job,param.openId]
	sqlControl.group.user.updateUserCompanyInfo(arr, function (results, fields) {
	  if (results.affectedRows) {
		res.json({head: {code: 0, msg: 'ok'}, data: {}})
	  } else {
		res.json({head: {code: 10000, msg: '修改失败'}, data: {}})
	  }
	})
  }
}
