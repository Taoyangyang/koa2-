const mysql = require('mysql');

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	port: '3306',
	database: 'test',
});

connection.connect();

let delSql = 'DELETE FROM test01 where id=1';
//删
connection.query(delSql, (err, result)=>{
	if(err) {
		console.log('[DELETE ERROR] - ', err.message);
		return;
	}

	console.log('--------------------------DELETE----------------------------');
	console.log('DELETE affectedRows', result.affectedRows);
	console.log('-----------------------------------------------------------------\n\n');
});

connection.end();