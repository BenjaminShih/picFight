const Busboy = require('busboy');
const path = require("path");
const fs = require("fs");
module.exports = (ctx, savePath) => new Promise(resolve => {

  const busboy = new Busboy({headers: ctx.req.headers});
  let length = 0;

  // 使用busyboy处理上传的文档
  busboy.on("file", (fieldname, fileStream, filename, encoding, mimetype) => {

    // 查询扩展名
    const ext = path.extname(filename);
    // 随机名字
    const newFilename = (new Date).getTime() + ext;
    // 文档路径
    const filePath = path.join(savePath, newFilename);
    // promise resolve出去的参数
    const result = {};

    // 以流的形式上传文档
    fileStream.pipe(fs.createWriteStream(filePath));

    // 打印文档上传进度
    fileStream.on('data', function(data) {
      length += data.length;
      console.log("upload size:" + length);
    });

    // 上传结束
    fileStream.on('end', function() {
      console.log("upload end!");
      result.isOk = true;
      result.filePath = filePath;
      return resolve(result);
    });

    // 上传出错
    fileStream.on('error', function(err) {
      console.error("uploadFile error.");
      result.isOk = false;
      return resolve(result);
    });
  });

  // 全部上传完成
  busboy.on('finish', () => {
    console.log("busboy finish!");
    // return resolve(result);
  });

  ctx.req.pipe(busboy);
})