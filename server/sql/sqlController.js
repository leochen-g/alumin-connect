var db = require('./sqlConfig');  //require的路径是我们的db模块相对于本文件的路径
var sqlMap = require('./sqlMap')


module.exports = {
//  保存用户昵称头像
	saveUser:function (req,res,next) {
	  db.query(sqlMap.user.insert, req, res)
	},
//  更新用户昵称头像
  	updateUserBase:function (req,res,next) {
	  db.query(sqlMap.user.updateBase, req, res)
	},
//  更新用户设备信息
	updateUserDevice:function (req,res,next) {
	  db.query(sqlMap.user.updateDevice, req, res)
	},
//  保存用户位置
  	saveUserLocation:function (req,res,next) {
	  db.query(sqlMap.user.saveUsrLocation, req, res)
	},
//  更新用户基础信息
  updateUserInfo:function (req,res,next) {
	db.query(sqlMap.user.update, req, res)
  },
//  更新用户学校信息
  updateUserUniversityInfo:function (req,res,next) {
    db.query(sqlMap.user.updateUniversity, req, res)
  },
//  获取用户基础信息(未启用)
  getUserInfo:function (req,res,next) {
	db.query(sqlMap.university.insert, req, function(results,fields){
	  console.log(results);
	})
  },
//  模糊搜索院校
  getUniversityList:function (req,res,next) {
	db.query(sqlMap.university.search, req, res)
  },
//  获取学校数据地图
  getMapData:function (req,res,next) {
	db.query(sqlMap.university.groupBy, req, res)
  },
  getLocationCount:function (req,res,next) {
	db.query(sqlMap.university.locationCount,req,res)
  }
}
