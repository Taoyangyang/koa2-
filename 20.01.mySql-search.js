const mysql = require('mysql');

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	port: '3306',
	database: 'test',
});

connection.connect();

let sql = 'SELECT * FROM test01';
//查
connection.query(sql, (err, result)=>{
	if(err) {
		console.log('[SELECT ERROR] - ', err.message);
		return;
	}

	console.log('--------------------------SELECT----------------------------');
	console.log(result);
	console.log('------------------------------------------------------------\n\n');
});

connection.end();