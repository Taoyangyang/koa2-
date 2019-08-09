// app.js

const Koa = require('koa');
const app = new Koa();
const config = require('./config/default.js')
const static = require('koa-static');
const bodyParser = require('koa-bodyparser')

// 使用ctx.body解析中间件(post请求获取数据)
app.use(bodyParser())

// 将 public 目录设置为静态资源目录
const main = static(__dirname + '/public');
app.use(main);

// 路由（上面的 allowedMethods 用于校验请求的方法，如果用 post 请求访问 get 接口，就会直接返回失败）
//app.use(require('./routers/router.js').routes(), index.allowedMethods())
app.use(require('./routers/router.js').routes())

app.listen(config.port, ()=>{
	console.log(`已经启动${config.port}端口。`)
});