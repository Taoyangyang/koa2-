const Koa = require('koa');
const koaBody = require('koa-body'); //npm install koa-body
const route = require('koa-route');
const fs = require('fs');
const mysql = require('mysql');
const app = new Koa();

function getDb() {
	var mysqlHost = 'localhost';
	var mysqlUser = 'root';
	var mysqlPwd = '';
	var mysqlDb = 'test';

	var connection = mysql.createConnection({
		host: mysqlHost,
		user: mysqlUser,
		password: mysqlPwd,
		database: mysqlDb,
		multipleStatements: true,			//可以执行多条sql语句
	});
	return connection;
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    console.log(fmt," -=-=-")
    return fmt;
}

const html = ctx => {
	ctx.response.type = 'html';
	ctx.response.body = fs.createReadStream('./html/21.form.html');
};

const addData = async(ctx, next) => {
	const body = ctx.request.body;
	console.log('获取用户信息===>', body)
	if(!body.name) ctx.throw(400, '.name required');

	ctx.response.type = 'application/json';
	//因为是异步调用，所以数据库的query需要放在promise对象里面
	let tmp = await new Promise(function(success, fail) {
		//创建数据库链接的对象，此时还没有链接mysql数据库
		let db = getDb();
		//调用connect来链接数据库，接收一个回调函数，参数是err，如果为null则是链接成功，否则失败
		db.connect(function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log('连接数据库成功');
				//结果会在回调函数里返回，第一个参数是错误信息，第二个是返回结果
				let addSql = 'INSERT INTO test01(name, age, date) VALUES(?,?,?)';
				let addSqlParams = [body.name, body.age, new Date().Format("yyyy-MM-dd hh:mm:ss")];
				db.query(addSql, addSqlParams, (err, result) => {
					if(err) {
						fail(err);
					} else {
						//之前提到过的，await后面一般是需要一个promise对象的，只要调用success就会把结果返回
						success({ code: 0, data: {}, msg:'添加成功！' });
						console.log('--------------------------INSERT----------------------------');
						//console.log('INSERT ID:',result.insertId);        
						console.log('INSERT ID:', result);
						console.log('-----------------------------------------------------------------\n\n');
						//完成数据库的访问后关闭连接
						db.end();
					}
				});
			}
		});
	});
	console.log(tmp);
	//转为json字符串返回给浏览器
	ctx.response.body = JSON.stringify(tmp);
};

const getData = async(ctx, next) => {
	const body = ctx.request.body;
	ctx.response.type = 'application/json';
	let tmp = await new Promise(function(success, fail) {
		let db = getDb();
		db.connect(function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log('连接数据库成功');
				//查-连接数据库成功后，可以发送sql语句了，这里是选取test01表里的所有数据
				//let sql = 'SELECT * FROM test01;
				let sql = 'SELECT * FROM test01 limit '+(body.pageNo-1)*body.pageSize+','+body.pageSize;
				let totalCount = 'SELECT COUNT(*) AS count FROM test01';
				//多条件语句查询（multipleStatements:true）
				db.query(sql +";"+ totalCount, (err, result) => {
					if(err) {
						fail(err);
					} else {
						//之前提到过的，await后面一般是需要一个promise对象的，只要调用success就会把结果返回
						success({ code: 0, data: {data: result[0]}, count: result[1][0].count });
						console.log('--------------------------SELECT----------------------------');
						console.log(result);
						console.log('------------------------------------------------------------\n\n');
						//完成数据库的访问后关闭连接
						db.end();
					}
				});
			}
		})
	})
	console.log(tmp);
	//转为json字符串返回给浏览器
	ctx.response.body = JSON.stringify(tmp);
}

const delData = async(ctx, next) => {
	const body = ctx.query;
	console.log('获取用户信息===>', body)
	let tmp = await new Promise(function(success, fail) {
		let db = getDb();
		db.connect(function(err) {
			if(err) {
				console.log(err);
			} else {
				let delSql = 'DELETE FROM test01 where id='+body.id;
				//删
				db.query(delSql, (err, result) => {
					if(err) {
						fail(err);
					} else {
						//之前提到过的，await后面一般是需要一个promise对象的，只要调用success就会把结果返回
						success({ code: 0, data: {}, msg:'删除成功！' });
						console.log('--------------------------SELECT----------------------------');
						console.log(result);
						console.log('------------------------------------------------------------\n\n');
						//完成数据库的访问后关闭连接
						db.end();
					}
				});
			}
		})
	})
	console.log(tmp);
	//转为json字符串返回给浏览器
	ctx.response.body = JSON.stringify(tmp);
}

const updataData = async(ctx, next) => {
	const body = ctx.query;
	console.log('获取用户信息===>', body)
	let tmp = await new Promise(function(success, fail) {
		let db = getDb();
		db.connect(function(err) {
			if(err) {
				console.log(err);
			} else {
				let modSql = 'UPDATE test01 SET name = ?,age = ? WHERE Id = ?';
				let modSqlParams = [body.name, body.age, body.id];
				//删
				db.query(modSql, modSqlParams, (err, result) => {
					if(err) {
						fail(err);
					} else {
						//之前提到过的，await后面一般是需要一个promise对象的，只要调用success就会把结果返回
						success({ code: 0, data: {}, msg:'修改成功！' });
						console.log('--------------------------SELECT----------------------------');
						console.log(result);
						console.log('------------------------------------------------------------\n\n');
						//完成数据库的访问后关闭连接
						db.end();
					}
				});
			}
		})
	})
	console.log(tmp);
	//转为json字符串返回给浏览器
	ctx.response.body = JSON.stringify(tmp);
}

app.use(koaBody());
app.use(route.get('/', html));
app.use(route.post('/add', addData))
app.use(route.post('/search', getData))
app.use(route.get('/del', delData))
app.use(route.get('/updata', updataData))

app.listen(3000, () => {
	console.log("已启动3000端口")
});