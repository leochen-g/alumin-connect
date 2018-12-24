let sqlDao = require('../sql/sqlDao')
let until = require('../until')

let adminService = {
  getTipOffs: async function (arr) {
	let results = await sqlDao.group.admin.getTipOffs(arr)
	return results
  },
  addSystemMessage: async function (arr) {
	let results = await sqlDao.group.admin.addSystemMessage(arr)
	return results.affectedRows
  }
}
module.exports = adminService