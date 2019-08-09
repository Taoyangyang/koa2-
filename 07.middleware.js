const Koa = require('koa');
const app = new Koa();


//处在 HTTP Request 和 HTTP Response 中间，用来实现某种中间功能。app.use()用来加载中间件。
//基本上，Koa 所有的功能都是通过中间件实现的，前面例子里面的main也是中间件。每个中间件默认接受两个参数，第一个参数是 Context 对象，第二个参数是next函数。只要调用next函数，就可以把执行权转交给下一个中间件。
//多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行
//如果中间件内部没有调用next函数，那么执行权就不会传递下去
const one = (ctx, next) => {
	console.log('>> one');
	next();
	console.log('<< one');
}

const two = (ctx, next) => {
	console.log('>> two');
	next();
	console.log('<< two');
}

const three = (ctx, next) => {
	console.log('>> three');
	next();
	console.log('<< three');
}

app.use(one);
app.use(two);
app.use(three);

app.listen(3000);