var db = require('./sqlConfig');  //require的路径是我们的db模块相对于本文件的路径
var sqlMap = require('./sqlMap')


module.exports = {
//  保存用户昵称头像
  saveUser: function (req, res, next) {
	db.query(sqlMap.user.insert, req, res)
  },
//  更新用户昵称头像
  updateUserBase: function (req, res, next) {
	db.query(sqlMap.user.updateBase, req, res)
  },
//  更新用户设备信息
  updateUserDevice: function (req, res, next) {
	db.query(sqlMap.user.updateDevice, req, res)
  },
//  保存用户位置
  saveUserLocation: function (req, res, next) {
	db.query(sqlMap.user.saveUsrLocation, req, res)
  },
//  更新用户基础信息
  updateUserInfo: function (req, res, next) {
	db.query(sqlMap.user.update, req, res)
  },
//  更新用户学校信息
  updateUserUniversityInfo: function (req, res, next) {
	db.query(sqlMap.user.updateUniversity, req, res)
  },
//  模糊搜索院校
  getUniversityList: function (req, res, next) {
	db.query(sqlMap.university.search, req, res)
  },
//  获取学校数据地图
  getMapData: function (req, res, next) {
	db.query(sqlMap.university.groupBy, req, res)
  },
  getLocationCount: function (req, res, next) {
	db.query(sqlMap.university.locationCount, req, res)
  },
  //校友圈
  group: {
	//添加话题
	addTopic: function (req, res, next) {
	  db.query(sqlMap.group.addTopic,req,res)
	},
	//删除话题
	deleteTopic: function (req, res, next) {
	  db.query(sqlMap.group.deleteTopic,req,res)
	},
	//更新话题
	updateTopic: function (req, res, next) {
	  db.query(sqlMap.group.updateTopic,req, res)
	},
	//获取话题列表
	getTopicList: function (req, res, next) {
	  db.query(sqlMap.group.getTopicList,req,res)
	},
	//获取用户话题列表
	getTopicListByUserId: function (req, res, next) {
	  db.query(sqlMap.group.getTopicListByUserId,req,res)
	},
	//获取指定ID话题详情
	getTopicById: function (req, res, next) {
	  db.query(sqlMap.group.getTopicById,req,res)
	},
	//添加评论
	addComment: function (req, res, next) {
	  db.query(sqlMap.group.addComment,req,res)
	},
	//删除评论
	deleteComment: function (req, res, next) {
	  db.query(sqlMap.group.deleteComment,req,res)
	},
	//更新评论
	updateComment: function (req, res, next) {
	  db.query(sqlMap.group.updateComment,req, res)
	},
	//获取话题评论列表
	getCommentList: function (req, res, next) {
	  db.query(sqlMap.group.getCommentList,req,res)
	},
	//获取指定评论
	getCommentListByUserId: function (req, res, next) {
	  db.query(sqlMap.group.getCommentListByUserId,req,res)
	},
	//更新评论总数
	updateCommentCount: function (req,res,next) {
	  db.query(sqlMap.group.updateCommentCount,req,res)
	},
	// 校友圈用户信息
	user:{
	  //获取用户基本信息
	  getUserInfo:function (req,res,next) {
		db.query(sqlMap.group.user.getUserInfo,req,res)
	  },
	  //更新用户昵称
	  updateUserNickName:function (req,res,next) {
		db.query(sqlMap.group.user.updateUserNickName,req,res)
	  },
	  //更新用户联系方式
	  updateUserContact:function (req,res,next) {
		db.query(sqlMap.group.user.updateUserContact,req,res)
	  },
	  //更新用户学校信息
	  updateUserSchoolInfo:function (req,res,next) {
		db.query(sqlMap.group.user.updateUserSchoolInfo,req,res)
	  },
	  //更新用户公司信息
	  updateUserCompanyInfo:function (req,res,next) {
		db.query(sqlMap.group.user.updateUserCompanyInfo,req,res)
	  },
	}
  }
}
