const Koa = require("koa");
const path = require("path");
const Router = require("koa-router");
const fs = require("fs");
const config = require("../config.js");
const uploadFile = require('./utils/uploadFile.js');
const mongoose = require('mongoose');
const koaBody = require('koa-body');

const app = new Koa();
const router = new Router();

const { savePicToDB, findPicsFromDB } = require('./controllers/pics.js')


const rootPath = config.rootPath;

const indexPath = '/dist/index.html';

// 配置mongoose，避免报错
// (node:5590) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
let db = mongoose.connect('mongodb://localhost:27017/picFight');


// koa-body相关，暂时先注释
app.use(koaBody());
// app.use(koaBody({ multipart: true, formidable: { hash: 'md5' } }));



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
	let filePath = path.join(rootPath, indexPath);
	let content = fs.readFileSync(filePath, 'binary');
	ctx.body = content;
})

router.post('/pics', async (ctx) => {
    await findPicsFromDB({}).then((arr) => {
		ctx.status = 200;
		ctx.body = arr;
	}).catch((err) => {
		console.log('find pics failed---', err)
	})
})

// 接收图片路径返回图片
router.get('/client/assets/pics/:pic', async (ctx) => {
	let picPath = path.join(rootPath, ctx.request.url);
	let picContent = fs.readFileSync(picPath, 'binary');
	ctx.status = 200;
    ctx.res.write(picContent, 'binary');
    ctx.res.end();
})

// 返回js
router.get('/bundle.js', async (ctx) => {
	let jsPath = path.join(rootPath+ '/dist', ctx.request.url);
	let jsContent = fs.readFileSync(jsPath, 'binary');
	ctx.status = 200;
    ctx.res.write(jsContent, 'binary');
    ctx.res.end();
})

// 上传图片
router.post('/upload', async (ctx) => {
	// 图片相对路径
	let picRelativePath
	// 图片磁盘路径
	const picSavePath = rootPath + '/client/assets/pics/';
	// 上传图片存入磁盘
	const result = await uploadFile(ctx, picSavePath);
	if (result.isOk) {
		// 截取相对路径
		if (result.filePath) {
			picRelativePath = result.filePath.substring(rootPath.length)
		}
		// 将图片相对路径存入数据库
		savePicToDB(picRelativePath);
		// 响应状态成功文案
		ctx.body = { resp_code: '0000', resp_msg: '上传成功！' };
		// 响应状态为成功
		ctx.status = 200;
		return;
	}
	// 上传失败文案
	ctx.body = { resp_code: '9999', resp_msg: '上传失败！' }
})

app.listen(3000);