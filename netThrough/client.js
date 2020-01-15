const net = require("net");

/**建立跟本地服务链接 : 8888 本地要起一个端口为8888的服务*/
const local = net.createConnection({
  port: 8888
});

/**建立跟server端的链接 9999 */
const client = net.createConnection({
  port: 9999
});

/**客户端收到请求 */
client.on("data", data => {
  const content = data.toString();
  /**若有子域名， 则输出子域名, 否则将数据转发给本地服务 */
  if (~content.indexOf("Tunnel-Subdomain")) {
    console.log("content", content);
  } else {
    local.write(data);
  }
});

/**本地服务将处理结果返回到client端 */
local.on("data", data => {
  client.write(data);
});
