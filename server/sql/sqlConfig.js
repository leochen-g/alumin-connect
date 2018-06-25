var mysql = require('mysql');
var global = require('../config/Global')
var pool = mysql.createPool(global.sql);

exports.query = function(sql, arr, callback){
	//建立链接
	pool.getConnection(function(err,connection){
		if(err){throw err;return;}
		connection.query(sql,arr,function(error,results,fields){
			//将链接返回到连接池中，准备由其他人重复使用
			connection.release();
			if(error) throw error;
			//执行回调函数，将数据返回
			callback && callback(results,fields);
		});
	});
};