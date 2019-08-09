const mysql = require('mysql');

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	port: '3306',
	database: 'test',
});

connection.connect();

let modSql = 'UPDATE test01 SET name = ?,age = ? WHERE Id = ?';
let modSqlParams = ['菜鸟移动站', '12', 0];
//改
connection.query(modSql, modSqlParams, (err, result)=>{
	if(err) {
		console.log('[UPDATE ERROR] - ', err.message);
		return;
	}
	console.log('--------------------------UPDATE----------------------------');
	console.log('UPDATE affectedRows', result.affectedRows);
	console.log('-----------------------------------------------------------------\n\n');
});

connection.end();