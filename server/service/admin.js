let sqlDao = require('../sql/sqlDao')
let until = require('../until')
let superagent = require('superagent')
let cheerio = require('cheerio')

let adminService = {
  getTipOffs: async function (arr) {
	let results = await sqlDao.group.admin.getTipOffs(arr)
	return results
  },
  addSystemMessage: async function (arr) {
	let results = await sqlDao.group.admin.addSystemMessage(arr)
	return results.affectedRows
  },
  // 添加logo
  addUniversityLogo: async  function (arr) {
	var list = await this.getUniversity(arr)
	for (item in list) {
	  let array = []
	  let ite = list[item]
	  let src = await this.requestBaiDu(ite.name)
	  array.push(src)
	  array.push(ite.id)
	  this.updateUniversityBadge(array)
	}
	return true
  },
  // 访问百度页面
  requestBaiDu: async function (name) {
    var URL = 'https://baike.baidu.com/item/' + encodeURI(name)
	let res = await superagent
		.get(URL)
		.set('Accept-Encoding', 'identity')
	let body = res.text
	return this.analyserHtml(body)
  },
  // 解析百度页面返回url
  analyserHtml: async function (body) {
    let $ = cheerio.load(body)
	let src = $('.summary-pic img').attr('src')
	return src
  },
  // 获取指定数量的院校数
  getUniversity: async function (arr) {
	let results = await  sqlDao.group.admin.getUniversityList(arr)
	return results
  },
  // 更新院校的logo
  updateUniversityBadge: async function (arr) {
    let results = await  sqlDao.group.admin.updateUniversityBadge(arr)
	return results.affectedRows
  }
}
module.exports = adminService