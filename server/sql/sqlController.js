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
	}
}
