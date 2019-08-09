let mysql = require('mysql');
let config = require('../config/default.js')

let pool = mysql.createPool({
	host     : config.sqlBase.host,
  	user     : config.sqlBase.user,
  	password : config.sqlBase.password,
  	database : config.sqlBase.database,
  	port     : config.sqlBase.port
})

let query = (sql, val)=>{
	return new Promise(( resolve, reject ) => {
		pool.getConnection(( err, connection ) => {
			if(err){
				reject(err)
			}else{
				connection.query(sql, val, ( err, rows) => {
					if(err){
						reject(err)
					}else{
						resolve(rows)
					}
				})
			}
			connection.release()
		})
	})
}

let users =
    `create table if not exists users(
     	id INT NOT NULL AUTO_INCREMENT,
     	name VARCHAR(100) NOT NULL COMMENT '用户名',
     	pass VARCHAR(100) NOT NULL COMMENT '密码',
     	avator VARCHAR(100) NOT NULL COMMENT '头像',
     	moment VARCHAR(100) NOT NULL COMMENT '注册时间',
     	PRIMARY KEY ( id )
    );`

let createTable = ( sql ) => {
  return query( sql, [] )
}
// 建表
createTable(users)

// 注册用户
exports.insertData = ( value ) => {
  let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
  return query( _sql, value )
}
// 删除用户
exports.deleteUserData = ( id ) => {
  let _sql = `delete from users where id="${id}";`
  return query( _sql )
}
// 查找用户
exports.findUserData = ( name, pageSize, pageNo ) => {
  let _sql = name ? `select * from users where name="${name}";` : `select * from users limit ${(pageNo-1)*10}, ${pageSize};`
  return query( _sql )
}
// 更新
exports.updatePost = (values) => {
  let _sql = `update users set name=?,pass=?,avator=?,moment=? where id=?`
  return query(_sql, values)
}

//获取省市区
exports.getArea = (pid, level) =>{
	let _sql = `select * from sh_area where pid='${pid}' or level='${level}';`
	return query(_sql)
}
