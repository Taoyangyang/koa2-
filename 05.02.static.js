const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(static(
	path.join(__dirname, staticPath)
))

app.use(async(ctx) => {
	ctx.body = `<h2>hello world</h2>
		<a href='/images/01.jpg'>图片链接</a>
		<img src='/images/01.jpg' />
	`
})

app.listen(3000, () => {
	console.log('[demo] static-use-middleware is starting at port 3000')
})