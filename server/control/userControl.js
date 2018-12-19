var sqlControl = require('../sql/sqlDao')
var superagent = require('superagent')
const config = require('../config')
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

module.exports = {
//  获取用户openid并保存
  getUserOpenid: async function (req, res) {
	var code = req.body.code;
	if (!code) {
	  res.json({head: {code: 11000, msg: '认证码不存在'}, data: {}})
	} else {
	  var URL = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + config.MINI_APPID + '&secret=' + config.MINI_SECRET + '&js_code=' + code + '&grant_type=authorization_code'
	  var resp = await superagent.get(URL)
	  var obj = JSON.parse(resp.text)
	  var openId = obj.openid
	  var session_key = resp.session_key
	  var arr = [openId, '', '', '', '']
	  var result = await sqlControl.saveUser(arr)
	  if (result.insertId) {
		res.json({
		  head: {code: 0, msg: 'ok'},
		  data: {'openid': openId}
		})
	  } else {
		res.json({
		  head: {code: 11000, msg: '数据已存在'},
		  data: {'openid': openId}
		})
	  }
	}
  },
  //  获取用户位置信息并保存
  getUserLocation: async function (req, res) {
	var param = req.body.location
	var oid = req.body.openId
	if (!param) {
	  res.json({head: {code: 11000, msg: '请输入参数'}, data: {}})
	} else {
	  var URL = 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + param + '&key=' + config.TENCENT_MAP_KEY + '&get_poi=1';
	  var resp = await superagent.get(URL)
	  var location = resp.body.result.address_component
	  var city = location.city
	  var pid = config.PROVINCEMAP[location.province]
	  var arr = [pid, city, oid]
	  var result = await sqlControl.saveUserLocation(arr)
	  if (result.affectedRows) {
		res.json({head: {code: 0, msg: 'ok'}, data: {city: city, pid: pid}})
	  } else {
		res.json({head: {code: 11000, msg: '获取位置失败'}, data: {}})
	  }
	}
  },
  // 更新用户名称头像
  updateUserBaseInfo: async function (req, res) {
	var param = req.body
	if (!param.openId) {
	  res.json({head: {code: 11000, msg: '数据不存在'}, data: {}})
	} else {
	  var arr = [param.nickName, param.avatarUrl, param.country, param.gender, param.openId]
	  var result = await sqlControl.updateUserBase(arr)
	  if (result.affectedRows) {
		res.json({head: {code: 0, msg: 'ok'}, data: {}})
	  } else {
		res.json({head: {code: 0, msg: '更新失败'}, data: {}})
	  }
	}
  },
  //  更新用户学校信息
  updateUserUniversity: async function (req, res) {
	var param = req.body
	if (!param) {
	  res.json({head: {code: 11000, msg: '没有选择院校'}, data: {}})
	} else {
	  var arr = [param.university, param.openId]
	  var result = await sqlControl.updateUserUniversityInfo(arr)
	  if (result.affectedRows) {
		res.json({head: {code: 0, msg: '更新成功'}, data: {}})
	  } else {
		res.json({head: {code: 11000, msg: '更新失败'}, data: {}})
	  }
	}
  },
  updateUserDeviceInfo: async function (req, res) {
	var param = req.body
	if (!param.openId) {
	  res.json({head: {code: 11000, msg: '数据不存在'}, data: {}})
	} else {
	  var arr = [param.brand, param.model, param.system, param.platform, param.openId]
	  var result = await sqlControl.updateUserDevice(arr)
	  if (result.affectedRows) {
		res.json({head: {code: 0, msg: 'ok'}, data: {}})
	  } else {
		res.json({head: {code: 0, msg: '更新失败'}, data: {}})
	  }
	}
  },
//  获取学校数据地图
  getMapData: async function (req, res) {
	var param = req.query.university
	if (!param) {
	  res.json({head: {code: 11000, msg: '请输入学校'}, data: {}})
	} else {
	  var arr = [param]
	  var result = await sqlControl.getMapData(arr)
	  res.json({
		head: {code: 0, msg: 'ok'}, data: {
		  university: param,
		  list: result,
		}
	  })
	}
  },
//  获取校友人数和城市数
  getUserAndLocationCount: async function (req, res) {
	var param = req.query.university
	if (!param) {
	  res.json({head: {code: 11000, msg: '请输入学校'}, data: {}})
	} else {
	  var arr = [param]
	  var result =  await  sqlControl.getLocationCount(arr)
	  res.json({
		head: {code: 0, msg: 'ok'}, data: result[0]
	  })
	}
  },
//  模糊搜索院校
  getUniversity: async function (req, res) {
	var param = req.query.wd
	if (!param) {
	  res.json({head: {code: 11000, msg: '请输入有效值'}, data: {}})
	} else {
	  var arr = [param]
	  console.log(arr)
	  var result = await sqlControl.getUniversityList(arr)
	  res.json({head: {code: 0, msg: 'ok'}, data: result})
	}
  }
}
