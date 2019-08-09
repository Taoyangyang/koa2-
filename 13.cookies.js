const Koa = require('koa');
const app = new Koa();

//ctx.cookies用来读写 Cookie
//ctx.cookies.get(name, [options]) 读取上下文请求中的cookie
//ctx.cookies.set(name, value, [options]) 在上下文中写入cookie
const main = function(ctx) {
	const n = Number(ctx.cookies.get('view') || 0) + 1;
	//ctx.cookies.set('view', n)
	ctx.cookies.set('view', n, {
		domain: 'localhost', 				// 写cookie所在的域名
		path: '/', 							// 写cookie所在的路径
		maxAge: 10 * 60 * 1000, 			// cookie有效时长
		expires: new Date('2019-02-15'), 	// cookie失效时间
		httpOnly: false, 					// 是否只用于http请求中获取
		overwrite: false 					// 是否允许重写
	});
	ctx.response.body = n + ' views';
}

app.use(main);
app.listen(3000);