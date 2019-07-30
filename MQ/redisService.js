import redis from 'redis'
import Bluebird from 'bluebird'

export default class RedisService {
    constructor () {
        this.client = redis.createClient({
            host: '127.0.0.1',
            port: 6379,
            retry_strategy : (options) => { //重连策略
                if (options.error && options.error.code === 'ECONNREFUSED') {
                    return new Error('server refused connection');
                }

                if (options.total_retry_time > 60 * 60 * 1000) {
                    return new Error('retry time exhaust');
                }

                if (options.attempt > 10) {
                    return undefined;
                }

                return Math.min(options.attempt * 100, 3000);
            }
        });
    }

    static sleep (sec) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, sec * 1000)
        })
    }
}