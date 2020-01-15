/**
 * net through 内网穿透
 * 内网穿透 ==>> NAT穿透 就是让外网能访问本地的服务，前提是要联网
 * NAPT 网络地址端口转换 是NAT技术的一种, 因为一个IP可以对应多个端口，所以通过多个内网IP和单个外网IP的多个端口映射实现信息通讯
 * 和VPN的区别：VPN可以让任意两台机器进入一个虚拟的局域网中，原理是通过操作系统虚拟一张网卡，虚拟网卡会跟VPN server协商得到一个虚拟的局域网IP，经过网卡拦截，通过加密封装后转发给VPN Server ，
 * 如果是虚拟局域网中的用户之间的通讯就把请求根据虚拟局域网的IP进行转发就可以了，翻墙的话，VPN Server会去修改数据的源IP为VPN Server 的IP地址，然后将数据发给需要访问的外部网络实现通讯
 * Nginx 反向代理也可以实现内网穿透功能，但是内网服务需要和Nginx部署的代理服务要在同一个网络环境下。但是通常情况下的代理服务和内网服务不再同一个网络环境下，所以Nginx不适合用来做内网穿透。
 *
 * 手动实现：原理。需要一个能访问外网资源的服务器作为代理，通过socket的 通讯隧道的方式建立代理服务器和内部服务器之间通讯，再由代理服务器访问外部资源传达给内部服务器。
 * server和client
 * server负责对外服务
 */

const net = require("net");

const map = new Map();
const getRandomStr = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 4; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

/**获取子域名 */
const getSubdomain = () => {
  const subdomain = getRandomStr();
  if (map.get(subdomain)) {
    return getSubdomain();
  } else {
    return subdomain;
  }
};

/**获取url上子域名参数 */
const getSubdomainFromUrl = data => {
  const content = data.toString();
  const match = content.match(/tunnelSubdoman=(\w*)/);
  if (match) {
    return match[1];
  }
};

/**建立与client端的通讯服务 */
const server = net.createServer(socket => {
  const subdomain = getSubdomain();
  map.set(subdomain, socket);
  /**返回子域名给client端 */
  socket.write(`Tunnel-Subdomain:${subdomain}`);
});

server.listen(9999, () => {
  console.log("==========================>>>> net server start");
});

/**接受外部请求 为了不做映射，直接从请求的url中获取数据*/
const web = net.createServer(socket => {
  let subdomain = "";
  socket.on("data", chunk => {
    if (!subdomain) {
      subdomain = getSubdomainFromUrl(chunk);
      map.get(subdomain).pipe(socket);
    }
    /**将请求转发给client端 */
    map.get(subdomain).write(chunk);
  });
});

web.listen(9997, () => {
  console.log("start web");
});
