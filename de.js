const _ = require('lodash');
const key = 'wangjianpingabcdefghijklmnuvwrstxyz1234567890';
const moment = require('moment');
const crypto = require('crypto');
const superagent = require('superagent');
const appSecret = 'DE89AE71DDC74E639D1B70AC022D68C8';
const appKey = '338f8ee1c88d36f69812cbd299de2677';

let a = [1,2,3,4];
// _.each(a, (v) => {
//     console.log('v', v);
// })
const md5 = require('crypto').createHash('md5');
// md5.update(key + Date.now());
// let t = md5.digest('hex');
let timestamp = Date.now();
const appId = '338f8ee1c88d36f69812cbd299de2677';
// console.log(t);
const body = {
    "title":"工单标题",
    "uid":"someone",
    // "uniqueId":"123456789ABCDE",
    "typeId":0,
    "content":"我有一个问题",
    "userName":"游客1",
    "userMobile":"18888888888",
    "userEmail":"some@163.com",
    // "targetStaffId":12345,
    "targetGroupId":264108673,
    "staffId":283445,
    "priority": 5,
    "templateId":1234,
    // "follower":["1001","1003"],
    "attachments":[
      {
        "fileName":"附件1.txt",
        "type":1,
        "payload":"附件BASE64"
      }
    ],
    "properties":[
      {
        "key":"服务器",
        "value":"瘦西湖"
      },
      {
        "key":"玩家ID",
        "value":"12345"
      }
    ],
    "customFields":[
      {
        "id":12345,
        "value":"你好"
      },
      {
        "id":12346,
        "value":"恩"
      }
    ]
  };

/**
 * 七鱼接口 query参数
 * @param {*} body 
 */
const getCheckQuery = (body = {}) => {
    let unix = moment().unix();
    console.log('checksum', checksum(JSON.stringify(body), unix));
    return `appKey=${appId}&time=${unix}&checksum=${checksum(JSON.stringify(body), unix)}`;
}


const checksum = (content, time) => {
    const sha1 = crypto.createHash('sha1');
    const md5 = crypto.createHash('md5');
    md5.update(content);
    sha1.update(appSecret + md5.digest('hex') + time);
    return sha1.digest('hex');
  }

/**
 * 获取accessToken
 * @param {} timestamp  时间戳
 */
const getAccessToken = (timestamp) => {
    md5.update(appKey + timestamp);
    return md5.digest('hex');
}
// console.log('Query', getCheckQuery(body));
// superagent.post(`https://qiyukf.com/openapi/v2/ticket/create?` + getCheckQuery(body))
// .set('Content-Type', 'application/json;charset=utf-8')
// .send(body)
// .end((err, res) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('res', JSON.parse(res.text));
//     }
// })

console.log('token', getAccessToken(timestamp), timestamp);

/**
 * 
 * 给定两个已排序的数组，找出这两个数组合起来后排在中间位置的数
 * 时间复杂度：O(log(m + n))
 * @template T
 * @param {[*]} arr1
 * @param {[*]} arr2
 * @returns
 * number
 */
const defFindMedianOfTwoArray = (arr1, arr2) => {
    if (!arr1.length && !arr2.length) return new Error('can not both empty array');

    let item1 = arr1.length ? arr1[0] : Infinity;
    let item2 = arr2.length ? arr2[0] : Infinity;

    if ([Infinity].includes(item1, item2)) {
        return item1 === Infinity ? (arr2.length & 1) ? 
            ((arr2[Math.floor(arr2.length / 2)] + arr2[Math.ceil(arr2.length / 2)]) / 2) : arr2[arr2.length / 2]
                    : (arr1.length & 1) ?
                        ((arr1[Math.floor(arr1.length / 2)] + arr1[Math.ceil(arr1.length / 2)]) / 2) : arr1[arr1.length / 2]
    } else {
        // let target = item1 < item2 ? arr1 : arr2;
        // for (let i = 0; i < target.length; ++i) {
        //     let ahead = target.toString() === item1.toString() ? item2 : item1;
        //     let idx = ahead.indexOf(target[i]);
        // }
        let len = arr1.length + arr2.length;
        let idx = [];
        let tmp = [];
        if ((len & 1) === 0) {
            idx = [len / 2, (len / 2 + 1)];
        } else {
            idx = [Math.floor(len / 2), Math.ceil(len / 2)];
        }
        console.log('idx', idx);
        if (!idx.length) return false;
        let L = arr1.length > arr2.length ? arr1.length : arr2.length;
        find : {
            for (let i = 0; i < idx[1]; ++i) {
                console.log('i', i);
                if (idx.length === 1) {
                    if (i > idx.pop() - 1) break find; //超过了所求下标，就跳出循环
                } else {
                    if (i > idx[1] - 1) break find;
                }
                // if (i + 1 > (arr1.length > arr2.length ? arr2.length : arr1.length)) i -= (arr1.length > arr2.length ? arr2.length : arr1.length);
                tmp.push(arr1[i] <= arr2[i] ? arr1[i] : arr2[i]);
            }
        }

        console.log('tmp', tmp);
        return tmp.slice(-2).reduce((v, k) => {
            return v += k;
        }, 0) / 2;
    }
}

// let r = defFindMedianOfTwoArray([1, 2], [3, 4]);
// console.log('r', r);

/**
 * 
 * 找到第一个缺失的正数
 * @param {[*]} array
 * @returns
 * number
 */
const findFirstPositive = (array) => {
    if (!array.length) return false;
    let t = 0;
    for (let i = 0; i < array.length; ++i) {
        if (array[i] <= 0) continue;
        !t ? t = array[i] : (array[i] < t ? t = array[i] : t);
    }
    if (t > 1) return 1;
    array = array.filter((item) => {return item > 0});
    for (let i = 0; i < array.length; ++i) {
        if (array.includes(++t)) {
            continue;
        } else {
            break;
        }
    }
    return t;
}

// let r = findFirstPositive([7, 8, 9, 11, 12]);
// console.log('r', r); //1

/**
 * 计算m 的 n次幂
 * @param {*} m 
 * @param {*} n 
 */
const pow = (m, n) => {
    let isPosix = n < 0 ? true : false;
    n = Math.abs(Number(n));
    let res = 1;
    for (let i = 0; i < n; ++i) {
        res *= m;
    }
    console.log(res);
    return isPosix ? 1/res : res;
}
// let r = pow(2, -2);
// console.log('r', r); 0.25

/**
 * 跳跃 算法
 * 给定一个数组，数组中的每个元素代表可以跳跃的最大长度，初始时位于数组的第一个位置。输出到达最后一个元素时的最少跳跃次数。
 * @param {[*]} target
 * @returns
 * [2, 3, 1, 1, 4] => 2
 */
class Solution {
    constructor (target) {
        this.target = target;

        this.length = this.target.length;

        this.maxLen = this.length - 1;

        this.head = this.target[0];

        this.index = 1;

        this.res = this.solution();

    }

    solution () {
        if (!this.length) return new Error('Array No Length');

        if (this.head >= this.length - 1) return 1; //起始元素大于等于总长度 - 1，直接一步跳跃

        let times = 1;

        // const maxLen = this.length - 1; //需要跳的距离

        let count = this.calleeArray(times);
        console.log(`count ${count}`);

        return count;

    }

    calleeArray (times) {
        let tmp = {
            index : this.index,
            value : Infinity
        };
        for (let i = this.index; i < this.head; ++i) {
            this.maxLen -= i;
            if (!tmp.value) {
                tmp.value = this.maxLen - this.target[i];
                tmp.index = i;
            } else {
                tmp.value = tmp.value > this.maxLen - this.target[i] ? this.maxLen - this.target[i] : tmp.value;
                tmp.index = tmp.value > this.maxLen - this.target[i] ? i : tmp.index;
            }
            if (this.target[i] >= this.maxLen) {
                times += 1;
                break;
            } else {
                continue;
            }
        }
        if (tmp.value > 0 && tmp.value !== Infinity) { //距离没有超过最大距离，递归查找
            times += 1;
            this.head = this.target[tmp.index];
            return this.calleeArray(times);
        }
        return times;
    }
}

// let r = new Solution([2, 3, 1, 1, 4]);
// console.log('r', r.res); //2

/**
 * 最近最少使用 策略
 * 可扩展为 k 容量
 */
class LRUCache {
    constructor () {
        /**缓存容量 */
        this.cache = 2;

        /**使用数组缓存 */
        this.list = [];
    }

    put (key, value) {
        if (this.list.length === 2) this.list.pop();
        this.list.unshift({key: key, value: value});
        return true;
    }

    get (key) {
        let item = this.list.filter((t) => t.key === key);
        if (!item.length) return -1;
        if (item[0].key != key) return;
        let index = this.list.indexOf(item);
        this.list.splice(index, 1);
        // this.list.unshift(item);
        this.list = [...item, ...this.list];
        return item.pop().value;
    }

    has (v, key) {
        return v.key === key;
    }

    destroy () {
        this.list = [];
    }
}

// let r = new LRUCache();
// r.list =>> [{}, {}]; 
// r.destroy();
/**
 * 最优解问题
 * 给定一堆石头，每次一个人只能拿1-3个，自己先拿，判断是否可以在给定石头数量的情况下，能否赢
 * @returns Boolean
 * @example
 * input 4 
 * output false //4个石头的时候，永远不能赢
 */
class Nim {
    constructor (stones) {
        this.T = stones;

        this.players = 2; //默认2人
    }

    /**最坏情况 对方每次都拿3个*/
    boolWrost () {
        if ((this.T % 3) !== 0) {
            if (Math.floor(this.T / 3) & 1) return false;
            return true;
        } else {
            if (Math.floor(this.T / 3) & 1) return true;
            return false;
        }
    }
}
// let r = new Nim(7);
// console.log('r', r.boolWrost()); // true
/**
 * 存在有两个及以上的元素
 * @param {[*]} array
 * @returns Boolean
 */
const boolDoubleItem = (array) => {
    if (array.length <= 1) return false;
    const tmp = {};
    for (let i of array) {
        tmp[i] = tmp[i] ? ++tmp[i] : 1;
    }
    let values = Object.values(tmp);
    return values.some(t => t > 1);
}
// let r = boolDoubleItem([1,2,3,1]);
// console.log('r', r); //true
