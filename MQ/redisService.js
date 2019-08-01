
// require('../server.babel'); // babel registration (runtime transpilation for node)
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

    keys () {
        return new Promise((resolve, reject) => {
            this.client.keys('*', (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    typeKeys (field) {
        return new Promise((resolve, reject) => {
            this.client.type(field, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    async typeKeysAll () {
        let keys = await this.keys();
        let res = new Map();
        if (!keys.length) return Promise.resolve(false);
        for (let k of keys) {
            res.set(k, await this.typeKeys(k));
        }
        return Promise.resolve(res);
    }

    set (key, value, timeout) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, 'ex', timeout, (err, res) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(res === 'OK');
                }
            })
        })
    }

    get (key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, res) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(res);
                }
            })
        })
    }

    setnx (key, value) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, 'nx', (err, res) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(res === 'OK');
                }
            })
        })
    }

    exists (key) {
        return new Promise((resolve, reject) => {
            this.client.exists(key, (err, res) => {
                if (err) {
                    reject(false);
                } else {
                    resolve(res ? true : false);
                }
            })
        })
    }

    strlen (key) {
        return new Promise((resolve, reject) => {
            this.client.strlen(key, (err, res) => {
                if (err) {
                    resolve(false)
                } else {
                    resolve(res ? true : false);
                }
            })
        })
    }

    setRange (key, offset, target) {
        return new Promise((resolve, reject) => {
            this.client.setrange(key, offset, target, (err, res) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(res ? true : false)
                }
            })
        })
    }

    getRange (key, start, end) {
        return new Promise((resolve, reject) => {
            this.client.getrange(key, start, end, (err, res) => {
                if (res) {
                    resolve(false);
                } else {
                    resolve(res);
                }
            })
        })
    }

    incr (key) {
        return new Promise((resolve, reject) => {
            this.client.incr(key, (err, res) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(res);
                }
            })
        })
    }

    incrBy (key, increment) {
        return new Promise((resolve, reject) => {
            this.client.incrby(key, increment, (err, res) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(res)
                }
            })
        })
    }

    decr (key) {
        return new Promise((resolve, reject) => {
            this.client.decr(key, (err, res) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(res);
                }
            })
        })
    }

    decrBy (key, decrment) {
        return new Promise((resolve, reject) => {
            this.client.decrby(key, increment, (err, res) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(res)
                }
            })
        })
    }

    mset (key, value) {
        return new Promise((resolve, reject) => {
            this.client.mset(key, value, (err, res) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(res === 'OK');
                }
            })
        })
    }

    mget (key) {
        return new Promise((resolve, reject) => {
            this.client.mget(key, (err, res) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(res);
                }
            })
        })
    }

    /** hash 哈希表 */

    hset (field, key, value) {
        return new Promise((resolve, reject) => {
            this.client.hset(field, key, value, (err, res) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve([1, 0].includes(res));
                }
            })
        })
    }

    hsetnx (field, key,value) {
        return new Promise((resolve, reject) => {
            this.client.hsetnx(field, key, value, (err, res) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve([0, 1].includes(res));
                }
            })
        })
    }

    hget (field, key) {
        return new Promise((resolve, reject) => {
            this.client.hget(field, key, (err, res) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(res);
                }
            })
        })
    }
    hdel (field, key) {
        return new Promise((resolve, reject) => {
            this.client.hdel(field, key, (err, res) => {
                if (err) {
                    resolve(false)
                } else {
                    resolve(res ? true : false);
                }
            })
        })
    }
    
    hlen (field) {
        return new Promise((resolve, reject) => {
            this.client.hlen(field, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }
    
    hStrLen (field, key) {
        return new Promise((resolve, reject) => {
            this.client.hstrlen(field, key, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    hkeys (field) {
        return new Promise((resolve, reject) => {
            this.client.hkeys(field, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    hvals (field) {
        return new Promise((resolve, reject) => {
            this.client.hvals(field, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    hGetAll (field) {
        return new Promise((resolve, reject) => {
            this.client.hgetall(field, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    /**list 有序数组 */

    lpush (field, ...value) {
        return new Promise ((resolve, reject) => {
            this.client.lpush(field, ...value, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    lpushx (field, ...value) {
        return new Promise((resolve, reject) => {
            this.client.lpushx(field, ...value, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res ? true : false);
                }
            })
            
        })
    }

    rpush (field, ...value) {
        return new Promise((resolve, reject) => {
            this.client.rpush(field, ...value, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    rpushx (field, ...value) {
        return new Promise((resolve, reject) => {
            this.client.rpushx(field, ...value, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res ? true : false);
                }
            })
        })
    }

    lrange (field, start, end) {
        return new Promise((resolve, reject) => {
            this.client.lrange(field, start, end, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    rPoplPush (source, destination) {
        return new Promise((resolve, reject) => {
            this.client.rpoplpush(source, destination, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res === null ? false : true);
                }
            })
        })
    }

    llen (field) {
        return new Promise((resolve, reject) => {
            this.client.llen(field, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    lrem (field, count, value) {
        return new Promise((resolve, reject) => {
            this.client.lrem(field, count, value, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    lindex (field, index) {
        return new Promise((resolve, reject) => {
            this.client.lindex(field, index, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    linsert (field, status, pivot, value) {
        return new Promise((resolve, reject) => {
            this.client.linsert(field, status, pivot, value, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    lset (field, index, value) {
        return new Promise((resolve, reject) => {
            this.client.lset(field, index, value, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res === 'OK');
                }
            })
        })
    }

    /**set 集合*/
    sadd (field, ...member) {
        return new Promise((resolve, reject) => {
            this.client.sadd(field, ...member, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res ? true : false);
                }
            })
        })
    }

    smembers (field) {
        return new Promise((resolve, reject) => {
            this.client.smembers(field, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    sismember (field, member) {
        return new Promise((resolve, reject) => {
            this.client.sismember(field, member, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res ? true : false);
                }
            })
        })
    }

    spop (field) {
        return new Promise((resolve, reject) => {
            this.client.spop(field, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    srandom (field, count) {
        return new Promise((resolve, reject) => {
            this.client.srandmember(field, count, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res)
                }
            })
        })
    }

    sremove (field, key) {
        return new Promise((resolve, reject) => {
            this.client.srem(field, key, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res ? true : false);
                }
            })
        })
    }

    scard (field) {
        return new Promise((resolve, reject) => {
            this.client.scard(field, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    /**交集 */
    sinter (field, ...field) {
        return new Promise((resolve, reject) => {
            this.client.sinter(field, ...field, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    /**取交集并保存到集合中 */
    sinterStore (destination, field, ...field) {
        return new Promise((resolve, reject) => {
            this.client.sinterstore(destination, field, ...field, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        }) 
    }

    /**并集 */
    sunion (field, ...field) {
        return new Promise((resolve, reject) => {
            this.client.sunion(field, ...field, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    sunionStore (destination, field, ...field) {
        return new Promise((resolve, reject) => {
            this.client.sunionstore(destination, field, ...field, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    /**差集 */
    sdiff (field, ...field) {
        return new Promise((resolve, reject) => {
            this.client.sdiff(field, ...field, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    sdiffStore (destination, ...field) {
        return new Promise((err, res) => {
            this.client.sdiffstore(destination, ...field, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res);
                }
            })
        })
    }

    /**有序集合 */

    /**
     * 
     * @param {*} field 
     * @param  {...any} score 
     * @param  {...any} member 
     * @returns
     * 返回成功添加的数量，不包括被更新的、已存在的成员
     */
    zadd (field, ...score, ...member) {
        return new Promise((resolve, reject) => {
            this.client.zadd(field, ...score, ...member, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    zscore (field, member) {
        return new Promise((resolve, reject) => {
            this.client.zscore(field, member, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    }

    


}

let fetch = async () => {
    let r = new RedisService();
    // let res = await r.get('tiny');
    // let x = await r.exists('tinys');
    // console.log('re: %s, %j', res, x);

    // let res = await r.hkeys('web');
    // console.log('res', res);

    // let res = await r.hvals('web');
    // let res = await r.keys();
    // let res = await r.typeKeys('tiny');
    // let res = await r.typeKeysAll()
    // let res = await r.hGetAll('web');
    // let res = await r.lpush('list', '123');
    // let res = await r.lrange('list', 0, 2);
    // let res = await r.lpushx('ddd', '1');
    // let res = await r.rPoplPush('master', 'road');
    // let res = await r.llen('list');
    // let res = await r.sadd('member', 'a', 'b', 'c');
    // let res = await r.sismember('member', 'a');
    // let res = await r.spop('member');
    // let res = await r.smember('member');
    let res = await r.scard('member');

    console.log('res', res);

    process.exit(0);
}

fetch();

