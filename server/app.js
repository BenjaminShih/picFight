const Koa = require("koa");
const path = require("path");
const Router = require("koa-router");
const fs = require("fs");
const config = require("../config.js");
const uploadFile = require('./uploadFile.js');
const mongoose = require('mongoose');
const app = new Koa();
const router = new Router();
// var koaBody = require('koa-body');

const rootPath = config.rootPath;

const indexPath = '/client/index.html';

// var db = mongoose.connect('mongodb://localhost:27017/picFight');

// var picsSchema = new mongoose.Schema({
//     text: String,
//     url: String,
// });

// var picsModel = mongoose.model('pics', picsSchema);

// var picsEntity = new picsModel({
//     text: '666',
//     url: 'www.google.com',
// }).save( function( err ){
//     if(!err){
//         console.log('pic saved!');
//     }
// });
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

// 接收图片路径返回图片
router.get('/client/assets/pics/:pic', async (ctx) => {
	let picPath = path.join(rootPath, ctx.request.url)
	let picContent = fs.readFileSync(picPath, 'binary');
	ctx.status = 200;
    ctx.res.write(picContent, 'binary');
    ctx.res.end();
})

router.post('/upload', async (ctx) => {
	const picSavePath = rootPath + '/client/assets/pics/';
	const result = await uploadFile(ctx, picSavePath);
	ctx.status = 200;
	if (result) {
		ctx.body = { resp_code: '0000', resp_msg: '上传成功！' }
		return;
	}
	ctx.body = { resp_code: '9999', resp_msg: '上传失败！' }
})

app.listen(3000);