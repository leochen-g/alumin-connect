var userService = require('../service/user')
// json格式化
module.exports = {
  //  获取用户openid并保存
  getUserOpenid: async function (req, res) {
	var code = req.body.code;
	var arr = [code]
	var results = await userService.getUserOpenid(arr)
	if (!results.hasSave) {
	  res.json({
		head: {code: 0, msg: 'ok'},
		data: {'openid': results.openId}
	  })
	} else {
	  res.json({
		head: {code: 11000, msg: '数据已存在'},
		data: {'openid': results.openId}
	  })
	}
  },
  //  获取用户位置信息并保存
  getUserLocation: async function (req, res) {
	var param = req.body.location
	var oid = req.body.openId
	var arr = [param, oid]
	var results = await userService.getUserLocation(arr)
	res.json({head: {code: 0, msg: 'ok'}, data: results})

  },
  // 更新用户名称头像
  updateUserBaseInfo: async function (req, res) {
	var param = req.body
	var arr = [param.nickName, param.avatarUrl, param.country, param.gender, param.openId]
	var results = await userService.updateUserBaseInfo(arr)
	if (results) {
	  res.json({head: {code: 0, msg: 'ok'}, data: {}})
	} else {
	  res.json({head: {code: 0, msg: '更新失败'}, data: {}})
	}
  },
  //  更新用户学校信息
  updateUserUniversity: async function (req, res) {
	var param = req.body
	var arr = [param.university, param.openId]
	var results = await userService.updateUserUniversityInfo(arr)
	if (results) {
	  res.json({head: {code: 0, msg: '更新成功'}, data: {}})
	} else {
	  res.json({head: {code: 11000, msg: '更新失败'}, data: {}})
	}
  },
  // 更新用户设备信息
  updateUserDeviceInfo: async function (req, res) {
	var param = req.body
	var arr = [param.brand, param.model, param.system, param.platform, param.openId]
	var results = await userService.updateUserDeviceInfo(arr)
	if (results) {
	  res.json({head: {code: 0, msg: 'ok'}, data: {}})
	} else {
	  res.json({head: {code: 0, msg: '更新失败'}, data: {}})
	}
  },
  //  获取学校数据地图
  getMapData: async function (req, res) {
	var param = req.query.university
	var arr = [param]
	var results = await userService.getMapData(arr)
	res.json({head: {code: 0, msg: 'ok'}, data: results})
  },
  //  获取校友人数和城市数
  getUserAndLocationCount: async function (req, res) {
	var param = req.query.university
	var arr = [param]
	var results = await userService.getLocationCount(arr)
	res.json({head: {code: 0, msg: 'ok'}, data: results})
  },
  //  模糊搜索院校
  getUniversity: async function (req, res) {
	var param = req.query.wd
	var arr = [param]
	console.log(arr)
	var result = await userService.getUniversityList(arr)
	res.json({head: {code: 0, msg: 'ok'}, data: result})
  }
}
