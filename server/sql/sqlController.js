var db = require('./sqlConfig');  //require的路径是我们的db模块相对于本文件的路径
var sqlMap = require('./sqlMap')


module.exports = {
//	写入省份
	insertProvinces: function (req,res,next) {
		db.query(sqlMap.provinces.insert, req, function(results,fields){
			console.log(results);
		})
	},
//	写入城市
	insertCity:function (req,res,next) {
		db.query(sqlMap.city.insert, req, function(results,fields){
			console.log(results);
		})
	},
//	写入院校
	insertUniversity:function (req,res,next) {
		db.query(sqlMap.university.insert, req, function(results,fields){
			console.log(results);
		})
	},
//  保存用户基础信息
  saveUser:function (req,res,next) {
	db.query(sqlMap.user.insert, req, res)
  },
//  更新用户基础信息
  updateUserInfo:function (req,res,next) {
	db.query(sqlMap.user.update, req, res)
  },
//  更新用户学校信息
  updateUserUniversityInfo:function (req,res,next) {
    db.query(sqlMap.user.updateUniversity, req, res)
  },
//  获取用户基础信息
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
}
