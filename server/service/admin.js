let sqlDao = require('../sql/sqlDao')
let until = require('../until')

let adminService = {
  getTipOffs: async function (arr) {
	let results = await sqlDao.group.admin.getTipOffs(arr)
	return results
  }
}
module.exports = adminService