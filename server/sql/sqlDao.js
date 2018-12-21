var db = require('./sqlConfig');  //require的路径是我们的db模块相对于本文件的路径
var sqlMap = require('./sqlMap')

module.exports = {

//  保存用户昵称头像
  saveUser: function (req) {
	return db.query(sqlMap.user.insert, req)
  },
//  更新用户昵称头像
  updateUserBase: function (req) {
	return db.query(sqlMap.user.updateBase, req)
  },
//  更新用户设备信息
  updateUserDevice: function (req) {
	return db.query(sqlMap.user.updateDevice, req)
  },
//  保存用户位置
  saveUserLocation: function (req) {
    return db.query(sqlMap.user.saveUsrLocation, req)
  },
//  更新用户基础信息
  updateUserInfo: function (req) {
	return db.query(sqlMap.user.update, req)
  },
//  更新用户学校信息
  updateUserUniversityInfo: function (req) {
	return db.query(sqlMap.user.updateUniversity, req)
  },
//  模糊搜索院校
  getUniversityList: function (req) {
	return db.query(sqlMap.university.search, req)
  },
//  获取学校数据地图
  getMapData: function (req) {
	return db.query(sqlMap.university.groupBy, req)
  },
  getLocationCount: function (req) {
	return db.query(sqlMap.university.locationCount, req)
  },
  //校友圈
  group: {
	//获取banner图
	getBannerList: function (req) {
	  return db.query(sqlMap.group.getBannerList,req)
	},
	//添加话题
	addTopic: function (req) {
	  return db.query(sqlMap.group.addTopic,req)
	},
	//删除话题
	deleteTopic: function (req) {
	  return db.query(sqlMap.group.deleteTopic,req)
	},
	//获取话题列表
	getTopicList: function (req) {
	  return db.query(sqlMap.group.getTopicList,req)
	},
	//获取用户话题列表
	getTopicListByUserId: function (req) {
	  return db.query(sqlMap.group.getTopicListByUserId,req)
	},
	//获取指定ID话题详情
	getTopicById: function (req) {
	  return db.query(sqlMap.group.getTopicById,req)
	},
	addTipOffs:  function (req) {
	  return db.query(sqlMap.group.addTipOffs,req)
	},
	//添加评论
	addComment: function (req) {
	  return db.query(sqlMap.group.addComment,req)
	},
	//删除评论
	deleteComment: function (req) {
	  return db.query(sqlMap.group.deleteComment,req)
	},
	getCommentListCount: function (req) {
	  return db.query(sqlMap.group.getCommentListCount,req)
	},
	//获取话题评论列表
	getCommentList: function (req) {
	  return db.query(sqlMap.group.getCommentList,req)
	},
	//获取指定评论
	getCommentListByUserId: function (req) {
	  return db.query(sqlMap.group.getCommentListByUserId,req)
	},
	//更新评论总数
	updateCommentCount: function (req) {
	  return db.query(sqlMap.group.updateCommentCount,req)
	},
	//更新评论总数
	reduceCommentCount: function (req) {
	  return db.query(sqlMap.group.reduceCommentCount,req)
	},
	//添加回复
	addReply: function (req) {
	  return db.query(sqlMap.group.addReply,req)
	},
	//删除回复
	deleteReply: function (req) {
	  return db.query(sqlMap.group.deleteReply,req)
	},
	//获取评论回复列表
	getReplyList: function (req) {
	  return db.query(sqlMap.group.getReplyList,req)
	},
	//获取评论回复列表
	getReplyListNoLimit: function (req) {
	  return db.query(sqlMap.group.getReplyListNoLimit,req)
	},
	// 校友圈用户信息
	user:{
	  //获取用户基本信息
	  getReplyUserInfo:function (req) {
		return db.query(sqlMap.group.user.getReplyUserInfo,req)
	  },
	  //获取用户基本信息
	  getUserInfo:function (req) {
		return db.query(sqlMap.group.user.getUserInfo,req)
	  },
	  //更新用户基础信息
	  updateUserInfo:function (req) {
	    var sql = 'update user set '+req[0]+' = ? where openid = ?'
		req.shift()
		return db.query(sql,req)
	  },
	  //更新用户昵称
	  updateUserNickName:function (req) {
		return db.query(sqlMap.group.user.updateUserNickName,req)
	  },
	  //更新用户联系方式
	  updateUserContact:function (req) {
		return db.query(sqlMap.group.user.updateUserContact,req)
	  },
	  //更新用户学校信息
	  updateUserSchoolInfo:function (req) {
		return db.query(sqlMap.group.user.updateUserSchoolInfo,req)
	  },
	  //更新用户公司信息
	  updateUserCompanyInfo:function (req) {
		return db.query(sqlMap.group.user.updateUserCompanyInfo,req)
	  },
	  //检测是否已经存在点赞通知
	  checkLikedMessage: function (req) {
		return db.query(sqlMap.group.user.checkLikedMessage,req)
	  },
	  //添加用户消息通知
	  addUserMessage:function (req) {
	    return db.query(sqlMap.group.user.addUserMessage,req)
	  },
	  //获取用户消息通知
	  getUserMessage:function (req) {
		return db.query(sqlMap.group.user.getMessage,req)
	  },
	  //获取系统消息通知
	  getSystemMessage:function (req) {
		return db.query(sqlMap.group.user.getSystemMessage,req)
	  },
	  //标记消息已读
	  readMessage:function (req) {
		return db.query(sqlMap.group.user.readMessage,req)
	  }
	},
	admin: {
	  //获取用户基本信息
	  getTipOffs:function (req) {
		return db.query(sqlMap.group.admin.getTipOffs,req)
	  },
	}
  }
}
