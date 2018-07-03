var sqlMap = {
	provinces:{
		insert:"insert into provinces(pid,name) values (?,?)",
		getProvinceName:"select*from provinces",
	},
	city:{
		insert:"insert into city(pid,city) values (?,?)"
	},
	university:{
		insert:"insert into university(pid,name,website,city,level,usercount,abbreviation) values (?,?,?,?,?,?,?)",
	  	search:"select id,name from university where name like concat('%',?,'%') limit 0,10;",
	  	// groupBy:"select pid,count(pid) as value from user WHERE university=? GROUP BY university,pid"
	    groupBy:"select name,count(name) as value from user join provinces on user.pid=provinces.pid  where university=? GROUP BY name ORDER BY count(name) desc"
	},
  	user:{
	  	updateBase:'update user set nickName = ?,avataUrl = ?, country = ?, gender = ?  where openid = ?;',
	  	insert:"insert ignore into user(openid,nickName,avataUrl,country,gender) values (?,?,?,?,?); ",
	  	select:"select * from user where openid in (?)",
	  	update:"update user set university =?,pid=?,location=?  where openid=?;",
	  	updateUniversity:"update user set university =? where openid=?;"
	}
}
module.exports = sqlMap