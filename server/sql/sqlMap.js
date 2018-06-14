var sqlMap = {
	provinces:{
		insert:'insert into provinces(pid,name) values (?,?)',
		getProvinceName:'select*from provinces',
	},
	city:{
		insert:'insert into city(pid,city) values (?,?)'
	},
	university:{
		insert:'insert into university(pid,name,website,city,level,usercount,abbreviation) values (?,?,?,?,?,?,?)'
	}
}
module.exports = sqlMap