module.exports = {
  //获取当前时间，格式yyyy-MM-dd HH:MM:SS
  getNowFormatDate: function () {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
	  month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
	  strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		+ " " + date.getHours() + seperator2 + date.getMinutes()
		+ seperator2 + date.getSeconds();
	return currentdate;
  }
}


