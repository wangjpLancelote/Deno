const _ = require('lodash');
const key = 'wangjianpingabcdefghijklmnuvwrstxyz1234567890';
const moment = require('moment');

let a = [1,2,3,4];
// _.each(a, (v) => {
//     console.log('v', v);
// })
const md5 = require('crypto').createHash('md5');
md5.update(key + Date.now());
let t = md5.digest('hex');
let timestamp = Date.now();
// console.log(t);
const body = {

}

/**
 * 七鱼接口 query参数
 * @param {*} body 
 */
const getCheckQuery = (body = {}) => {
    let unix = moment().unix();
    return `appKey=${this.config.appId}&time=${unix}&checksum=${this.checksum(JSON.stringify(body), unix)}`;
}

/**
 * 获取accessToken
 * @param {} timestamp  时间戳
 */
const getAccessToken = (timestamp) => {
    md5.update(key + timestamp);
    return md5.digest('hex');
}
console.log(getCheckQuery());
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