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
	  	search:"select id,name from university where name like concat('%',?,'%') limit 0,10;"
	},
  	user:{
	  	insert:"insert ignore into user(openid,nickName,avataUrl,country,gender) values (?,?,?,?,?); ",
	  	select:"select * from user where openid in (?)",
	  	update:"update user set university =?,pid=?,location=?  where openid=?;"
	}
}
module.exports = sqlMap