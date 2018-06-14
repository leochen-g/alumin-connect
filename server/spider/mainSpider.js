var superagent = require('superagent');//引入superagent 插件
var controller = require('../sql/sqlController');

spiderProvince = function () {
	//请求省份链接
	var URL = 'http://119.29.166.254:9090/api/provinces ';
	superagent
		.get(URL)
		//请求结束后的操作
		.end(function (err, res) {
			if (err) {
				return err;
			}
			//解析请求后得到的body数据
			var result = res.body;
			for(var i=0;i<result.length;i++){
				// var arr = [];
				// arr.push(result[i].id)
				// arr.push(result[i].name)
				// console.log(arr);
				// controller.insertProvinces(arr)
				// spiderCity(i)
				spiderUniversity(result[i].id)
			}
		});

};
spiderCity =function (pid) {
	var url = 'http://119.29.166.254:9090/api/province/getCitiesByProvinceId?id='+pid;
	superagent
		.get(url)
		.end(function (err,res) {
			if(err){
				return err
			}
			var result = res.body;
			for(var i =0 ;i<result.length;i++){
				var arr = [pid]
				arr.push(result[i])
				controller.insertCity(arr)
			}
		})
};
spiderUniversity =function (pid) {
	var url = 'http://119.29.166.254:9090/api/university/getUniversityByProvinceId?id='+pid;
	superagent
		.get(url)
		.end(function (err,res) {
			if(err){
				return err
			}
			var result = res.body;
			for(var i =0 ;i<result.length;i++){
				var arr = [pid]
				arr.push(result[i].name)
				arr.push(result[i].website)
				arr.push(result[i].city)
				arr.push(result[i].level)
				arr.push(null)
				arr.push(result[i].abbreviation)
				controller.insertUniversity(arr)
			}
		})
}
spiderProvince();