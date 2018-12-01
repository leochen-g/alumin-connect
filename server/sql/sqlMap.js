var sqlMap = {
  provinces: {
	insert: "insert into provinces(pid,name) values (?,?)",
	getProvinceName: "select*from provinces",
  },
  city: {
	insert: "insert into city(pid,city) values (?,?)"
  },
  university: {
	insert: "insert into university(pid,name,website,city,level,usercount,abbreviation) values (?,?,?,?,?,?,?)",
	search: "select id,name from university where name like concat('%',?,'%') limit 0,10;",
	groupBy: "select name,count(name) as value from user join provinces on user.pid=provinces.pid  where university=? GROUP BY name ORDER BY count(name) desc",
	locationCount: "select count(DISTINCT location) as locationCount,count(openid) as userCount from user where university = ? ;"
  },
  user: {
	updateBase: 'update user set nickName = ?,avataUrl = ?, country = ?, gender = ?  where openid = ?;',
	updateDevice: 'update user set brand = ?,model = ?, system = ?, platform = ?  where openid = ?;',
	insert: "insert ignore into user(openid,nickName,avataUrl,country,gender) values (?,?,?,?,?); ",
	select: "select * from user where openid in (?)",
	updateUniversity: "update user set university =? where openid=?;",
	saveUsrLocation: "update user set pid=?,location=? where openid=?"
  },
  group: {
    addTopic:'insert into topic(openId, location, university, nickName, content) values (?,?,?,?,?)',
	deleteTopic:'update topic set flag = 0 where id = ? and openId = ?',
	updateTopic:'',
	getTopicListByUserId:'select a.location as userLocation,a.university,a.gender,a.avataUrl,a.college,a.major,b.* from user a inner join topic b on a.openid=b.openId where b.openId = ? and b.flag=1',
	getTopicById:'select a.location as userLocation,a.university,a.gender,a.avataUrl,a.college,a.major,b.* from user a inner join topic b on a.openid=b.openId where b.id = ? and b.flag=1',
	getTopicList:'select a.location as userLocation,a.university,a.gender,a.avataUrl,a.college,a.major,b.* from user a inner join topic b on a.openid=b.openId where b.university = ? and b.flag=1 and b.location= ?',
	addComment:'insert into comment(openId, cid, topicId,content) values (?,?,?,?)',
	deleteComment:'update comment set flag = 0 where id = ? and openId = ?',
	updateCommentCount:'update topic set commentCount=commentCount+1 where id = ?',
	getCommentList:'select a.location,a.university,a.gender,a.avataUrl,a.college,a.major,b.* from user a inner join comment b on a.openid=b.openId where b.topicId = ? and b.flag=1',
	getCommentListByUserId:'select a.location,a.university,a.gender,a.avataUrl,a.college,a.major,b.* from user a inner join comment b on a.openid=b.openId where b.openId = ? and b.flag=1',
	addReply:'insert into reply(openId,cid,replyId,replyType,content,toUid,topicId) values (?,?,?,?,?,?,?)',
	deleteReply:'update reply set flag = 0 where rid = ? and openId =?',
	getReplyList:'select * from reply where cid=? and flag=1',
	user:{
      getUserInfo:'select openid, nickName, location, university, gender, avataUrl, graduationTime, college, major, phone, company, job from user where openid = ?',
	  updateUserNickName:'update user set nickName = ? where openid = ?',
	  updateUserContact:'update user set phone = ? where openid = ?',
	  updateUserSchoolInfo:'update user set university = ?, graduationTime = ?, college = ?, major = ?  where openid = ?',
	  updateUserCompanyInfo:'update user set company = ?, job = ? where openid = ?',
	}
  }
}
module.exports = sqlMap