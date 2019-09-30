// const Axios = require('../axiosFP');
import Axios from '../axiosFP';

let axios = Axios.Axios;

axios.config.baseURL = 'http://127.0.0.1:3333';

axios.interceptors.request.use(cn => {
	console.log('请求配置信息', cn);
	return cn;
});

axios.interceptors.request.use(cn => {
	cn.headers.token = 'x-token-654321';
	return cn;
});

axios.interceptors.response.use(res => {
	console.log('请求响应信息', res);
	return res;
});

axios.interceptors.response.use(res => {
	res.msg = 'request is ok';
	return res;
});

axios.get('/test', { headers: { token: 'x-token-123456' } }).then(res => {
	console.log('res', res);
});
