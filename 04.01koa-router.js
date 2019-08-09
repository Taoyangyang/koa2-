const Koa = require('koa');
const app = new Koa();

//使用原生路由
const main = ctx => {
		console.log(ctx.request.path)
		if(ctx.request.path =='/favicon.ico'){
			
		} else if (ctx.request.path !== '/') {
    		ctx.response.type = 'html';
    		ctx.response.body = '<a href="/">Index Page</a>';
		} else {
    		ctx.response.body = 'Hello World---test';
		}
};

//使用封装好的koa-route模块(npm install koa-route@next)
const route = require('koa-route');

const index = ctx => {
  	ctx.response.type = 'html';
  	ctx.response.body = '<a href="/">Index Page---index</a>';
};

const about = ctx => {
  	ctx.response.body = 'Hello World---about';
};

app.use(route.get('/index', index));
app.use(route.get('/about', about))

app.use(main);
app.listen(3000);