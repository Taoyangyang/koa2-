const Koa = require('koa');
const koaBody = require('koa-body');  //npm install koa-body
const route = require('koa-route');
const fs = require('fs');
const app = new Koa();

//表单就是 POST 方法发送到服务器的键值对。koa-body模块可以用来从 POST 请求的数据体里面提取键值对(可以在git的黑窗口；直接运行测试： $ curl -X POST --data "name=Jack" localhost:3000)
const html = ctx => {
	ctx.response.type = 'html';
	ctx.response.body = fs.createReadStream('./html/14.form.html');
};

const main = async function(ctx) {
    const body = ctx.request.body;
	if(!body.name) ctx.throw(400, '.name required');
	ctx.body = {
		name: body.name,
		age : body.age,
		date: new Date()
	};
};

app.use(koaBody());
app.use(route.get('/', html));
app.use(route.post('/name', main))

app.listen(3000);
console.log('[demo] start-quick is starting at port 3000')