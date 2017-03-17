const Koa = require("koa");
const path = require("path");
const Router = require("koa-router");
const fs = require("fs");
const app = new Koa();
const router = new Router();

const indexPath = '../client/index.html'

app.use(router.routes())
	.use(router.allowedMethods())

// 日志相关
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method}${ctx.url} - ${ms}ms`);
})

// 返回html
app.use (ctx => {
	let filePath = path.join(__dirname, indexPath);
	let content = fs.readFileSync(filePath, 'binary');
	ctx.body = content;
})

// 接收图片路径返回图片
router.get('/client/assets/pics/:pic', async (ctx) => {
	let picPath = path.join(__dirname, ".." + ctx.request.url)
	let picContent = fs.readFileSync(picPath, 'binary');
	ctx.status = 200;
    ctx.res.write(picContent, 'binary')
    ctx.res.end()
})

app.listen(3000);