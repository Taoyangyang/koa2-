const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('fs');
const koaBody = require('koa-body');
const route = require('koa-route');

const app = new Koa();

const html = ctx => {
	ctx.response.type = 'html';
	ctx.response.body = fs.createReadStream('./html/15.file-upload.html');
};

const main = async function(ctx) {
	const tmpdir = os.tmpdir();
	const filePaths = [];
	const files = ctx.request.body.files || {};

	for(let key in files) {
		const file = files[key];
		const filePath = path.join(tmpdir, file.name);
		const reader = fs.createReadStream(file.path);
		const writer = fs.createWriteStream(filePath);
		reader.pipe(writer);
		filePaths.push(filePath);
	}

	ctx.body = filePaths;
};

app.use(koaBody({ multipart: true }));
app.use(route.get('/', html));
app.use(route.post('/file', main))

app.listen(3000);