/**
 * 校友圈子相关controller
 */
var sqlControl = require('../sql/sqlController')
var uuid = require('uuid/v1')
var async = require('async')

module.exports = {
  //获取举报列表
  getTipOffs: function (req, res, next) {
	var param = req.body
	var arr = []
	sqlControl.group.admin.getTipOffs(arr, function (results, fields) {
		res.send({head: {code: 0, msg: 'ok'}, data: {list:results}})
	})
  },

}
