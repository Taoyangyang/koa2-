const userPort = require('../sqldb/mysql.js');
const md5 = require('md5');
const fs = require('fs');
const moment = require('moment')

//注册
exports.postSignup = async ctx => {
	let { name, password, repeatpass, avator } = ctx.request.body;
	await userPort.findUserData(name).then(async(result) => {
		console.log(result)
		if(result.length) {
			try {
				throw Error('用户已经存在')
			} catch(error) {
				//处理err
				console.log(error)
			}
			// 用户存在
			ctx.body = {
				code: 500,
				message: '用户存在'
			};

		} else if(password !== repeatpass || password === '') {
			ctx.body = {
				code: 500,
				message: '两次输入的密码不一致'
			};
		} else {
			let base64Data = avator.replace(/^data:image\/\w+;base64,/, "");
			let dataBuffer = new Buffer(base64Data, 'base64');
			let getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now()
			let upload = await new Promise((reslove, reject) => {
				fs.writeFile('./public/tmp/' + getName + '.png', dataBuffer, err => {
					if(err) {
						throw err;
						reject(false)
					};
					reslove(true)
					console.log('头像上传成功')
				});
			})
			console.log('upload', upload)
			if(upload) {
				await userPort.insertData([name, md5(password), getName + '.png', moment().format('YYYY-MM-DD HH:mm:ss')])
					.then(res => {
						console.log('注册成功', res)
						//注册成功
						ctx.body = {
							code: 200,
							message: '注册成功'
						};
					})
			} else {
				consol.log('头像上传失败')
				ctx.body = {
					code: 500,
					message: '头像上传失败'
				}
			}
		}
	})
}

//获取数据
exports.searchData = async ctx => {
	console.log(ctx.request.query, "=- query -=")
	let { name, pageSize=10, pageNo=1 } = ctx.request.query;
	await userPort.findUserData(name, pageSize, pageNo).then( async(result) => {
		console.log(result)
		if(result.length){
			ctx.body = {
				code   : 200,
				message: '查询成功',
				data   : result
			}
		}else{
			ctx.body = {
				code: 500,
				message: "没有找到"
			}
		}
	})
}
//删除用户
exports.deleteUser = async ctx =>{
	console.log(ctx.request.query, "-=-id-=-")
	let {id} = ctx.request.query;
	await userPort.deleteUserData(id).then( async(result) =>{
		console.log(result)
		ctx.body = {
			code   : 200,
			message: '删除成功',
			data   : result
		}
	})
}
//更新用户
exports.updatePost = async ctx =>{
	let { name, password, avator, id } = ctx.request.body;
	
	let base64Data = avator.replace(/^data:image\/\w+;base64,/, "");
	let dataBuffer = new Buffer(base64Data, 'base64');
	let getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now();
	let upload = await new Promise((reslove, reject) => {
		fs.writeFile('./public/tmp/' + getName + '.png', dataBuffer, err => {
			if(err) {
				throw err;
				reject(false)
			};
			reslove(true)
			console.log('头像上传成功')
		});
	})
	console.log('upload', upload)
	
	if(upload){
		await userPort.updatePost([name, md5(password), getName + '.png', moment().format('YYYY-MM-DD HH:mm:ss'), id])
		.then( async(result) =>{
			console.log(result)
			ctx.body = {
				code   : 200,
				message: '修改成功',
				data   : result
			}
		})
	}
}

//获取省市区
exports.getAres = async ctx=>{
	let {pid, level} = ctx.request.query;
	await userPort.getArea(pid, level).then(res=>{
		console.log(res);
		ctx.body = {
			code   : 200,
			message: "成功",
			data   : res
		}
	})
}
