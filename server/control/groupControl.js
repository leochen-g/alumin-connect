/**
 * 校友圈子相关controller
 */
var sqlControl = require('../sql/sqlController')
var uuid = require('uuid/v1')
var async = require('async')

module.exports = {
  //添加话题
  addTopic: function (req, res, next) {
	var param = req.body
	var arr = [param.openId, param.location, param.university, param.nickName, param.content]
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
  //获取话题列表
  getTopicList: function (req, res, next) {
	var param = req.body
	var arr = [param.university,param.location]
	sqlControl.group.getTopicList(arr, function (results, fields) {
	  var list = []
	  async.eachSeries(results, function (item, callback) {
		var obj={userInfo:{}};
		sqlControl.group.user.getUserInfo([item.openId],function (resInfo) {
		  obj.userInfo=resInfo[0]
		  callback(null)
		})
		obj.id=item.id
		obj.content=item.content
		obj.commentCount=item.commentCount
		obj.likeCount=item.likeCount
		obj.updatedAt=item.updatedAt
		obj.location=item.location
		list.push(obj)
	  }, function (err,result) {
		  if(err){
		    console.log(err);
		  }else {
			res.json({
			  head: {code: 0, msg: 'ok'}, data: {
				list: list,
			  }
			})
		  }
	  })
	})
  },
  //获取用户的话题列表
  getTopicListByUserId: function (req, res, next) {
	var param = req.body
	var arr = [param.openId]
	sqlControl.group.getTopicListByUserId(arr, function (results, fields) {
	  async.eachSeries(results, function (item, callback) {
		var obj={user:{}};
		sqlControl.group.user.getUserInfo([item.openId],function (resInfo) {
		  obj.userInfo=resInfo[0]
		  callback(null)
		})
		obj.id=item.id
		obj.content=item.content
		obj.commentCount=item.commentCount
		obj.likeCount=item.likeCount
		obj.updatedAt=item.updatedAt
		obj.location=item.location
		list.push(obj)
	  }, function (err,result) {
		if(err){
		  console.log(err);
		}else {
		  res.json({
			head: {code: 0, msg: 'ok'}, data: {
			  list: list,
			}
		  })
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
		async.eachSeries(results, function (item, callback) {
		  var obj={user:{}};
		  sqlControl.group.user.getUserInfo([item.openId],function (resInfo) {
			obj.userInfo=resInfo[0]
			callback(null)
		  })
		  obj.id=item.id
		  obj.content=item.content
		  obj.commentCount=item.commentCount
		  obj.likeCount=item.likeCount
		  obj.updatedAt=item.updatedAt
		  obj.location=item.location
		  list.push(obj)
		}, function (err,result) {
		  if(err){
			console.log(err);
		  }else {
			res.json({
			  head: {code: 0, msg: 'ok'}, data: {
				list: list,
			  }
			})
		  }
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
	const cid = uuid().replace(/-/g, "")
	var arr = [param.openId, cid, param.topicId, param.content]
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


  //获取话题评论列表
  getCommentList:function (req, res, next) {
	var param = req.body
	var arr = [param.id]
	sqlControl.group.getCommentList(arr, function (results, fields) {
	  var obj = {
	    targetId:param.id,
		comments:[]
	  }
	  async.eachSeries(results, function (item, callback) {
		var com={topComment:[]};
		com.id=item.id
		com.cid=item.cid
		com.content=item.content
		com.topicId=item.topicId
		com.updatedAt=item.updatedAt
		sqlControl.group.user.getUserInfo([item.openId],function (resInfo) {
		  com.userInfo=resInfo[0] || "" //评论者基本信息
		  sqlControl.group.getReplyList([item.cid],function (replyList) {
			//获取回复结果
			var replyObj={}
			async.eachSeries(replyList, function (ite,call) {
				replyObj.id = ite.id
				replyObj.reply_id = ite.replyId
				replyObj.reply_type = ite.replyType
				replyObj.cid = ite.cid
				replyObj.content = ite.content
				replyObj.respUserId = ite.replyId
				replyObj.userId = ite.toUid
				sqlControl.group.user.getUserInfo([ite.toUid],function (info) {
				  replyObj.respUserInfo = info[0] || ""
				  sqlControl.group.user.getUserInfo([ite.openId],function (info) {
					replyObj.userInfo = info[0] || ""
				  })
				  call(null)
				})

			},function (err) {
			   return callback(null)
			})
			com.topComment.push(replyObj)
		  })
		})
		obj.comments.push(com)
	  }, function (err,result) {
		if(err){
		  console.log(err);
		}else {
		  res.json({
			head: {code: 0, msg: 'ok'}, data: obj
		  })
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
		obj.cid=results[i].cid
		obj.content=results[i].content
		obj.topicId=results[i].topicId
		obj.updatedAt=results[i].updatedAt
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
  //添加回复
  addReply: function (req, res, next) {
	var param = req.body
	var arr = [param.openId,param.cid,param.replyId,param.replyType,param.content,param.toUid,param.topicId]
	sqlControl.group.addReply(arr, function (results, fields) {
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
  //删除回复
  deleteReply: function (req, res, next) {
	var param = req.body
	var arr = [param.id,param.openId]
	sqlControl.group.deleteReply(arr, function (results, fields) {
	  if (results.affectedRows) {
		res.json({head: {code: 0, msg: 'ok'}, data: {}})
	  } else {
		res.json({head: {code: 10000, msg: '删除失败'}, data: {}})
	  }
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
