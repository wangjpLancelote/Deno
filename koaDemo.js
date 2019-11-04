var http = require("http");
var koaStatic = require("koa-static");
var path = require("path");
var koaBody = require("koa-body"); //文件保存库
var fs = require("fs");
var Koa = require("koa2");
let http2 = require("http2");

var app = new Koa();
var port = process.env.PORT || "8100";

var uploadHost = `http://localhost:${port}/uploads/`;

app.use((ctx, next) => {
	ctx.set("Access-Control-Allow-Origin", "*");
	ctx.set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
	ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
	if (ctx.method == "OPTIONS") {
		ctx.body = 200;
	}
	next();
});

app.use(
	koaBody({
		formidable: {
			//设置文件的默认保存目录，不设置则保存在系统临时目录下  os
			uploadDir: path.resolve(__dirname, "./static/uploads")
		},
		multipart: true // 开启文件上传，默认是关闭
	})
);

//开启静态文件访问
app.use(koaStatic(path.resolve(__dirname, "./static")));

//文件二次处理，修改名称
app.use(ctx => {
	var file = ctx.request.files.f1; //得道文件对象
	var result = [];
	if (!Array.isArray(file)) {
		file = [file];
	}

	file &&
		file.forEach(item => {
			let path = item.path;
			let fname = item.name;
			let nextPath = path + fname;
			if (item.size > 0 && path) {
				let extArr = fname.split(".");
				let ext = extArr[extArr.length - 1];
				let nextPath = path + "." + ext;
				fs.renameSync(path, nextPath);
				result.push(uploadHost + nextPath.slice(nextPath.lastIndexOf("/") + 1));
			}
		});

	// }
	//以 json 形式输出上传文件地址
	ctx.body = `{
        "fileUrl":${JSON.stringify(result)}
    }`;
});

/**
 * http server
 */
var server = http.createServer(app.callback());
server.listen(port);
console.log("demo-koa server start ......   ");
