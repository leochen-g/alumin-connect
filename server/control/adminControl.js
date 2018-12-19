/**
 * 校友圈子相关controller
 */
var adminService = require('../service/admin')
var uuid = require('uuid/v1')

module.exports = {
  //获取举报列表
  getTipOffs: async function (req, res, next) {
	var param = req.body
	var arr = []
	var results = await adminService.getTipOffs(arr)
	res.send({head: {code: 0, msg: 'ok'}, data: {list:results}})
  },

}
