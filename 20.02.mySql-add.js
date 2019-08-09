const mysql = require('mysql');

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	port: '3306',
	database: 'test',
});

connection.connect();

let addSql = 'INSERT INTO test01(Id, name, age) VALUES(0,?,?)';
let addSqlParams = ['taoyang', '20'];
//增
connection.query(addSql, addSqlParams, (err, result)=>{
	if(err) {
		console.log('[INSERT ERROR] - ', err.message);
		return;
	}

	console.log('--------------------------INSERT----------------------------');
	//console.log('INSERT ID:',result.insertId);        
	console.log('INSERT ID:', result);
	console.log('-----------------------------------------------------------------\n\n');
});

connection.end();