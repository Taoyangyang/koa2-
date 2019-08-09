const Koa = require('koa');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
//console.log(ctx, next)
});

// Koa 提供一个 Context 对象，表示一次对话的上下文（包括 HTTP 请求和 HTTP 回复）。
// 通过加工这个对象，就可以控制返回给用户的内容。 
// Context.response.body属性就是发送给用户的内容

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`方法:${ctx.method}; 路径:${ctx.url}; - ${ms}毫秒`);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World！';
});

app.listen(3000);