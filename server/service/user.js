let sqlDao = require('../sql/sqlDao')
let superagent = require('superagent')
let WXBizDataCrypt = require('../until/RdWXBizDataCrypt')
let jwt = require('../until/token')
const config = require('../config')

let userService = {
  //  获取用户openid并保存
  getUserOpenid: async function (arr) {
    let code = arr[0]
	let URL = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + config.MINI_APPID + '&secret=' + config.MINI_SECRET + '&js_code=' + code + '&grant_type=authorization_code'
	let resp = await superagent.get(URL)
	let obj = JSON.parse(resp.text)
	let openId = obj.openid
	let session_key = obj.session_key
	let list = [openId, '', '', '', '']
	let result = await sqlDao.saveUser(list)
	console.log('session_key', obj)
	if(result.insertId){
	  return {hasSave:false,openId:openId,session_key:session_key}
	}else {
	  return {hasSave:true,openId:openId,session_key:session_key}
	}
  },
  // 解析加密用户信息
  decryptUserInfo: async function (arr) {
    let code = arr[0]
	let URL = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + config.MINI_APPID + '&secret=' + config.MINI_SECRET + '&js_code=' + code + '&grant_type=authorization_code'
	let resp = await superagent.get(URL)
	let obj = JSON.parse(resp.text)
	let session_key = obj.session_key
	let pc = new WXBizDataCrypt(config.MINI_APPID, session_key)
	let data = pc.decryptData(arr[1], arr[2])
	console.log('解密',data)
	let userId = await this.findUser([data.unionId])
	if(!userId){
	  let info = [data.nickName, data.avatarUrl, data.country, data.gender, data.unionId, data.openId]
	  let res = await this.updateUserBaseInfo(info)
	}
	return jwt.createJWT({userId:data.openId})
  },
  // 查找用户并返回userID
  findUser: async  function (arr) {
    let result = await sqlDao.group.user.findUser(arr)
	if(result.length>0){
	  return result[0].id
	}else {
	  return null
	}
  },

  //获取用户位置并保存
  getUserLocation: async function (arr) {
	var param = arr[0]
	var oid = arr[1]
	var URL = 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + param + '&key=' + config.TENCENT_MAP_KEY + '&get_poi=1';
	var resp = await superagent.get(URL)
	var location = resp.body.result.address_component
	var city = location.city
	var pid = config.PROVINCEMAP[location.province]
	var list = [pid, city, oid]
	var results = await sqlDao.saveUserLocation(list)
	if (results.affectedRows) {
	  return {city: city, pid: pid}
	} else {
	  return {}
	}
  },
  // 更新用户名称头像
  updateUserBaseInfo: async function (arr) {
	let results = await sqlDao.updateUserBase(arr)
	return results.affectedRows
  },
  // 更新用户学校信息
  updateUserUniversity: async function (arr) {
	let results = await sqlDao.updateUserUniversityInfo(arr)
	return results.affectedRows
  },
  // 更新用户设备信息
  updateUserDeviceInfo: async function (arr) {
	let results = await sqlDao.updateUserDevice(arr)
	return results.affectedRows
  },
  //  获取学校数据地图
  getMapData: async function (arr) {
	let results = await sqlDao.getMapData(arr)
	return {university: arr[0],list:results}
  },
  //  获取校友人数和城市数
  getLocationCount: async function (arr) {
	let results = await  sqlDao.getLocationCount(arr)
	return results[0]
  },
  //  模糊搜索院校
  getUniversityList: async function (arr) {
	let results = await sqlDao.getUniversityList(arr)
	return results
  }
}

module.exports = userService