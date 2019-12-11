const express = require("express");

const http = require("http");
const uuid = require("uuid").v1;
const SseStream = require("ssestream");
const path = require("path");
const PassThrough = require("stream").PassThrough;
const Readable = require("stream").Readable;

const app = express();

const __RR = function() {
	Readable.call(this.arguments);
};

__RR.prototype = new Readable();
__RR.prototype._read = function(data) {};

let streams = new __RR();

let sentCount = 1;
app.use(express.static(path.join("./static"), { maxAge: 8640000 }));

app.get("/sse", (req, res) => {
	req.id = uuid();
	console.log(`client[${req.id}] connect to server`);

	const lastEventId = req.headers["last-event-id"];

	/**单向通信
	 * 服务器推送到客户端
	 *
	 */
	/**断点续传 */
	if (lastEventId) {
		sentCount = +lastEventId + 1;
	}
	const sseStream = new SseStream(req);
	sseStream.pipe(res);
	console.log("res", sseStream);
	const pusher = setInterval(() => {
		/**必须返回的参数: id, event, retry, data */
		sseStream.write({
			id: sentCount,
			event: "server-time", //自定义消息的名称
			retry: 20000, //重试策略 断开链接后的20s内重连
			data: { ts: new Date().toTimeString(), count: sentCount++ } //消息体
		});
	}, 5000);

	res.on("close", () => {
		console.log(`client[${req.id}] disconnect to server`);
		clearInterval(pusher);
		sseStream.unpipe(res);
	});
});
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "./test.html")));

const server = http.createServer(app);
server.listen(3000, () => {
	console.log("listening on %d", server.address().port);
});
