var mysql = require('mysql');
var config = require('../config/config')
var pool = mysql.createPool(config.develop);

exports.query = function(sql, arr){
	//建立链接
  return new Promise(((resolve, reject) => {
	pool.getConnection(function(err,connection){
	  if(err){
	    reject(err)
	  }else {
		connection.query(sql,arr,function(error,results){
		  if(error) {
		    reject(error)
		  } else {
		    resolve(results)
		  }
		  connection.release();
		})
	  }
	})
  }))
}