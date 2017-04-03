const Koa = require("koa");
const path = require("path");
const Router = require("koa-router");
const fs = require("fs");
const config = require("../config.js");
const uploadFile = require('./utils/uploadFile.js');
const mongoose = require('mongoose');
const koaBody = require('koa-body');

const convert = require('koa-convert')
const webpack = require('webpack')

const webpackHotMiddleware = require('koa-webpack-hot-middleware')
const webpackConfig = require('../webpack.config.js')
let clientCompiler = webpack(webpackConfig)

const app = new Koa();
const router = new Router();


// 操作数据库函数
const { savePicToDB, findPicsFromDB, deletePicFromDB } = require('./controllers/pics.js')
const { saveUserToDB, findUserFromDB } = require('./controllers/user.js')




const rootPath = config.rootPath;

const indexPath = '/dist/index.html';

// 配置mongoose，避免报错
// (node:5590) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
let db = mongoose.connect('mongodb://localhost:27017/picFight');


// koa-body解析post的body
app.use(koaBody());


app.use(router.routes())
	.use(router.allowedMethods())


app.use(convert(require("koa-webpack-dev-middleware"))(clientCompiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(convert(webpackHotMiddleware(clientCompiler)));

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

// 删除磁盘上的图片文件
function deletePicOnDisk(file) {
	console.log('fs.existsSync(file)', fs.existsSync(file), file)
	if(fs.existsSync(file)) {
		fs.unlink(file, (err) => {
			if(err) {
				console.log('delete pic on disk failed---', err)
				return
			}
			console.log('delete pic on disk successfully!')
		})
	}
}

// 删除一张图片
router.post('/delete/pic', async(ctx) => {
	await deletePicFromDB(ctx.request.body).then((result) => {
		let file = rootPath + ctx.request.body.url
		deletePicOnDisk(file)
		ctx.status = 200;
		ctx.body = result;
	}).catch((err) => {
		console.log('delete pic failed---', err)
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

// 注册
router.post('/signup', async (ctx)=> {
	await saveUserToDB(ctx.request.body).then((res) => {
		if(res) {
			ctx.status = 200;
			ctx.body = true;
		}
	}).catch((err) => {
		console.log('save user failed---', err)
	})
})


// 登录
router.post('/signin', async (ctx)=> {
	console.log('ctx.request.body', ctx.request.body)
	await findUserFromDB(ctx.request.body).then((res) => {
		console.log('res', res)
		if(res) {
			ctx.status = 200;
			ctx.body = true;
		} else {
			ctx.status = 200;
			ctx.body = false;
		}
	}).catch((err) => {
		console.log('find user failed---', err)
	})
})

app.listen(3000);