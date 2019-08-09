const Koa = require('koa');
const app = new Koa();

const fs = require('fs');

// 读取静态文件
const path = require('path');
const serve = require('koa-static');

const staticFile = serve(path.join(__dirname));
app.use(staticFile);

const main = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./html/01.html');
};

app.use(main);
app.listen(3000);