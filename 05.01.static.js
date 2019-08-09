const Koa = require('koa');
const app = new Koa();

//如果网站提供静态资源（图片、字体、样式表、脚本......），为它们一个个写路由就很麻烦，也没必要(npm install koa-static)
const path = require('path');
const serve = require('koa-static');

const main = serve(path.join(__dirname));

app.use(main);
app.listen(3000);       // http://localhost:3000/static/images/01.jpg