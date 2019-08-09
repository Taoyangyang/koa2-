const fs = require('fs');
//首页
exports.indexPage = async (ctx, next) =>{
	ctx.type = 'text/html';
	ctx.body = fs.createReadStream('./views/index.html');
}
//关于
exports.aboutPage = async (ctx, next) =>{
	ctx.type = 'text/html';
	ctx.body = fs.createReadStream('./views/about.html');
}
