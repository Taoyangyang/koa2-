const Koa = require('koa');
const app = new Koa();

//为了方便处理错误，最好使用try...catch将其捕获。但是，为每个中间件都写try...catch太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理
const handler = async(ctx, next) => {
	try {
		await next();
	} catch(err) {
		ctx.response.status = err.statusCode || err.status || 500;
		ctx.response.body = {
			message: err.message
		};
		//-=-=如果错误被try...catch捕获，就不会触发error事件。这时，必须调用ctx.app.emit()，手动释放error事件，才能让监听函数生效
		ctx.app.emit('error', err, ctx);
	}
};

const main = ctx => {
	ctx.throw(500);
};

//-=-=main函数抛出错误，被handler函数捕获。catch代码块里面使用ctx.app.emit()手动释放error事件，才能让监听函数监听到
app.on('error', function(err) {
	console.log('logging error ', err.message);
	console.log(err);
})

app.use(handler);
app.use(main);

app.listen(3000);