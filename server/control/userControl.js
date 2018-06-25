var sqlControl = require('../sql/sqlController')
var superagent = require('superagent')
var global = require('../config/Global')

// json格式化
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
	res.json({
	  code: '10000',
	  msg: '操作失败'
	})
  } else {
	res.json(ret)
  }
}

module.exports  = {
//  获取用户openid并保存
  getUserOpenid: function (req,res,next) {
	var code = req.body.code;
	console.log(code);
	if(!code){
	  res.json({head:{code:10000, msg:'认证码不存在'},data:{}})
	}else {
	  var URL = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + global.weixin.appId + '&secret=' + global.weixin.secret + '&js_code=' + code + '&grant_type=authorization_code'
	  superagent
		  .get(URL)
		  .end(function (err, response) {
			if (err) {
			  return err;
			}
			var resp = JSON.parse(response.text)
			console.log(resp);
			var openId = resp.openid
			var session_key =  resp.session_key
			res.json({
			  head:{code:0,msg:'ok'},
			  data:{'openid':openId,'session_key':session_key}
			})
		  });
	}
  },
//  保存用户基本信息
  saveUserInfo:function (req, res,next) {
	var param = req.body
	if(!param.openid){
	  res.json({head:{code:10000, msg:'数据不存在'},data:{}})
	}else {
	  var arr = [param.openid,param.nickName,param.avatarUrl,param.country,param.gender]
	  sqlControl.saveUser(arr,function(results,fields){
		if(results.insertId){
		  res.json({head:{code:0, msg:'ok'},data:{id:results.insertId}})
		}else {
		  res.json({head:{code:0, msg:'数据重复'},data:{}})
		}
	  })
	}
  },
  // 更新用户基础信息
  updateUserInfo: function (req,res,next) {
	var param = req.body
	console.log(param);
	if(!param){
	  res.json({head:{code:10000, msg:'没有位置信息'},data:{}})
	}else {
	  var arr = [param.university,param.pid,param.location,param.oid]
	  console.log(arr);
	  sqlControl.updateUserInfo(arr,function(results,fields){
		if(results.affectedRows){
		  res.json({head:{code:0, msg:'更新成功'},data:{}})
		}else {
		  res.json({head:{code:1000, msg:'更新失败'},data:{}})
		}
	  })
	}
  },
//  获取用户基础信息
  getUserBaseInfo: function (req, res,next) {
	
  },
//  获取用户位置信息
  getUserLocation: function (req,res,next) {
    console.log('body',req.query);
    var param = req.query.location
	if(!param){
      res.json({head:{code:10000, msg:'请输入参数'}, data:{}})
	}else {
	  var URL = 'http://apis.map.qq.com/ws/geocoder/v1/?location='+param+'&key=' + global.qqMapKey + '&get_poi=1';
	  superagent
		  .get(URL)
		  .end(function (err, response) {
			if (err) {
			  return err;
			}
			var location = response.body.result.address_component
			res.json({head:{code:0,msg:'ok'},data:[location.province,location.city,location.district]})
		  });
	}
  },
//  获取学校数据地图
  getMapData: function (req,res,next) {
	
  },
//  模糊搜索院校
  getUniversity: function (req,res,next) {
	var param = req.query.wd
	if(!param){
	  res.json({head:{code:10000, msg:'请输入有效值'}, data:{}})
	}else {
	  var arr =[param]
	  console.log(arr)
	  sqlControl.getUniversityList(arr,function(results,fields){
		res.json({head:{code:0, msg:'ok'},data:results})
	  })
	}
  }

}
