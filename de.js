const _ = require("lodash");
const key = "wangjianpingabcdefghijklmnuvwrstxyz1234567890";
const moment = require("moment");
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const domain = require("domain");
const superagent = require("superagent");
const elasticsearch = require("elasticsearch");
const uuidV1 = require("uuid/v1");
const redis = require("redis");
const nodeCmd = require("node-cmd"); //node 调用cmd
const dialog = require("dialog"); //node打开对话框
const ora = require("ora"); //node 终端加载动画
const os = require("os");
const util = require("util");
const fs = require("fs");
const path = require('path')
const stream = require("stream");
const repl = require('repl');
// const appSecret = 'DE89AE71DDC74E639D1B70AC022D68C8';
// const appKey = '338f8ee1c88d36f69812cbd299de2677';
const Bluebird = require("bluebird");
const axios = require("axios");
const { result, rest } = require("lodash");
const { resolve, reject } = require("bluebird");
const { promise } = require("ora");
const chalk = require('chalk');
const { default: Axios } = require("axios");

// repl.start('> ').context._ = _;

let a = [1, 2, 3, 4];
// _.each(a, (v) => {
//     console.log('v', v);
// })
const md5 = require("crypto").createHash("md5");
// md5.update(key + Date.now());
// let t = md5.digest('hex');
let timestamp = Date.now();
// const appId = '338f8ee1c88d36f69812cbd299de2677';
// console.log(t);
const body = {
  title: "工单标题",
  uid: "someone",
  // "uniqueId":"123456789ABCDE",
  typeId: 0,
  content: "我有一个问题",
  userName: "游客1",
  userMobile: "18888888888",
  userEmail: "some@163.com",
  // "targetStaffId":12345,
  targetGroupId: 264108673,
  staffId: 283445,
  priority: 5,
  templateId: 1234,
  // "follower":["1001","1003"],
  attachments: [
    {
      fileName: "附件1.txt",
      type: 1,
      payload: "附件BASE64"
    }
  ],
  properties: [
    {
      key: "服务器",
      value: "瘦西湖"
    },
    {
      key: "玩家ID",
      value: "12345"
    }
  ],
  customFields: [
    {
      id: 12345,
      value: "你好"
    },
    {
      id: 12346,
      value: "恩"
    }
  ]
};

/**
 * 七鱼接口 query参数
 * @param {*} body
 */
// const getCheckQuery = (body = {}) => {
//     let unix = moment().unix();
//     console.log('checksum', checksum(JSON.stringify(body), unix));
//     return `appKey=${appId}&time=${unix}&checksum=${checksum(JSON.stringify(body), unix)}`;
// }

// const checksum = (content, time) => {
//     const sha1 = crypto.createHash('sha1');
//     const md5 = crypto.createHash('md5');
//     md5.update(content);
//     sha1.update(appSecret + md5.digest('hex') + time);
//     return sha1.digest('hex');
//   }

/**
 * 获取accessToken
 * @param {} timestamp  时间戳
 */
// const getAccessToken = (timestamp) => {
//     md5.update(appKey + timestamp);
//     return md5.digest('hex');
// }
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

// console.log('token', getAccessToken(timestamp), timestamp);

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
  if (!arr1.length && !arr2.length) return new Error("can not both empty array");

  let item1 = arr1.length ? arr1[0] : Infinity;
  let item2 = arr2.length ? arr2[0] : Infinity;

  if ([Infinity].includes(item1, item2)) {
    return item1 === Infinity
      ? arr2.length & 1
        ? (arr2[Math.floor(arr2.length / 2)] + arr2[Math.ceil(arr2.length / 2)]) / 2
        : arr2[arr2.length / 2]
      : arr1.length & 1
      ? (arr1[Math.floor(arr1.length / 2)] + arr1[Math.ceil(arr1.length / 2)]) / 2
      : arr1[arr1.length / 2];
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
      idx = [len / 2, len / 2 + 1];
    } else {
      idx = [Math.floor(len / 2), Math.ceil(len / 2)];
    }
    console.log("idx", idx);
    if (!idx.length) return false;
    let L = arr1.length > arr2.length ? arr1.length : arr2.length;
    find: {
      for (let i = 0; i < idx[1]; ++i) {
        console.log("i", i);
        if (idx.length === 1) {
          if (i > idx.pop() - 1) break find; //超过了所求下标，就跳出循环
        } else {
          if (i > idx[1] - 1) break find;
        }
        // if (i + 1 > (arr1.length > arr2.length ? arr2.length : arr1.length)) i -= (arr1.length > arr2.length ? arr2.length : arr1.length);
        tmp.push(arr1[i] <= arr2[i] ? arr1[i] : arr2[i]);
      }
    }

    console.log("tmp", tmp);
    return (
      tmp.slice(-2).reduce((v, k) => {
        return (v += k);
      }, 0) / 2
    );
  }
};

// let r = defFindMedianOfTwoArray([1, 2], [3, 4]);
// console.log('r', r);

/**
 *
 * 找到第一个缺失的正数
 * @param {[*]} array
 * @returns
 * number
 */
const findFirstPositive = array => {
  if (!array.length) return false;
  let t = 0;
  for (let i = 0; i < array.length; ++i) {
    if (array[i] <= 0) continue;
    !t ? (t = array[i]) : array[i] < t ? (t = array[i]) : t;
  }
  if (t > 1) return 1;
  array = array.filter(item => {
    return item > 0;
  });
  for (let i = 0; i < array.length; ++i) {
    if (array.includes(++t)) {
      continue;
    } else {
      break;
    }
  }
  return t;
};

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
  return isPosix ? 1 / res : res;
};
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
  constructor(target) {
    this.target = target;

    this.length = this.target.length;

    this.maxLen = this.length - 1;

    this.head = this.target[0];

    this.index = 1;

    this.res = this.solution();
  }

  solution() {
    if (!this.length) return new Error("Array No Length");

    if (this.head >= this.length - 1) return 1; //起始元素大于等于总长度 - 1，直接一步跳跃

    let times = 1;

    // const maxLen = this.length - 1; //需要跳的距离

    let count = this.calleeArray(times);
    console.log(`count ${count}`);

    return count;
  }

  calleeArray(times) {
    let tmp = {
      index: this.index,
      value: Infinity
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
    if (tmp.value > 0 && tmp.value !== Infinity) {
      //距离没有超过最大距离，递归查找
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
 * @author W.J.P
 */
class LRUCache {
  constructor() {
    /**缓存容量 */
    this.cache = 2;

    /**使用数组缓存 */
    this.list = [];
  }

  put(key, value) {
    if (this.list.length === 2) this.list.pop();
    this.list.unshift({ key: key, value: value });
    return true;
  }

  get(key) {
    let item = this.list.filter(t => t.key === key);
    if (!item.length) return -1;
    if (item[0].key != key) return;
    let index = this.list.indexOf(item);
    this.list.splice(index, 1);
    // this.list.unshift(item);
    this.list = [...item, ...this.list];
    return item.pop().value;
  }

  has(v, key) {
    return v.key === key;
  }

  destroy() {
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
  constructor(stones) {
    this.T = stones;

    this.players = 2; //默认2人
  }

  /**最坏情况 对方每次都拿3个*/
  boolWrost() {
    if (this.T % 3 !== 0) {
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
 * @author W.J.P
 */
const boolDoubleItem = array => {
  if (array.length <= 1) return false;
  const tmp = {};
  for (let i of array) {
    tmp[i] = tmp[i] ? ++tmp[i] : 1;
  }
  let values = Object.values(tmp);
  return values.some(t => t > 1);
};
// let r = boolDoubleItem([1,2,3,1]);
// console.log('r', r); //true
// superagent.get('https://ntt-demo.benewtech.cn/v6/service/detail/repair?userId=1122033156')
// .withCredentials()
// .set('Accept', 'application/json, text/plain, */*')
// .set('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1')
// .then((data) => {
//     console.log('data', data);
// }).catch(err => {
//     console.log('err', err);
// })
// console.log('sa', sa);
// sa.set('Accept', 'application/json, text/plain, */*');
// sa.set('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
// sa.end((err, body) => {
//     if (err) return console.log(err);
//     // console.log('body', body);
// })

/**
 * 转换一个字符串为整数
 * 找到第一个非空字符串，若为符号或数字，则查找之后的连续整数，并输出该连续整数
 * 若满足以上条件且有空格，则跳过空格查找
 * 若无法找到，则返回 0
 * @example
 * 'ewf123' => 0
 * '   -435dff' => - 435
 */
class Atoi {
  constructor(str) {
    this.str = str;

    this.res = this.search();
  }

  find() {
    let arr = this.str.split("");
    let item = arr.find((item, index) => {
      return item !== " ";
    });
    return arr.indexOf(item);
  }

  search() {
    let I = this.find();
    const tmp = this.str.split("");
    let res = "";
    for (let i = I; i < tmp.length; ++i) {
      if (!/(\-|\d|\+)/g.test(tmp[i])) break;
      res += tmp[i];
    }
    return Number(res);
  }
}
// let r = new Atoi('   -123d')
// console.log(r.res); //-123

/**
 * @type 动态规划
 * 最大水池容量问题
 * 给定一组向量，找出两个元素，使得，x轴和y轴组成的面积最大
 * @example
 * [1,8,6,2,5,4,8,3,7] => 7 * (8 - 1) = 49;
 * @returns
 * area
 */
class MaxPool {
  constructor(vector) {
    this.vector = vector;

    this.res = this.find();
  }

  find() {
    const L = this.vector.length;
    let res = 0;
    for (let i = 0; i < L; ++i) {
      for (let j = 0; j < L; ++j) {
        if (j <= i) continue;
        let area = (j - i) * this.selectMin(this.vector[i], this.vector[j]);
        if (!res) {
          res = area;
        } else {
          res = area > res ? area : res;
        }
      }
    }
    return res;
  }

  selectMin(item1, item2) {
    return item1 < item2 ? item1 : item2;
  }
}
// let r = new MaxPool([1,8,6,2,5,4,8,3,7]);
// console.log(r.res); //49

/**
 * 三数之和
 * 给定一个数组，从中找出三个元素使得这三个元素相加为0，找出所有满足条件且不重复的三元组
 * @example
 * [-1, 0, 1, 2, -1] => [-1, 0 1] | [-1, -1, 2]
 * @returns Array
 */
class ThreeSum {
  constructor(vector) {
    this.vector = vector;

    this.res = this.find();
  }

  find() {
    const L = this.vector.length;
    const res = [];
    for (let i = 0; i < L; ++i) {
      for (let j = 0; j < L; ++j) {
        if (j <= i) continue;
        for (let k = 0; k < L; ++k) {
          if (k <= j) continue; //排除相同元素
          if (this.vector[i] + this.vector[j] + this.vector[k]) continue;
          // if (res.map(c => c.sort(() => {return 1})).some(e => this.commonArray(e, [this.vector[i], this.vector[j], this.vector[k]].sort(() => { return 1; })))) continue;
          let tmpRes = res.map(t => {
            return t.sort(() => {
              return 1;
            });
          });
          console.log("tmp", tmpRes);
          res.map(r => {
            let s = r.sort(() => {
              return 1;
            });
            console.log("r", s);
          });
          if (
            tmpRes.some(e => {
              return this.commonArray(
                e,
                [this.vector[i], this.vector[j], this.vector[k]].sort(() => {
                  return 1;
                })
              );
            })
          )
            continue;
          res.push([this.vector[i], this.vector[j], this.vector[k]]);
        }
      }
    }
    return res;
  }

  /** 是否是两个相同的数组 */
  commonArray(arr1, arr2) {
    if (!arr1.length || !arr2.length) return new Error("array no items error");
    arr1.sort((a, b) => {
      return 1;
    });
    arr2.sort((a, b) => {
      return -1;
    });
    return arr1.toString() === arr2.toString();
  }

  /** main数组里是否有 两组target及以上的数组数量  */
  hasTwoItemsOfArray(main, target) {
    return target.every(c => {
      return main.indexOf(c) !== main.lastIndexOf(c);
    });
  }
}
// let r = new ThreeSum([-1, 0, 1, 2, -1]);
// console.log(r.res);

/**
 * 程序延时执行
 */
class SleepHelper {
  constructor() {}
  static sleep(seconds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, seconds * 1000);
    });
  }
}

// for (let i = 0; i < 10; ++i) {
//     if (i === 5) {
//         console.time('r');
//         SleepHelper.sleep(1);
//         console.timeEnd('r');
//         console.log('---');
//     }
//     console.log('i', i);
// }

/**
 * 判断是否是闭合的括号
 */
class ensureBracket {
  constructor(str = "") {
    this.str = str;

    this.res = this.find();
  }

  find() {
    if (this.str.length & 1 || !this.str.length) return false;

    let L = this.str.length;
    for (let i = 0; i < L; ++i) {
      console.log(this.str[i]);
    }
    return true;
  }

  generateTrendsCode(deviceId) {
    const base = 123456789;
    // return Number(((deviceId + Date.now()) & base).toString().substr(0, 6));
    let index = "";
    for (let i = 0; i < 6; ++i) {
      //    index += _.random(123456);
      // console.log('d', _.random(123456));
      index += Math.floor(Math.random() * 10);
    }
    return Number(index);
  }
}
// let r = new ensureBracket();
// console.log('r', r.generateTrendsCode());
// // console.log('r', r.res);
// console.log('-', _.isEmpty([]));

/**
 * 寻路迷宫问题
 * 求最短路径
 */
class BinaryTreeSearch {
  constructor() {
    /**迷宫的为5 x 5的方形 */
    this.len = 5;

    /**起点 */
    this.src = [0, 0];

    /**终点 */
    this.des = [2, 3];

    /**下一步的方位 四个方向*/
    this.next = [
      [0, -1],
      [0, 1],
      [1, 0],
      [-1, 0]
    ];

    /**
     * 迷宫
     * 三维数组组成，第三位表示能否通过
     */
    this.palace = [];

    this.wall = [
      [0, 1],
      [1, 3],
      [3, 3]
    ];

    this.min = this.len * this.len + 1; //记录最短路径 (理论上的最大的长度，走遍所有地图)

    this.map = [];
  }

  init() {
    this.setPalace();

    this.setWall();
  }
  setPalace() {
    for (let i = 0; i < this.len; ++i) {
      for (let j = 0; j < this.len; ++j) {
        this.palace.push([i, j, 1]);
      }
    }
    return this.palace;
  }
  setWall() {
    for (let i = 0; i < this.wall.length; ++i) {
      this.palace[this.wall[i][0] + this.palace[i][1]][2] = 0;
    }
    return this;
  }

  /**
   * 绘制地图
   */
  fillPalace() {
    console.log("-------------------------");
    for (let i = 0; i < this.len; ++i) {
      let shower = "";
      for (let j = 0; j < this.len; ++j) {
        if (i === this.src[0] && j === this.src[1]) {
          shower += " ▶ "; //起点
        } else if (i === this.des[0] && j === this.des[1]) {
          shower += " ● "; //目标
        } else if (this.palace[i * this.len + j][2] === 0) {
          shower += " ■ "; //墙
        } else if (this.palace[i * this.len + j][2] === 1) {
          shower += " □ "; //空地
        } else if (this.palace[i * this.len + j][2] === 2) {
          shower += "*"; //路径
        }
      }
      console.log(shower + "|");
    }
    console.log("--------------------");
  }
  /**
   * 寻路
   * 深度优先
   */
  search(pos, step, result) {
    /**找到了目标 */
    if (pos[0] === this.des[0] && pos[1] === this.des[1]) {
      if (step < this.min) {
        this.map = [];
        for (let r = 0; r < result; ++r) {
          this.map.push(result[r]);
        }
        this.min = step;
        result = [];
      }
    }

    /**递归搜索 */
    for (let i = 0; i < this.next.length; ++i) {
      let tmpPos = (pos[0] + this.next[i][0]) * this.len + pos[1] + this.next[i][1]; //下一步的坐标
      if (pos[0] + this.next[i][0] < 0 || pos[0] + this.next[i][0] >= this.len || pos[1] + this.next[i][1] < 0 || pos[1] + this.next[i][1] >= this.len) {
        continue; //下一步越界了
      } else if (this.palace[tmpPos] && this.palace[tmpPos][2] === 1) {
        //下一步不是墙
        this.palace[tmpPos][2] = 0;
        result.push(pos[0] + this.next[i][0], pos[1] + this.next[i][1]);
        this.search([pos[0] + this.next[i][0], pos[1] + this.next[i][1]], step + 1, result);
        this.palace[tmpPos][2] = 1; //尝试结束，取消标记
        result.pop();
      }
    }
  }
  start() {
    this.init();
    this.palace[0][2] = 0;
    this.search(this.src, 0, []);
    this.fillPalace();
    return this;
  }
}

function tes() {
  // const CONSTANT_NUM = 1234567890;
  // const CONSTANT_STD_NUM = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const CONSTANT_STD_STR = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  let str = "";
  let num = "";
  const len = CONSTANT_STD_STR.length;

  for (let i = 0; i < 2; ++i) {
    str += CONSTANT_STD_STR[Math.round(Math.random() * (len - 1))];
    num += Math.floor(Math.random() * 10);
  }
  let str_num = CONSTANT_STD_STR[Math.floor(Math.random() * (len - 1))] + Math.floor(Math.random() * 10);

  return str + num + str_num;
}
// console.log('tes', tes());

/**
 * kNuth Shuffle 洗牌算法
 */
class KnuthShuffle {
  constructor(array) {
    this.array = array;

    this.res = this.shuffle();
  }

  shuffle() {
    for (let L = this.array.length; L >= 0; --L) {
      let tmp = this.array[L];
      this.array[L] = this.array[Math.random() % (L + 1)];
      this.array[Math.floor((Math.random() * 10) % (L + 1))] = tmp;
      // this.swap(this.array[L], this.array[Math.random() % (L + 1)]);
    }
    return this.array;
  }

  swap(key1, key2) {
    let tmp = key1;
    key1 = key2;
    key2 = tmp;
    tmp = null;
  }
}

// let r = new KnuthShuffle([1,2,3,4,5,6,7]);
// console.log('r', r);

class line_random {
  constructor() {
    this.res = null;
  }

  /**获取种子 */
  getSeed() {
    let n = Date.now();
    return ((n * 9301 + 49297) % 233280) / 233280;
  }

  find(min, max, extract) {
    if (arguments.length === 0) {
      return Math.random();
    } else if (arguments.length === 1) {
      max = min;
      min = 0;
    }
    let range = min + this.getSeed() * (max - min);
    return extract === void 0 ? Math.round(range) : range.toFixed(extract);
  }
}

// let r = new line_random();
// console.log('r: %d, d: %d', r.find(), r.getSeed());
class minimum_str {
  constructor(str, target, offset) {
    /**目标字符 */
    this.str = str;
    /**偏移量 */
    this.offset = 0;

    this.target = target;
  }

  find() {
    let sl = this.target.length;
    let L = this.str.length;

    for (let i = this.offset; i < L; ++i) {
      if (i < this.sl - 1) continue;
      let res = this.sqrt(this.offset, i, this.str);
    }
  }

  sqrt(first, second, array) {
    let res = array.slice();
    if (first === 0) return res.slice(0, second);
    return res.splice(first, second);
  }

  forT(offset, array, str) {
    for (let i = offset; i < array.length; ++i) {
      if (i < str.length - 1) continue;
      if (i === array.length - 1) {
        offset += 1;
        this.forT(offset, array, sl);
      }
      let res = this.sqrt(offset, i, str);
      if (
        str.split("").every(n => {
          return res.includes(n);
        })
      )
        return str;
      // if (res.includes(str)) {
      //     return
      // }
    }
  }
}

/**
 * 梅森旋转法生成随机数
 * 对于一个 k位的MT数, 在[0, 2^k-1]的区间内能产生离散型均匀分布的随机数
 * 最新的梅森素数(19937) 有32位和64位两种实现 因此最少都有2^32 - 1种随机范围 代表周期是2^19937 - 1 意味着,按顺序的话，要过2^19937次才会重复。
 *
 * 这里用的32位算法
 * 旋转：通过线性移位寄存器进行移位，将每一步移位之后的数与一个通过(不可约的多项式)计算后的某些位进行异或操作,将一个数按位进行位操作，经过一个周期后就能回复到原来的数，这个过程叫做旋转。
 *
 */
class MesonRoundRandom {
  constructor() {
    this.isInit = false; //是否已经设置种子

    this.index; //偏移量

    this.MT = new Array(624); //创建624长度的元素数组
  }

  static boolArray(arr) {
    return Array.isArray(arr);
  }
  /**
   * 设置种子
   * 初始化数组 MT
   * 一般用当前时间的毫秒数
   */
  srand(seed) {
    this.index = 0;
    this.isInit = true;
    this.MT[0] = seed;

    for (let i = 1; i < 624; ++i) {
      let t = 1812433253 * (this.MT[i - 1] ^ (this.MT[i - 1] >> 30)) + i;
      this.MT[i] = t & 0xffffffff; //取最后的32位
    }
  }

  generate() {
    for (let i = 0; i < 624; ++i) {
      let n = (this.MT[i] & 0x80000000) + (this.MT[(i + 1) % 624] & 0x7fffffff);
      this.MT[i] = this.MT[(i + 397) % 624] ^ (n >> 1);
      if (n & 1) {
        //奇数
        this.MT[i] ^= 2567483615;
      }
    }
  }
  rand() {
    if (!this.isInit) {
      this.srand(new Date().getTime()); //非初始化，即初始化数组
    }
    if (this.index == 0) this.generate(); //偏移量

    let y = this.MT[this.index];

    /**移位 旋转 */
    y = y ^ (y >> 11);
    y = y ^ ((y << 7) & 2636928640);
    y = y ^ ((y << 15) & 4022730752);
    y = y ^ (y >> 18);

    this.index = (this.index + 1) % 624; //返回元素下标 保证index 永远在数组范围内
    return y;
  }
  /**
   * 选取区间 返回区间内的随机数
   * @param {Number} fixed
   */
  toFixedRand(fixed) {
    if (fixed) {
      fixed = Number(fixed);
      if (!_.isNumber(fixed)) throw new Error("输入正确的进制");
    } else {
      fixed = 10;
    }
    this.srand(new Date().getTime());
    return this.rand() % fixed;
  }
  /**
   * knuth shuffle
   * 洗牌算法, 打乱数组顺序
   * @param {Array} arr
   */
  shuffle(arr) {
    this.srand(new Date().getTime());
    for (let i = arr.length - 1; i >= 0; --i) {
      let r = this.rand();
      let randomIndex = r % arr.length;
      let item = arr[randomIndex];
      arr[randomIndex] = arr[i];
      arr[i] = item;
    }
    return arr;
  }
}

// let r = new MesonRoundRandom();
// let t = r.shuffle([1,2,3,4,5,6,7]);
// // r.srand(new Date().getTime());
// console.log('rand', r.toFixedRand(10));
// console.log('t', t);

class strategy {
  constructor() {}

  async model(params) {
    let model = params => {
      console.log("params", params);
    };
    let _model = Bluebird.promisify(model);
    return await _model(params);
  }

  nool(param) {
    console.log("param", param);
  }

  tool(p) {
    let tool = p => {
      console.log("p", p);
    };
    return tool(p);
  }
}
// let r = new strategy();
// r.model(1);
// r.nool(2);
// r.tool(3);

let cnt = 0;
async function tt(p) {
  if (p > 1) {
    return "12345";
  } else {
    p++;
    return tt(p);
  }
}
async function dd() {
  let data = await tt(1);
}
// dd();
class RedisService {
  constructor() {
    this.client = redis.createClient({
      host: "127.0.0.1",
      port: "6379",

      retry_strategy: function(options) {
        if (options.error && options.error.code === "ECONNREFUSED") {
          // End reconnecting on a specific error and flush all commands with
          // a individual error
          return new Error("The server refused the connection");
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          // End reconnecting after a specific timeout and flush all commands
          // with a individual error
          return new Error("Retry time exhausted");
        }
        if (options.attempt > 10) {
          // End reconnecting with built in error
          return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
      }
    });
    this.asyncGet = Bluebird.promisify(this.client.get).bind(this.client);
    this.asyncSPop = Bluebird.promisify(this.client.spop).bind(this.client);
  }

  async setnx(key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, "nx", function(err, result) {
        if (err) {
          resolve(false);
        } else {
          resolve(result === "OK");
        }
      });
    });
  }
}

// let redisService = new RedisService();
// async function getRes () {
//     let res = await redisService.setnx('names', Date.now());
//     console.log('res', res);
// }
// getRes();
class IntervalPool {
  constructor() {}

  callback() {
    console.log("callback");
  }
  event() {
    let i = 0;
    let arr = [0, 0, 0, 0, 1, 1, 1];
    return () => {
      console.log("event轮询第" + i + "次");
      return Boolean(arr[i++]);
    };
  }
  boostrap(event, cb, interval) {
    if (event()) {
      return cb();
    } else {
      setTimeout(() => {
        this.boostrap(event, cb, interval);
      }, interval);
    }
  }
}

// let r = new IntervalPool();
// r.boostrap(r.event(), r.callback, 1000);

/**
 * 计算数量最大的编码方式
 * 给定一个数字非空字符串
 */
class encodeAlpha {
  constructor(target) {
    this.target = target;

    this.cnt = 0;
  }

  diliver() {
    for (let i = 0; i < this.target.length; ++i) {
      console.log("i", this.target[i]);
      this.cnt += 1;
      if (i + 1 < this.target.length && Number(this.target[i] + this.target[i + 1]) < 27) {
        this.cnt += 1;
        continue;
      }
    }
  }
}
// let r = new encodeAlpha('1234');
// r.diliver();
// console.log('r', r.cnt);

// console.log('time', moment().unix());
// console.log('time2', Date.now());
// console.log('time3', new Date().getTime());
// console.log('time4', Date.parse(new Date()));
// console.log('time5', new Date().valueOf());
// console.log('time7', +new Date());
class AES {
  constructor(message, secretKey) {
    this.message = message;
    this.secretKey = secretKey;
  }

  /**加密 */
  encrypt() {
    const cipher = crypto.createCipher("aes192", this.secretKey);
    let crypted = cipher.update(this.message, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  }

  /**解密 */
  decrypt(data) {
    const decipher = crypto.createDecipher("aes192", this.secretKey);
    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
}

// let r = new AES('this is data', 'secretKey');
// let encry = r.encrypt();
// let dencry = r.decrypt(encry);
// console.log('encry: %j, dencry: %j', encry, dencry);

class DiffieHelman {
  constructor() {}

  getAkeys() {
    let base = crypto.createDiffieHellman(512);
    let base_keys = base.generateKeys(); //生成随机素数

    let prime = base.getPrime();
    let generator = base.getGenerator();

    console.log("prime: %j, generator: %j", prime.toString("hex"), generator.toString("hex"));

    let tower = crypto.createDiffieHellman(prime, generator);
    let towerKeys = tower.generateKeys();

    console.log("tower: %j, towerKeys: %j", tower.toString("hex"), towerKeys.toString("hex"));

    let base_secret = base.computeSecret(towerKeys);
    let tower_secret = base.computeSecret(base_keys);

    console.log("base_secret: %j, tower_secret: %j", base_secret.toString("hex"), tower_secret.toString("hex"));
  }
}

// let r = new DiffieHelman();
// r.getAkeys();
// console.log('uuid', uuidV1());

// let target = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, 14]]], 10];
/**数组扁平 且排序 */
class FlowArray {
  constructor(arr, inc = true) {
    this.base = arr;
    /**是否升序 */
    this.inc = inc;

    this.res = [];

    this.arrType = false;
  }

  array(target) {
    return Array.isArray(target);
  }

  /**深度遍历 */
  DFS(target) {
    for (let k of target) {
      if (this.array(k)) return this.DFS(k);
      if (!this.res.length) {
        this.res.push(k);
      } else {
        this.res = [...this.sortBy(this.res, k)];
      }
    }
  }
  /**广度遍历 */
  BFS() {
    for (let v of this.base) {
      if (this.array(v)) {
        this.DFS(v);
      } else {
        if (!this.res.length) {
          this.res.push(v);
        } else {
          this.res = [...this.sortBy(this.res, v)];
        }
      }
    }
  }

  sortBy(target, item) {
    if (item >= this.last(target)) return [...target, item];
    // if (item >= target[target.length - 1]) return [...target, item];
    target.push(item);
    /**比自身小的项排除, 从更大的项开始, 从后往前，逐一交换位置 需跳过最后一项进行比较*/
    for (let i = target.length - 2; i > -1; --i) {
      if (target[i] <= item) break;
      let tmp = target[i + 1];
      target[i + 1] = target[i];
      target[i] = tmp;
    }
    return target;
  }

  last(target) {
    return target[target.length - 1];
  }
}

// let r = new FlowArray(target);
// r.BFS();
// console.log('r', r);

const _new = function(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const ret = fn.apply(obj, args);
  return ret instanceof Object ? (ret !== null ? ret : obj) : obj;
};

class Flat {
  constructor(array) {
    this.array = array;

    this.res = [];

    this.hasLoad = false;
  }

  DFS(target) {
    for (let k of target) {
      if (Array.isArray(k)) {
        for (let j of k) {
          if (Array.isArray(j)) {
            if (!this.hasArrInArray(j)) {
              this.res.push(j);
              continue;
            }
          } else {
            this.res.push(j);
          }
        }
      } else {
        this.res.push(k);
      }
    }
  }

  joinArr(arr) {
    for (let t of arr) {
    }
  }

  BFS() {
    for (let c of this.array) {
      if (Array.isArray(c)) {
        this.DFS(c);
      } else {
        this.res.push(c);
      }
    }
  }

  hasArrInArray(arr) {
    return arr.some(item => Array.isArray(item));
  }
}

// let sss = [1, [2, [3, [4], 5]]];
function isArray(arr) {
  // return Object.prototype.toString.call(arr);
  // return Array.isArray(arr);
  // return arr instanceof Array
}

Number.MAX_SAFE_DIGITS = Number.MAX_SAFE_INTEGER.toString().length - 2;
Number.prototype.digits = function() {
  let result = this.valueOf().toString();
  return result > Number.MAX_SAFE_DIGITS ? Number.MAX_SAFE_DIGITS : result;
};
Number.prototype.add = function(i = 0) {
  if (typeof i !== "number") throw new Error("请输入正确的数字");
  const v = this.valueOf();
  const thisDigits = this.digits();
  const iDigits = i.digits();
  const baseNum = Math.pow(10, Math.max(thisDigits, iDigits));
  const result = (v * baseNum + i * baseNum) / baseNum;
  if (result > 0) {
    return result > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : result;
  } else {
    return result < Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : result;
  }
};

Number.prototype.minus = function(i = 0) {
  if (typeof i !== "number") throw new Error("请输入正确的数字");
  const v = this.valueOf();
  const thisDigits = this.digits();
  const iDigits = i.digits();
  const baseNum = Math.pow(10, Math.max(thisDigits, iDigits));
  const result = (v * baseNum - i * baseNum) / baseNum;
  if (result > 0) {
    return result > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : result;
  } else {
    return result < Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : result;
  }
};

// Number(10).digits();
// let r = Number(5).add(3).minus(2);
// console.log('r', r);

/**对象中带有length属性，就可用Array.from()方法转化为数组，数组长度为length的值 */
function translate(obj = { length: 0 }) {
  return Array.from(obj);
}
// console.log('tran', translate()); //[]

class Lazyman {
  constructor(name) {
    this.name = name;

    this.task = [];

    console.log(`Hi I am ${name}`);
    Promise.resolve().then(() => {
      this.next();
    });
    return this;
  }

  _sleep(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, time * 1000);
    });
  }

  next() {
    let fn = this.task.shift();
    fn && fn();
  }

  eat(food) {
    this.task.push(() => {
      console.log(`I am eating ${food}`);
      this.next();
    });
    return this;
  }

  sleep(time) {
    this.task.push(() => {
      this._sleep(time).then(() => {
        console.log(`等待了${time}秒`);
        this.next();
      });
    });
    return this;
  }

  sleepFirst(time) {
    this.task.unshift(() => {
      this._sleep(time).then(() => {
        console.log(`先等待了${time}秒`);
        this.next();
      });
    });
    return this;
  }
}
// new Lazyman('tom').sleep(10).eat('apple').sleepFirst(10).eat('junk food');
const translateUpOrLow = function(str) {
  const mapCode = {
    A: "A".charCodeAt(0),
    Z: "Z".charCodeAt(0),
    a: "a".charCodeAt(0),
    z: "z".charCodeAt(0)
  };
  let diff = mapCode.a - mapCode.A;
  let target = str.split("");
  for (let i = 0; i < target.length; ++i) {
    let tmp = target[i].charCodeAt(0);
    if (tmp >= mapCode.A && tmp <= mapCode.Z) {
      target[i] = String.fromCharCode(tmp + diff); //转小写
    } else if (tmp >= mapCode.a && tmp <= mapCode.z) {
      target[i] = String.fromCharCode(tmp - diff); //转大写
    } else {
      //非字母
      target.splice(i, 1);
    }
  }
  return target.join("");
};
// let r = translateUpOrLow('fsdssdQQdd');
// console.log('r', r);
/**
 * 依据对象里某一条件将对象转化为树形结构
 */
class TreeConvert {
  constructor(list, condition) {
    this.list = list;

    this.condition = condition;

    this.res = [];
  }

  convert() {
    let res = [];
    let obj = {};
    for (let c of this.list.slice()) {
      if (!res.length) {
        res.push(c);
        obj = c;
        continue;
      } else {
        if (obj[this.condition] === c[this.condition]) {
          let tmp = res.find(x => x[this.condition] === obj[this.condition]);
          tmp.children = [];
          tmp.children.push(c);
          obj = c;
          continue;
        } else {
          res.push(c);
          obj = c;
          continue;
        }
      }
    }
    this.res = res;
    return this;
  }
}

// let list = [
//     {id: 1, name: 'wjp0', parentId: 1},
//     {id: 2, name: 'wjp1', parentId: 1},
//     {id: 3, name: 'wjp2', parentId: 2},
//     {id: 4, name: 'wjp3', parentId: 3}
// ]
// let r = new TreeConvert(list, 'parentId');
// r.convert();
// console.log('r', r.res);
/**
 * 在给定字符串匹配出对应的目标字符串，并做高亮显示
 * 返回该字符串第一个需要高亮显示的下标 该下标 + 给定字符串长度就是对应需要高亮显示的完整字符串
 * @param {String} str
 * @param {[*]} list
 * @returns
 * {idx(字符串位置): [index(第一个下标), lastIndex(最后一个下标)]}
 */
function searchHighLightWords(str, list) {
  let l = str.length;
  let res = {};
  for (let s of list) {
    if (s.length < l) continue; //长度小于目标字符串长度，不可能匹配出来
    if (s.length === l && s !== str) continue;
    for (let i = 0; i < s.length; ++i) {
      if (s.slice(i, i + l) === str) {
        let idx = list.indexOf(s);
        res[idx] = [i, i + l - 1];
        break;
      } else {
        continue;
      }
    }
  }
  return res;
}
// let srr = 'wjp';
// let list = ['aewjpdd', 'sj', 'wjplllk', 'adewjp'];
// let r = searchHighLightWords(srr, list);
// console.log('r', r);

function reverseNum2Str(num) {
  let target = num.toString();
  let res = "";
  for (let i = target.length - 1; i > -1; --i) {
    res += target[i];
  }
  return res;
}
// // let r = reverseNum2Str(1234); '4321'
// superagent
//     // .post('http://www.baidu.com')
//     // .send({name: 'wjp', specieds: 'cat'})
//     .get('http://127.0.0.1:3333')
//     .then((res) => {
//         let result = '';
//         res.on('data', (chunk) => {
//             result += chunk.toString();
//         })
//         res.on('end', () => {
//             console.log('res', result);
//         })
//     })

/**
 * 笛卡尔积：两个集合的有序结合成新的集合的所有可能性组合。不支持分配律。
 */
class Dicaer {
  constructor(setA, setB) {
    this.setA = setA;
    this.setB = setB;
  }
}

const deepCopy = target => {
  // return new Proxy(target, {
  //   get: (obj, prop) => {
  //     console.log("obj: %j, prop: %j", obj, prop);
  //     return obj[prop];
  //   },
  //   set: (obj, prop, value) => {
  //     console.log("obj: %j, prop: %j, value: %j", obj, prop, value);
  //     if (prop === "uid") {
  //       if (!Number.isInteger(value)) {
  //         throw new TypeError(`the prop ${prop} is not an integer`);
  //       }
  //       obj[prop] = value;
  //     }
  //   }
  // });
  // if (typeof target !== "object") return;
  // let res = {};
  // for (let i in target) {
  //   if (typeof i !== "object") {
  //     res[i] = obj[i];
  //   } else {
  //   }
  // }
};

class strongCopy {
  constructor(target) {
    this.target = target;
    this.map = new Map();
  }

  /**遍历对象 */
  loopObj(source, k) {
    for (let i in source[k]) {
      if (typeof source[i] !== "object") {
      }
    }
  }
  /**遍历数组 */
  loopArr(source, k) {
    for (let i = 0; i < source[k].length; ++i) {
      this.map[source] = source[k].slice();
    }
  }

  find(source) {
    if (!source) source = this.target;
    for (let i in source) {
      if (typeof source[i] !== "object") {
        this.map[i] = source[i];
      } else {
        if (source[i] instanceof Array) {
          // this.loopArr(source[i]);
          this.map[source] = source[i].slice();
        } else {
          this.loopObj(source, i);
        }
      }
    }
  }
}

/**
 * Dijkstra
 * 计算最短路径算法
 * 计算其他接节点到一个节点的距离
 */
class Dijkstra {
  constructor(vexnum, edgnum, target) {
    /**顶点数 */
    this.vexnum = vexnum;

    /**边数 */
    this.edgnum = edgnum;

    /**指定顶点 */
    this.target = target || "D";

    /**顶点，用字母表示 */
    this.alpha = ["A", "B", "C", "D", "E", "F", "G"];

    /**存储了结构体集合 */
    this.set = new Set();

    /**已计算出路径的顶点集合 */
    this.S = new Set();

    /**未计算出路径的顶点集合 */
    this.U = new Set();
  }

  /**生成一个数据集合，集合中的数据为一个能够描述边长，边的起点，边的顶点的对象 该集合内的数据需要能够形成一个闭环*/
  initClosure() {
    let base = {
      edgeLen: 0, //边长
      edgeStart: "", //边的起点
      edgeEnd: "" //边的终点
    };
    return base;
  }
  init_sbase(vex, distance) {
    /**需要放进S集合中的对象 */
    let Sbase = {
      vex: vex, //节点
      distance: distance //到顶点的距离
    };
    return Sbase;
  }
}

let ss = [
  { id: 1, name: "wang" },
  { id: 2, name: "jian" },
  { id: 3, name: "ping" }
];
let tts = [1, 2, 3];
let n = ss.map(c => {
  if (tts.includes(c.id)) {
    return c.name;
  }
});

// dialog.info("hello", "wang", 1000, (code, retVal, stderr) => {
//   console.log(code, retVal, stderr);
// });

// const spinner = ora("Loading unicorns").start();
// setTimeout(() => {
//   spinner.color = "yellow";
//   spinner.text = "Loading rainbows";
//   spinner.stop();
// }, 1000);

/**
 * base64 编码原理
 * 本质上：格式转换
 * 3 * 8 === 4 * 6 [3个8位的二进制数，可以转化为4个6位的二进制数](计算机一个字节占8为,6位二进制数高位补00,凑8位,若目标字符不是3的倍数,则将分配剩下的数继续转,通过加0补全的方式，变为3个8位数,所以要从地位开始每3位分配)
 *
 * 流程：先将字符串的字符转为ascii码，得到N个number类型的数字，二进制转换，得到6位二进制数，高位补0，转为10进制数，对照base64码表，查找对应转化后的字符->新的字符串(base64码)
 * 常见的base64码表基本是根据字母从大到小->数字->+/从0开始排列的。
 * 解码的过程和编码相反，将N个二进制位重组得到3 * N个8位的值
 */
class Base64Code {
  constructor() {
    this.base = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "+",
      "/"
    ];
    this.codes = [];
  }

  /**编码 */
  encode(bin) {
    let codes = [];
    let remain = bin % 3; //若不能除尽3，则会剩下的几个数
    if (remain === 1) {
      //补全两个
      bin.push(0, 0);
    } else if (remain === 2) {
      bin.push(0);
    }

    for (let i = 2; i < bin.length; i += 3) {
      //高位开始操作
      let c = bin[i - 2] << 16;
      c |= bin[i - 1] << 8;
      c |= bin[i];
      this.codes.push(this.base[(c >> 18) & 0x3f]);
      this.codes.push(this.base[(c >> 12) & 0x3f]);
      this.codes.push(this.base[(c >> 6) & 0x3f]);
      this.codes.push(this.base[c & 0x3f]);
    }
    if (remain >= 1) {
      this.codes[this.codes.length - 1] = "=";
      bin.pop();
    }
    if (remain == 1) {
      this.codes[this.codes.length - 2] = "=";
      bin.pop();
    }
    return this.codes.join("");
  }

  /**解码 */
  decode(base64Str) {
    let i = 0;
    let bin = [];
    let x = 0,
      code = 0,
      eq = 0;
    while (i < base64Str.length) {
      let c = base64Str.charAt(i++); //字符在base里的位置，获取该子字符
      let idx = this.base.indexOf(c);
      if (!~idx) {
        switch (i) {
          case "=":
            idx = 0;
            eq++;
            break;
          case " ":
          case "\n":
          case "\r":
          case "\t":
            continue;
          default:
            throw {
              message: "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u65E0\u6548\u7F16\u7801\uFF1A" + c
            };
        }
      }
      if (eq > 0 && idx != 0) {
        throw {
          message: "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u683C\u5F0F\u9519\u8BEF\uFF01"
        };
      }
      code = (code << 6) | idx;
      if (++x !== 4) {
        continue;
      }
      bin.push(code >> 16);
      bin.push((code >> 8) & 0xff);
      bin.push(code & 0xff);
      code = x = 0;
    }
    if (code != 0) {
      throw {
        message: "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u6570\u636E\u957F\u5EA6\u9519\u8BEF"
      };
    }
    if (eq === 1) {
      //取消高位补的0
      bin.pop();
    } else if (eq === 2) {
      bin.pop();
      bin.pop();
    } else if (eq > 2) {
      //若超过两位还没有被组成3个8位二进制数，说明数据长度报错了
      throw {
        message: "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u683C\u5F0F\u9519\u8BEF\uFF01"
      };
    }
    return bin;
  }
}

let base64 = new Base64Code();

// let rt = base64.encode('https://cloud.benewtech.cn/forum/exhibition/xxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

/**防抖函数
 * 强制让函数在规定时间内段只执行一次
 * @param {Function} fn
 * @param {Time} delay
 * @param {Boolean} immediate 是否是在时间区间内最开始时候执行
 * 返回一个用于执行的函数
 */
const debounce = (fn, delay, immediate = false) => {
  let timer;
  return function() {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
};

// setTimeout(() => {
//   debounce(() => {console.log('111')}, 2000)();
// }, 5000)

/**
 * 节流函数
 * 节流意味着控制流量，限流，只允许在规定时间间隔内执行一次该函数
 * 让函数以规定时间间隔执行
 * 返回一个函数
 * @param {Function} fn
 * @param {Time} threshold
 */
const throttle = (fn, threshold = 250) => {
  /**记录上次执行的时间 */
  let last;
  /**定时器 */
  let timer;
  return function() {
    let context = this;
    let args = arguments;
    let now = +new Date();
    if (last && now < last + threshold) {
      clearTimeout(timer);
      setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};

/**
 * 使用元编程，可以修改对象属性，修改方法属性
 * new 关键字，自带target属性，返回当前属性类型。方法的类型，类类型
 */
class MetaPrograming {
  static get [Symbol.species]() {
    return this;
  }

  get len() {
    return 1;
  }

  constructor() {
    console.log("target", new.target, new.target === MetaPrograming);
  }

  again() {
    return new this.constructor[Symbol.species]();
  }
}
// console.log('g', MetaPrograming.get());
// let m = new MetaPrograming();
// console.log('m', m.again())
// console.log('00', m.len);

let test = [1, 2, 3, 4, 5, 6, 7];
for (let v of test) {
  // console.log('v', v);
}

/**修改对象(包括数组)的迭代器属性
 * 自定义迭代器方法
 */
test[Symbol.iterator] = function*() {
  let idx = 1;
  do {
    yield this[idx];
  } while ((idx += 2) < this.length);
};

for (let c of test) {
  // console.log('c', c)
}

test[Symbol.toPrimitive] = function(hint) {
  console.log("hint", hint);
  if (hint === "default" || hint === "number") {
    return this.reduce((p, b) => {
      return p + b;
    }, 0);
  }
};

test[Symbol.isConcatSpreadable] = false;
[].concat(test, [9]);
// console.log('test', test);
// console.log('ss', test + 10);

// const testRet = (target) => {
//   // return [1,2,3,4,5,6][target & 1 || 0]
//   return [1,2,3,4,5,6][target]

// }

// let r = testRet(4);
// console.log('r', r);

class Lottery {
  constructor() {
    this.manay = 0;
  }

  random(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }

  num() {
    console.log("sss", this.random(0, 10000));
    if (this.random(0, 10000) < 9900) {
      this.manay = this.random(1, 2);
    } else if (this.random(0, 10000) < 9990) {
      this.manay = this.random(2, 49);
    } else if (this.random(0, 10000) === 9999) {
      this.manay = 50;
    }
    return this.manay;
  }
}


/**构建虚拟dom 类
 * 虚拟dom 构建及其渲染流程
 */
class VDom {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

/**创建虚拟dom element */
function createElement(type, props, children) {
  return new VDom(type, props, children);
}

/**渲染 */
function render(dom) {
  let el = document.createElement(dom.type);

  /**遍历props对象，然后给创建的元素el设置属性 */
  for (let key in dom.props) {
    setArr(el, key, dom.props[key]);
  }

  dom.children.forEach(child => {
    child = child instanceof Element ? render(child) : document.createTextNode(child);
    el.appendChild(child);
  });

  return el;
}

/**给虚拟dom节点添加属性 */
function setArr(node, key, value) {
  switch (key) {
    case "value":
      if (node.tagName.toLowerCase() === "input" || node.tagName.toLowerCase() === "textarea") {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    /**style 内联样式 */
    case "style":
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}

/**将元素插入到页面上 */
function renderDom(el, target) {
  target.appendChild(el);
}

/**
 * dom-diff
 * 比较的是前后两个虚拟dom,得到的是差异对象(diff), 把差异对象应用到真正的dom树上
 * 用于查找dom改动，页面重绘，重新渲染
 * 提高页面响应速度
 *
 */
function diff() {
  /**存放补丁的对象 */
  let pathces = {};

  let index = 0;
  /**递归比较 */
  walk(oldTree, newTree, index, pathces);

  return pathces;
}

// function walk (oldNode, newNode, index, pathces) {
//   /**每个元素都有一个补丁 */
//   let current = [];

//   if(!newNode) {
//     current.push({type: 'REMOVE', index: index});
//   } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
//     if (oldNode !== newNode) {
//       current.push({type: 'ATTR', attr}),
//     }
//   }
// }

/**
 * 基于pormise 的定时器
 */
class SetPromiseInterval {
  constructor() {
    /**任务集合 */
    this.tasks = new Set();
    /**方法集合 */
    this.handlers = new Map();

    /**计数器 */
    this.count = 0;
  }

  delay(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  /**执行器 */
  async run(id, handler, interval = 0) {
    while (this.tasks.has(id)) {
      const startTime = new Date().getTime();
      this.handlers.set(id, handler());

      try {
        await this.handlers.get(id);
      } catch (e) {
        throw e;
      } finally {
        this.handlers.delete(id);
      }

      await this.delay(interval - new Date().getTime() + startTime);
    }
  }

  /**清除定时器 */
  async clearPromiseInterval(intervalId) {
    if (intervalId && this.tasks.has(intervalId)) {
      if (this.handlers.has(intervalId)) {
        await this.handlers.get(intervalId);
      }
      this.tasks.delete(intervalId);
    }
  }

  setPromiseInterval(handler, interval = 0) {
    this.count += 1;
    this.tasks.add(this.count);
    this.run(this.count, handler, interval);
    return this.count;
  }
}

// let s = new SetPromiseInterval();

// superagent.get('http://www.baidu.com').end((err, {header}) => {
//   if (err) {
//     console.log('err', err);
//   }
//   console.log('body', header);
// })

// const seeds = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// function geneActivateCodeStr() {
//   let buf = [];

//   for (let i = 0; i < 64; ++i) {
//     buf.push(seeds[_.random(0, seeds.length - 1)]);
//   }

//   return buf.join('');
// }

// console.time('ss');
// let rt = geneActivateCodeStr();
// console.timeEnd('ss', rt);

/**去除字符串内空格 */
const trimInString = str => {
  return str.replace(/\s*/g, "");
};

const refs = obj => {
  const res = {};
  Object.keys(obj).forEach(key => {
    if (isRefs(obj[key])) {
      res[key] = obj[key];
    } else {
      res[key] = {
        get value() {
          return obj[key];
        },
        set value(val) {
          obj[key] = val;
        }
      };
    }
  });
  return res;
};

const getDwzLink = () => {
  let token = "b6adb3e2628337ac6d55ff001249e6fc";
  let longUrl = "https://cloud.benewtech.cn/forum/exhibition/xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  let TermOfValidity = "1-year";

  let request = axios.create({
    headers: {
      "Content-Type": "application/json",
      Token: token
    }
  });
  request
    .post("https://dwz.cn/admin/v2/create", { Url: longUrl, TermOfValidity: TermOfValidity })
    .then(res => {
      console.log("res", res.data);
    })
    .catch(err => {
      console.log("err", err);
    });
};
// getDwzLink();
const superAgentLink = async () => {
  let token = "b6adb3e2628337ac6d55ff001249e6fc";
  let longUrl = "https://cloud.benewtech.cn/forum/exhibition/oq81kzBsD7TYxT1I8mSnm48Ec94m2R73AwW6kiXjrnsNeItg55WBYymqlfEsjYKR";
  let TermOfValidity = "long-term";

  return superagent
    .post("https://dwz.cn/admin/v2/create")
    .send({ Url: longUrl, TermOfValidity: TermOfValidity })
    .set("Content-Type", "application/json")
    .set("Token", token);
};

const reStore = url => {
  let token = "b6adb3e2628337ac6d55ff001249e6fc";
  return superagent
    .post("https://dwz.cn/admin/v2/query", { shortUrl: url })
    .set("Content-Type", "application/json")
    .set("Token", token);
};

async function getData() {
  let rt = await superAgentLink();
  console.log("短网址", rt);
  let restore = await reStore(rt.body.ShortUrl);
  console.log("原网址", restore.body.LongUrl);
}
// getData ();

// const pipeDef = (x, ...fn) => {
//   fn.reduce((y, f) => f(y), x);
// }

// const pipeDef = (...fn) => x => fn.reduce((y, f) => f(y), x);

function exchangeVariable(arg1, arg2) {
  let tmpv1 = arg1 ^ arg2;
  arg2 = tmpv1 ^ arg2;
  arg1 = tmpv1 ^ arg2;

  return { arg1, arg2 };
}

// let rt = exchangeVariable(1, 2);
// console.log('rt', rt);

// let cpus = os.cpus();
// console.log('cpus', cpus);

class Crypt {
  constructor(key) {
    this.key = key;
  }
  encryptIV(data) {
    if (!this.key || !data) {
      return "";
    }
    if (!_.isString(data)) {
      data = JSON.stringify(data);
    }
    let cipher;
    // let iv = new Buffer("1234567812345678");
    let iv = Buffer.from("1234567812345678");
    try {
      cipher = crypto.createCipheriv("aes-256-cbc", String(this.key), iv);
    } catch (err) {
      if (err) {
        console.log(`encrypt createCipher err : key(${this.key}) data(${data}) `);
        return "";
      }
    }
    let encrypted = cipher.update(String(data), "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

  decryptIV(data) {
    if (!this.key || !data || !_.isString(data)) {
      return "";
    }
    // let iv = new Buffer("1234567812345678");
    let iv = Buffer.from("1234567812345678");
    let decipher = crypto.createDecipheriv("aes-256-cbc", String(this.key), iv);
    let decrypted;
    try {
      decrypted = decipher.update(data, "hex", "utf8");
    } catch (err) {
      if (err) {
        console.log(`decrypt decipher.update err : key(${this.key}) data(${data}) decrypted(${decrypted})`);
        return "";
      }
    }
    try {
      decrypted += decipher.final("utf8");
    } catch (err) {
      if (err) {
        console.log(`decrypt decipher.final err : key(${this.key}) data(${data}) decrypted(${decrypted})`);
        return "";
      }
    }
    return decrypted;
  }
}

// let rt = new Crypt('%^%082uyyy3ebnYTE@$12328*&34n7fh');
// let ey = rt.encryptIV({name: 'leon'});
// console.log('加密: %s', ey);
// let dy = rt.decryptIV(ey)
// console.log('解密: %', dy)

let asyncGetNum = num => {
  return new Promise((resolve, reject) => {
    if (num === undefined) {
      reject(false);
    } else {
      resolve(num * 2);
    }
  });
};

// for (let k of [1,2,3,4,5]) {
//   let res = [];
//   asyncGetNum(k).then(data => {
//     res.push(data);
//   })
//   console.log('res', res);
//   return res;
// }

/**适配器模式 */
// class Adapter {
//   constructor () {
//     InterfaceAdapter.call(this);
//   }
//   request () {
//     let adaptee = new Adaptee();
//     adaptee.specialRequest();
//   }
// }
// util.inherits(Adapter, InterfaceAdapter);

// class InterfaceAdapter {
//   constructor () {

//   }
//   request () {
//     console.log('Target :: request');
//   }
// }

// class Adaptee {
//   specialRequest () {
//     console.log('Adaptee :: specialRequest');
//   }
// }

function printResult(points, batches, pi, ms) {
  console.log();
  console.log("\t# of points\t# of batches\t# of workers\tlatency in MS\testimated π\tdeviation");
  console.log("\t---------------------------------------------------------------------------------------");
  console.log("\t" + points + "\t\t" + batches + "\t\t" + 4 + "\t\t" + ms + "\t\t" + pi.toPrecision(7) + "\t" + Math.abs(pi - Math.PI).toPrecision(7));
}

// printResult(4000, 1, 3.14, 1000)

function spliceInsert(str, num) {
  let res = str.split("");
  let L = res.length;
  let t = "";
  for (let v of res) {
    t += v;
    num--;
    if (num <= 0) {
      break;
    }
  }
  return t;
}

function changeLine(str) {
  let res = str.split("，");
  let line = "";
  if (res.length > 1) {
    for (let s of res) {
      line += s;
      line += "<br/>";
    }
  }
  return line;
}
let rt = spliceInsert("乱👍👍👍👍但每天都打卡，任务圆满完成啦顺序有点错", 5);
console.log("rt\n" + rt);

function __filterIncludeArr(A, B) {
  let rt = [];
  if (!A.length || !B.length) return rt;
  for (let c of A) {
    if (B.includes(c)) continue;
    rt.push(c);
  }
  return rt;
}

// let rt = __filterIncludeArr([1,2,3,5], [1,2,3,4]);
// console.log('rt', rt)

let str = "aaeeccdd";
let tartet = [
  { tar: "aa", replace: "ee" },
  { tar: "dd", replace: "ff" }
];

/**字符串匹配算法 动态规划问题
 * mat [{target: 'xx', replace: 'xx'}]
 */
class KMP {
  constructor(str, mat) {
    this.str = str;
    this.mat = mat;
  }

  replace() {
    for (let t of this.mat) {
      let s = t.target;
      if (!s) break;
      let rt = this.findPlace(s);
      this.doReplace(rt, t.replace);
    }
  }

  findPlace(target) {
    let temp = this.str;
    for (let s = 0; s < this.str.length; ++s) {
      if (this.str[s] !== target[0]) continue;
      if (this.str.length - s < target.length) break;
      let d = s;
      for (let i = 0; i < target.length; ++i) {
        d += 1;
        if (target[i] !== this.str[d]) break;
      }
      if (d < s + target.length) continue;
      return {
        start: s,
        end: s + target.length,
        value: target
      };
    }
  }

  doReplace(detail, mat) {
    if (!detail || !detail.start || !detail.end || !detail.value) throw new Error("规则有误");
    let idx = 0;
    let temp = this.str.split("");
    for (let i = detail.start; i < detail.end; ++i) {
      temp[i] = mat[idx];
      idx += 1;
    }
    this.str = temp.join("");
    return this.str;
  }
}

// const kmp = new KMP('saaddios', [{target: 'aa', replace: 'qq'}]);
// kmp.replace();
// console.log('str', kmp.str);
// let appid = "wx18393ade222909a0";
// let secret = "0f9bc9d88ad8ed4917595aae66f09cff";

// async function __getWechateAccesToken() {
//   return superagent.get("https://api.weixin.qq.com/cgi-bin/token?" + `grant_type=client_credential&appid=${appid}&secret=${secret}`);
// }
// async function getdd() {
//   let rts = await __getWechateAccesToken();
//   console.log("rt", rts.body);
// }
// getdd();

/**
 * 特征提取算法
 * 将图片灰度化 --> 判断灰度图像的相似度
 * 1.压缩图片 将图片绘制在canvas上，相邻且颜色相近的像素会被删减掉，有效减少了图片的信息量，因此能够实现压缩的效果
 * width 就是要压缩的范围值
 */
const compressImage = (imgSrc, imgWidth) => {
  return new Promise((resolve, reject) => {
    if (!imgSrc) {
      reject("imgSrc can not be empty");
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
      canvas.width = imgWidth;
      canvas.height = imgWidth;
      ctx.drawImage(img, 0, 0, imgWidth, imgWidth);
      const data = ctx.getImageData(0, 0, imgWidth, imgWidth);
      resolve(data);
    };
    img.src = imgSrc;
  });
};
/**
 * 2. 图片灰度化 根据RGBA数组生成 ImageData
 * 灰度化是指每个像素只有一个采样颜色的图像
 * @param dataDetail {Number[]}
 */
const createImageData = dataDetail => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const imgWidth = Math.sqrt(dataDetail.length / 4);
  const newImageData = ctx.createImageData(imgWidth, imgWidth);
  for (let i = 0; i < dataDetail.length; i += 4) {
    let R = dataDetail[i];
    let G = dataDetail[i + 1];
    let B = dataDetail[i + 2];
    let alpha = dataDetail[i + 3];

    newImageData.data[i] = R;
    newImageData.data[i + 1] = G;
    newImageData.data[i + 2] = B;
    newImageData.data[i + 3] = alpha;
  }

  return new newImageData();
};

/**
 * 图像灰度化
 * @param imgData : ImageData
 * ImageData.data 是一个Uint8ClampedArray 数组 数组中的每个数字取值为0~255 每4个数字为一组，表示一个像素的RGBA值，ImageData为只读对象，所以要另外写一个createImageData方法，来创建新的ImageData对象
 * 灰度值就是取每个像素点的值取平均值
 */
const createGrayScale = imgData => {
  const newData = Array(imgData.data.length);
  /**像素点填充0 初始化像素 就是全黑色 */
  newData.fill(0);
  imgData.data.forEach((_data, index) => {
    /**每4位为一个像素点 */
    if ((index + 1) % 4 === 0) {
      const R = imgData.data[index - 3];
      const G = imgData.data[index - 2];
      const B = imgData.data[index - 1];

      /**取平均值 */
      const gray = ~~((R + G + B) / 3);
      newData[index - 3] = gray;
      newData[index - 2] = gray;
      newData[index - 1] = gray;
      newData[index] = 255; //alpha 值固定为255
    }
  });
  return createImageData(newData); //返回 灰度图像
};

/**指纹提取 (平均哈希算法) ：若灰度图的某个像素的灰度值大于平均值，则视为1，否则为0，这部分信息组合起来就是图片的指纹[一串哈希字符串],由0和1组成
 * @param imgData : ImageData
 */
const getHashFingerPrint = imgData => {
  const getGrayList = imgData.data.reduce((pre, cur, index) => {
    if ((index + 1) % 4 === 0) {
      pre.push(imgData.data[index - 1]);
    }
    return pre;
  }, []);
  const length = getGrayList.length;
  /**算出 像素灰度值的平均值 */
  const grayAverage = getGrayList.reduce((pre, next) => pre + next, 0) / length;
  return getGrayList.map(gray => (gray >= grayAverage ? 1 : 0)).join("");
};

/**
 * 感知哈希算法：离散余弦变换(DCT)
 * 利用离散余弦变换将图像域转化为频率域，计算出高频和低频的均值，低频的部分会集中在左上角，DCT计算出的是32 * 32的矩阵，保留左上角8 * 8的矩阵
 * 计算均值：和均值hash一样计算DCT的均值
 * 计算hash值，根据8 * 8的DCT矩阵，设置0或1的hash值，构成一个64位的整数,得到图片的指纹
 * @param N: 矩阵长度
 * @param cosMap: map
 */
const memorizeCosines = (N, cosMap) => {
  cosMap = cosMap || {};
  cosMap[N] = new Array(N * N);

  let PI_N = Math.PI / N;
  for (let k = 0; k < N; ++k) {
    for (let n = 0; n < N; ++n) {
      cosMap[N][n + k * N] = Math.cos(PI_N * (n + 0.5) * k);
    }
  }
  return cosMap;
};

/**
 * 经过dct处理后生成的一维数组，
 *
 * @param {} signal
 * @param {*} scale
 */
const dct = (signal, scale = 2) => {
  let L = signal.length;
  let cosMap = null;
  if (!cosMap || !cosMap[L]) {
    cosMap = memorizeCosines(L, cosMap);
  }

  let coefficients = signal.map(function() {
    return 0;
  });
  return coefficients.map((_, idx) => {
    return (
      scale *
      signal.reduce(function(pre, cur, index) {
        return pre + cur * cosMap[L][index + idx * L];
      }, 0)
    );
  });
};

/**
 * 矩阵处理方法: 经过dct方法生成的一维数组升维成二维数组(矩阵)
 * 以及从矩阵中获取其左上角内容(截取8 * 8矩阵)
 */

const createMatrix = (arr = []) => {
  const length = arr.length;
  const matrixWidth = Math.sqrt(length);
  /**二维数组 */
  const matrix = [];
  for (let i = 0; i < matrixWidth; ++i) {
    /**获得二维数组中项 */
    const _ = arr.slice(i * matrixWidth, i * matrixWidth + matrixWidth);
    matrix.push(_);
  }
  return matrix;
};

/**截取 矩阵*/
const getMatrixRange = (matrix, range) => {
  const rangeMatrix = [];
  for (let i = 0; i < range; ++i) {
    for (let j = 0; j < range; ++j) {
      rangeMatrix.push(matrix[i][j]);
    }
  }
};

const getPHashFingerPrint = imgData => {
  /**dct 化 */
  const dctData = dct(imgData.data);
  /**二维矩阵化 */
  const dctMatrix = createMatrix(dctData);
  /**截取矩阵 */
  const rangeMatrix = getMatrixRange(dctMatrix, dctMatrix.length / 8);
  const rangeAve = rangeMatrix.reduce((pre, cur) => pre + cur, 0) / rangeMatrix.length;
  /**生成均值 */
  return rangeMatrix.map(val => (val >= rangeAve ? 1 : 0)).join("");
};

/**
 * 颜色分布法
 * 划分颜色区间，默认区间有4个
 * 把256种颜色划分成了4种
 * 划分区间的数量要求就是能被256整除
 * @param imgData :imageData
 * @param zoneAmount :number
 */
const simplifyColorData = (imgData, zoneAmount = 4) => {
  const colorZoneDataList = []; //number[]
  const zoneStep = 256;
  const zoneBorder = [0]; //边界
  for (let i = 1; i < zoneAmount; ++i) {
    zoneBorder.push(zoneStep * i - 1);
  }
  imgData.forEach((data, index) => {
    if ((index + 1) % 4 !== 0) {
      for (let i = 0; i < zoneBorder.length; ++i) {
        if (data > zoneBorder[i] && data <= zoneBorder[i + 1]) {
          data = i;
        }
      }
    }
    colorZoneDataList.push(data);
  });
  return colorZoneDataList;
};

/**
 * 简化颜色后，归类到不同分组中
 * @param simplifiedDataList :number[]
 */
const seperateListToColorZone = simplifiedDataList => {
  const zonedList = []; //string[]分类的区间
  let tempZone = []; //number[]
  simplifiedDataList.forEach((data, index) => {
    /**4位 一组 组成数组*/
    if ((index + 1) % 4 !== 0) {
      tempZone.push(data);
    } else {
      zonedList.push(JSON.stringify(tempZone));
      tempZone = [];
    }
  });
  return zonedList;
};
/**
 * 统计相同分组的总数
 * @param zonedList :string[]
 * @param zoneAmount :number
 */
const getFingerPrint = (zonedList, zoneAmount = 16) => {
  const colorSeperateMap = {};
  for (let i = 0; i < zoneAmount; ++i) {
    for (let j = 0; j < zoneAmount; ++j) {
      for (let k = 0; k < zoneAmount; ++k) {
        colorSeperateMap[JSON.stringify([i, j, k])] = 0;
      }
    }
  }
  zonedList.forEach(zone => {
    colorSeperateMap[zone]++;
  });
  /**返回的是一个 8 * 8 矩阵 矩阵中的每个元素是计算出的相同分组出现的次数 这个矩阵就是该图片的指纹*/
  return Object.values(colorSeperateMap);
};

/**内容特征法
 * 是指 把图片转化为灰度图后再转化为 二值图, 然后根据像素的取值（一般是黑和白，因为容易区分，用0或1就可以表示）形成指纹后进行比对，核心就是找到一个阈值生成二值图。
 * 若直接用RGB的均值作为灰度，那么处理后的灰度图像整体会偏暗，对后续生成的二值图会产生较大的干扰。
 * 为了改善这种情况，会为RGB三种颜色添加不同的权重，经过统计，比较好的权重配比是 R:G:B=0.299:0.587:0.114
 */

const grayScaleWeight = {
  R: 0.299,
  G: 0.587,
  B: 0.114
};

/**加权 灰度化
 * @param imgData :imageData
 */
const toGray = imgData => {
  const grayData = [];
  const data = imgData.data; //RGB对象

  for (let i = 0; i < data.length; i += 4) {
    const gray = ~~(data[i] * grayScaleWeight.R + data[i + 1] * grayScaleWeight.G + data[i + 2] * grayScaleWeight * B); //加权灰度
    data[i] = data[i + 1] = data[i + 2] = gray;
    grayData.push(gray);
  }
  /**返回一个每个元素代表一个像素的灰度值的数组 */
  return grayData;
};

/**
 * 计算二值图的域值
 * 大津法
 * @param imgData :imageData
 */

const OTSUAlgorithm = imgData => {
  const grayData = toGray(imgData);
  let ptr = 0;
  /**初始化 */
  let histData = Array(256).fill(0);
  let total = grayData.length;

  while (ptr < total) {
    /**获得 0-255 范围内的灰度值 默认值是1*/
    let h = 0xff & grayData[ptr++];
    histData[h]++;
  }
  let sum = 0;
  for (let i = 0; i < 256; ++i) {
    sum += i * histData[i];
  }

  let wB = 0;
  let wF = 0;
  let sumB = 0;
  let varMax = 0;
  /**要计算的阈值 */
  let threshold = 0;

  for (let t = 0; t < 256; ++t) {
    wB += histData[t];
    if (wB === 0) continue;
    wF = total - wB;
    if (wF === 0) break;

    sumB += t * histData[t];

    let mB = sumB / wB;
    let mF = (sum - sumB) / wF;
    let varBetween = wB * wF * (mB - mF) ** 2;

    if (varBetween > varMax) {
      varMax = varBetween;
      threshold = t;
    }
  }

  return threshold;
};

/**
 * 使用阈值对原图进行处理
 * 得到一个只包含0和1的矩阵
 * @param imgData :imageData
 * @param threshold :number
 */
const binaryZation = (imgData, threshold) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const imgWidth = Math.sqrt(imgData.data.length / 4);
  const newImageData = ctx.createImageData(imgWidth, imgWidth); //使用canvas重绘 灰度图像
  for (let i = 0; i < imgData.data.length; i += 4) {
    let R = imgData.data[i];
    let G = imgData.data[i + 1];
    let B = imgData.data[i + 2];
    let Alpha = imgData.data[i + 3];
    let sum = (R + G + B) / 3;

    newImageData.data[i] = sum > threshold ? 255 : 0; //灰度图矩阵 非黑即白
    newImageData.data[i + 1] = sum > threshold ? 255 : 0;
    newImageData.data[i + 2] = sum > threshold ? 255 : 0;
    newImageData.data[i + 3] = Alpha;
  }

  return newImageData;
};

/**
 * 汉明距离：两个等长字符串之间对应位置不同字符的个数，距离越短，说明两个字符串越相等
 * 反推 相似度相关性公式: (字符串长度 - 汉明长度) / 字符串长度 值越大，越相似
 */
const hammingDistance = (str1, str2) => {
  let dis = 0;
  let arr1 = str1.split("");
  let arr2 = str2.split("");
  arr1.forEach((item, index) => {
    if (item !== arr2[index]) {
      dis++;
    } else {
      return;
    }
  });
  return dis;
};

/**
 * 综上比对算法的适用场景
 * 对于颜色较为丰富的两张图片，颜色分布法的计算结果是最符合直觉的。或者说对于两张差异较大的图片来说。
 * 对于内容相似但配色不同的图片，内容特征法或平均哈希算法，感知哈希算法是比较符合预期的。
 */

let testArr = [
  {
    uid: 1,
    du: 10
  },
  {
    uid: 1,
    du: 20
  },
  {
    uid: 1,
    du: 30
  },
  {
    uid: 2,
    du: 10
  }
];
// testArr = testArr.sort((a, b) => {
//   if (a.uid > b.uid) {
//     return -1;
//   }
//   if (a.uid === b.uid && a.du < b.du) {
//     return -1;
//   }
//   return 1;
// });
// console.log("res", testArr);

let now = moment().toDate(); //现在时间的date格式
let startFormat = moment(now).format("YYYY-MM-DD"); //2020-01-19
let startDate = moment(startFormat).toDate(); // 当天的0点 date格式
let endDate = new Date(new Date(startDate).valueOf() + 24 * 60 * 60 * 1000); //后一天的0点 date格式

class NodeAdvanced {
  constructor() {
    this.fileName = process.argv[2];
    this.destPath = process.argv[3];

    this.fileSize = 0;
    this.counter = 1;
    this.fileArray = [];
    this.duplicate = "";
  }

  /**
   * 高效 对大文件操作 > 2GB
   */
  static readBigFileEfficy() {
    const readable = fs.createReadStream(this.fileName);
    readable.read(); //设置可读流的缓冲区
    const writeable = fs.createWriteStream(this.destPath || "output");

    fs.stat(this.fileName, (err, stats) => {
      this.fileSize = stats.size;
      this.counter = 1;
      this.fileArray = this.fileName.split(".");

      try {
        this.duplicate = this.destPath + "/" + this.fileArray[0] + "_Copy." + this.fileArray[1];
      } catch (e) {
        console.exception("File Name is inValid! please rename");
      }

      process.stdout.write(`File: ${this.duplicate} is being created`);

      readable.on("data", chunk => {
        let percentageCopied = ((chunk.length * this.counter) / this.fileSize) * 100;
        process.stdout.clearLine(); //清除输出行信息
        process.stdout.cursorTo(0);
        process.stdout.write(`${Math.round(percentageCopied)}%`); //计算传输的百分比
        writeable.write(chunk); //写入流
        this.counter += 1;
      });

      readable.pipe(writeable); //使用pipe 管理流读写,他能控制磁盘的读写的速度以至于不会阻塞内存。

      readable.on("end", e => {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("Successful");
        return;
      });

      readable.on("error", e => {
        console.log("some error occured");
      });

      writeable.on("finish", () => {
        console.log("successfule write");
      });
    });
  }
}

// let testMap = [
//   {
//     a: 1,
//     b: 1
//   },
//   {
//     a: 2,
//     b: 2
//   },
//   {
//     a: 3,
//     b: 3
//   }
// ];
// console.log(_.map(testMap, "a"));
// console.log(_.mapKeys(testMap, "a"));

/**
 * 确保n 为2的幂
 * @param {Number} n
 */
const get2Cloth = n => {
  n |= n >>> 1; //1
  n |= n >>> 2; //2
  n |= n >>> 4;
  n |= n >>> 8;
  n |= n >>> 16;
  return n;
};

// let text = [{ path: 1, children: [{ path: 2, children: [{ path: 5 }] }] }, { path: 3 }];

const noIlleageObjectKey = (object, params) => {};

/**状态码 默认是PENDING */
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
class MyPromise {
  constructor (fn) {
    this.state = PENDING;
    this.value = null;
    this.resolvedCallbakcs = [];
    this.rejectedCallbacks = [];

    this.fn = fn;  //待传入的回调
  }

  /**resolve方法 本质上是传入一个函数并执行 只有等待中的状态才能改变状态 */
  resolve (value) {
    if (value instanceof MyPromise) {
      return value.then(this.resolve, this.reject);
    }
    setTimeout(() => {
      if (this.state === PENDING) {
        this.state = RESOLVED;
        this.value = value;
        this.resolvedCallbakcs.map(cb => cb(this.value));
      }
    }, 0)

  }

  reject (value) {
    setTimeout(() => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.value = value;
        this.rejectedCallbacks.map(cb => cb(this.value));
      }
    }, 0)
  }

  then (onFullfilled, onRejected) {
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : r => {throw r};

    if (this.state === PENDING) {
      return (promise2 = new MyPromise((resolve, reject) => {
        this.resolvedCallbakcs.push(() => {
          try {
            const x = onFullfilled(this.value);
            this.resolutionProcedure(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        });

        this.rejectedCallbacks.push(() => {
          try {
            const x = onRejected(this.value);
            this.resolutionProcedure(promise2, x, resolve, reject)
          } catch (e) {
            reject(e);
          }
        });
      }))
    }

    if (this.state === RESOLVED) {
      return (promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onFullfilled(this.value);
            this.resolutionProcedure(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        })
      }))
      // onFullfilled(this.value);
    }

    if (this.state === REJECTED) {
      return (promise2 = new MyPromise9((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onRejected(this.value);
            this.resolutionProcedure(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        })
      }))
    }
  }

  catch () {

  }

  resolutionProcedure (promise, x, resolve, reject) {
    if (promise === x) {
      return reject(new TypeError('Error'));
    }
  }
}

/**
 * 需要共用的列表接口 单独出来
 * @couponcupply
 * @servicePackage
 * @channelVendor
 * @resourceRights
 * @lineAd
 * @resourceTags
 * @albumCategory
 * @servicePackageRight
 * @article
 */

 /**KMP */
class KMPAglo {
  constructor () {

  }
}

/**
 * boyer-moore
 */
class BMAglo {
  constructor () {

  }
}

/**sunday */
class SundayAglo {
  constructor (target, source) {
    /**待匹配的字符串 */
    this.target = target;
    /**主串 */
    this.source = source;

    /**需要跳过的位置 */
    this.offset = 0;

    this.pattern = null;

    /**匹配字符串的长度 */
    // this.targetLen = this.target.length;
  }

  get targetLen () {
    return this.target.length
  }

  get sourceLen () {
    return this.source.length;
  }

  search () {

    this.pattern = this.pick(this.offset, this.targetLen);
    if (!this.hasCross()) { //第一段未匹配,必定有不匹配字符
      if (this.offset === (this.sourceLen - this.targetLen - 1)) return false;
      if (!this.offset) {
        this.offset += this.targetLen;
      }
      if (!~this.index(this.source[this.offset])) {  //target中不存在此字符，可直接跳过整串
        this.offset = this.offset + 1;
        return this.search();
      } else {
        let idx = this.lastIndexOf(this.source[this.offset]);
        this.offset += this.targetLen - idx + 1;
        this.offset += 1;
        return this.search();
      }
    }
    return true
  }

  /**从主串中第offset位取出长度与target相同的串 */
  pick (offset) {
    return this.source.substr(offset, this.targetLen);
  }

  /**主串与子串不匹配的第一个字符 */
  index (str) {
    return this.target.indexOf(str);
  }

  lastIndexOf (str) {
    return this.target.lastIndexOf(str)
  }

  /**是否有不匹配的字符 当前字符串是否相等 */
  hasCross () {
    if (this.pattern && this.pattern.length) {
      return this.pattern === this.target;
    } else {
      throw new Error("当前pattern有误");
    }
  }
}

/**
 * 蚁群算法
 * 一种最优的分配策略
 * 能够将N哥不同长度的任务按照某一种策略分配给M个处理能力不同的服务器节点并且N个任务完成的时间最短。
 */
class Aca {
  constructor () {
    this.tasks = []; //任务列表，长度表示任务的数量
    this.taskNum = 100; //任务数量，

    this.nodes = []; //处理节点的数组，数组的下标表示处理节点的编号。数组值表示节点的处理速度。
    this.nodeNum = 10; //处理节点的数量，也就是nodes数组的长度

    this.iteratorNum = null; //一共需要迭代的次数,每次迭代都有antNum只蚂蚁进行任务分配
    this.antNum = null; //每次迭代中蚂蚁的数量，每只蚂蚁都是一个任务调度者，每次迭代中的每一只蚂蚁都需要完成所有任务的分配。

    this.timeMatrix = []; //任务处理时间矩阵，二维矩阵，timeMatrix[i][j]表示第i个任务分配给第j个节点所需要的处理时间。这个矩阵是基于tasks数组和node数组计算而来的

    this.pheromoneMatrix = []; //信息素矩阵，二维矩阵，用来记录任务i分配给j这条路径上的信息素浓度
    this.maxPheromoneMatrix = []; //pheromoneMatrix矩阵的每一行中最大信息素的下标
    this.criticalPointMatrix = []; //在一次迭代中，采用随机分配的策略的蚂蚁的临界编号。、

    this.p = 0.5; //每完成一次迭代后，信息素衰减的比例，因为在真实的蚁群中，蚂蚁分泌的信息素会随着时间的退役而渐渐衰减。那么在算法中，我们使得信息素完成一次迭代后进行衰减。但每一次迭代中，信息素浓度保持不变。
    this.q = 2; //蚂蚁每经过一条路径，信息素增加的比例。算法在每完成一次迭代之后，就将蚂蚁经过的路径上增加信息素，但在一次迭代过程中，信息素不变。

  }

  /**初始化tasks */
  initRandomTasks (num, range) {
    for (let i = 0; i < num; ++i) {
      this.tasks.push(range);
    }
  }
  /**初始化nodes */
  initRandomNodes (num, range) {
    for (let i = 0; i < num; ++i) {
      this.nodes.push(range);
    }
  }

  /**初始化任务处理时间矩阵 */
  initTimeMatrix (tasks, nodes) {
    for (let i = 0; i < tasks.length; ++i) {
      let timeMatrix_i = [];
      for (let j = 0; j < nodes.length; ++j) {
        /**时间 = 长度 / 速度 */
        timeMatrix_i.push(tasks[i] / nodes[j]);
      }
      this.timeMatrix.push(timeMatrix_i);
    }
  }

  /**初始化信息素矩阵
   * 初始化信息素为1
   * 意思是，分配给第i个任务的节点j这条路径的信息素浓度
   */
  initPheromoneMatrix (taskNum, nodeNum) {
    for (let i = 0; i < taskNum; ++i) {
      let pheromoneMatrix_i = [];
      for (let j = 0; j < nodeNum; ++j) {
        pheromoneMatrix_i.push(1);
      }
      this.pheromoneMatrix.push(pheromoneMatrix_i);
    }
  }

  acaSearch (iteratorNum, antNum) {
    for (let itCnt = 0; itCnt < iteratorNum; ++itCnt) {
      let pathMatrix_allAnt = [];
      for (let antCnt = 0; antCnt < antNum; ++antCnt) {
        let pathMatrix_onAnt = this.initTimeMatrix
      }
    }
  }

  /**
   * 任务分配函数
   * 将第taskCount 个任务分配给某一节点处理
   * antCount 蚂蚁编号
   * taskCount 任务编号
   * nodes 节点集合
   * pheromoneMatrix 信息素集合
   * 分配策略：两种，一是信息素浓度分配，也就是将任务分配给本行中信息素浓度最高的节点处理。二是随机分配，选择的条件是判断ancount 蚂蚁编号的临界点，一般是蚂蚁数量的一半
   */
  assignOneTask (antCount, taskCount, nodes, pheromoneMatrix) {
    if (antCount <= this.criticalPointMatrix[taskCount]) {
      return this.maxPheromoneMatrix[taskCount];
    }

    return Math.random(0, this.nodeNum);
  }
}


/**myCall
 * context: 传入的对象
*/
Function.prototype.myCall = function (context = window) {
  /**将fn挂载在context上的原因是this指向调用的对象，这样才能达到将当前this指向context的目的 */
  context.fn = this;
  let res = context.fn(...[...arguments].slice(1));
  delete context.fn;
  return res;
}

/**数组参数arr */
Function.prototype.myApply = function (context = window, arr) {
  context.fn = this;
  let res;
  if (arr) {
    res = context.fn(...arr);
  } else {
    res = context.fn();
  }
  delete context.fn;
  return res;
}

/**返回一个函数 */
Function.prototype.myBind = function (context = window) {
  let vm = this;
  let args = [...arguments].slice(1);
  return function () {
    return vm.myApply(context, args);
  }
}

/**new 实现 */
function myNew (targetClass, ...args) {
  let obj = Object.create(targetClass.prototype); //创建一个新对象,基于对象的prototype 创建一个新对象
  targetClass.apply(obj, args); //链接到原型，绑定this
  return obj;//返回新对象
}

let generateDir = 'demoVue'; //需要生成的文件夹名


const xiaowang = {
  love: "aaabbbccddd"
}

function sendToMyLove (obj) {
  console.log(obj.love)
  return "fuck off";
}

//对对象的属性值修改
const proxy = new Proxy(xiaowang, {
  //target就是传入的对象本身, key就是对象的属性
  get (target, key) {
    console.log('key' + key);
    if (key === 'love') {
      return target[key].replace("aaa", 'ttt');
    }
  }
})
// console.log(sendToMyLove(proxy));

// function addBigNum (a, b) {
//   let res = '', temp = 0;
//   a = a.split(',');
//   b = b.split(',');
//   while (a.length || b.length || temp) {
//     temp += ~~a.pop() + ~~b.pop();
//     res = (temp % 10) + res; //余数
//     temp = temp > 9; //大于10

//   }
//   return res.replace(/^0+/, '');
// }

function AddBigSum (A, B) {
  let result = [];
  A += '';
  B += '';
  const l = -15;
  while (A != '' && B != "") { //超过15位之后，分别每截取前15位，分段相加
    result.unshift(parseInt(A.substr(l)) + parseInt(B.substr(l))); //从低位加起
    A = A.slice(0, l);
    B = B.slice(0, l);
  }
  A += B; //截取之后的数字再相加
  for (let i = result.length - 1; i > 0; i--) { //大数截取出两段数字的情况
    result[i] += '';
    if (result[i].length > -l) {
      result[i - 1] += 1;
      result[i] = result[i].substr(1);
    } else {
      while (result[i].length < -l) {
        result[i] = '0' + result[i];
      }
    }
  }

  while (A && (result[0] + '').length > -l) { //判断若截取后的数字依然大于15位，则继续截取
    result[0] = (result[0] + '').substr(1);
    result.unshift(parseInt(A.substr(l)) + 1);
    A = A.slice(0, l);
  }

  if (A) {
    while ((result[0] + '').length < -l) { //高位补0
      result[0] = '0' + result[0];
    }
    result.unshift(A);
  }
  if (result[0]) {
    result = result.join(''); //最后两段数字拼接。待拼接的数字均不大于15位
  } else {
    result = '0'; //否则返回0
  }
  return result;

}

function reduce (A, B) {
  let result = [];
  A += '';
  B += '';
  while (A[0] === '0') { //首位是0，无意义
    A = A.substr(1);
  }
  while (B[0] === '0') {
    B = B.substr(1);
  }
  const l = -15;
  let N = '1';
  for (let i = 0; i < -l; ++i) {
    N += '0';
  }
  N = parseInt(N);
  console.log('N', N)
  while (A !== '' && B !== '') {
    result.unshift(parseInt(A.substr(l)) - parseInt(B.substr(l))) //从低位数减起
    A = A.slice(0, l); //去除后15位后的数字
    B = B.slice(0, l);
  }
  if (A !== '' || B !== '') { //截取后剩余数字
    let s = B === '' ? 1 : -1;
    A += B;
    while (A !== '') {
      result.unshift(s * parseInt(A.substr(l))); //若B小于A，则为减
      A = A.slice(0, l);
    }
  }
  while (result.length !== 0 && result[0] === 0) {
    result.shift(); //首位是0，则无意义
  }

  let s = '';
  if (result.length === 0) {
    result = 0;
  } else if (result[0] < 0) {
    s = '_';
    for (let i = result.length - 1; i > 0; i--) {
      if (result[i] > 0) {
        result[i] -= N; //低位不足，向高位借一位，高位减1，低位加1,这里是分成两段来计算。
        result[i -  1] ++;
      }

      result[i] *= -1;
      result[i - 1] = '';
      while (result[i].length < -l) { //位数不足补0
        result[i] = '0' + result[i];
      }
    }
    result[0] *= -1;
  } else {
    for (let i = result.length - 1; i > 0; i--) {
      if (result[i] < 0) {
        result[i] += N;
        result[i - 1]--;
      }
      result[i] += '';
      while (result[i].length < -l) {
        result[i] = '0' + result[i];
      }
    }
  }
  if (result) {
    while ((result[0] = parseInt(result[0])) === 0) {
      result.shift();
    }
    result = s + result.join('');
  }
  return result;

}

/**异步并发数限制
 * 利用Promsie.then() 将任务加到微任务队列，防止立即执行迭代方法
 * 微任务处理过程中，产生新的微任务，会在同一事件循环中，追加到微任务队列中
 * Promise.race() 在某个任务完成时，继续添加任务，保持任务按照最大并发数执行。
 * 任务完成，需要从任务队列中移除
 */
function limit (count, array, iterateFunc) {
  const tasks = [];
  const doingTasks = [];
  let i = 0;
  const enqueue = () => {
    if (i === array.length) {
      return Promise.resolve();
    }
    const task = Promise.resolve().then(() => iterateFunc(array[i++]))
    tasks.push(task);
    const doing = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1))
    doingTasks.push(doing);
    const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve();
    return res.then(enqueue);
  }
  return enqueue().then(() => Promise.all(tasks));
}

const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
limit(2, [1000, 1000, 1000, 1000], timeout).then(res => {
  console.log(res);
})

/**
 * 异步串行 | 异步并行
 */

 function promiseAdd (a, b) {
   return new Promise((resolve, reject) => {
     setTimeout((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(a + b);
      }
     }, 500);
   })
 }

 /**串行处理
  * reduce 从 0 开始 Promsie.resolve(0)
  */
 async function serialSum (...args) {
  return args.reduce((task, now) => {
    return task.then((res) => promiseAdd(res, now))
  }, Promise.resolve(0))
 }

 /**并行处理 */
 async function parallelSum (...args) {
  if (args.length === 1) return args[0];
  const task = []; //并行任务队列
  for (let i = 0; i < args.length; i += 2) {
    task.push(promiseAdd(args[i], args[i + 1] || 0)); //添加任务
  }
  const results = await Promise.all(task); //核心，利用Promsie.all() 并行执行所有task
  return parallelSum(...results); //递归
 }


//  (async () => {
//    console.log('并行 running');
//    const res1 = await serialSum(1,2,3,4,5,8,9,10,11,13);
//    console.log('res1: %d', res1);
//    const res2 = await parallelSum(1,2,3,4,5,8,9,10,11,13);
//    console.log('res2: %d', res2);
//    console.log('并行 Done');
//  })()

 /**数组扁平化 */
 function flatArr (array = []) {
   return array.reduce((res, item) => res.concat(Array.isArray(item) ? flatArr(item) : item), []);
 }

 /**对象扁平化 */
 function flatObject (obj = {}) {
   const res = {};
   function flat (item, preKey = '') {
    Object.entries(item).forEach(([key, val]) => {
      const newKey = preKey ? `${preKey}.${key}` : key
      if (val && typeof val === 'object') {
        flat(val, newKey);
      } else {
        res[newKey] = val;
      }
    })
   }
   flat(obj);
   return res;
 }

 /**懒加载
  * 判断页面是否在可见区域
  */
 function isVisible (el) {
  const position = el.getBoundingClientRect();
  const windowHeight = document.documentElement.clientHeight;
  /**顶部边缘可见 */
  const topVisible = position.top > 0 && position.top < windowHeight;

  /**底部边缘可见 */
  const bottomVisible = position.bottom < windowHeight && position.bottom > 0;

  return topVisible || bottomVisible;
 }

 /**深度复制 */
 function deepCopyT (source, cache = new WeakMap()) {
  if (!source instanceof Object) return source;

  if (cache.get(source)) return cache.get(source);

  //函数
  if (source instanceof Function) {
    return function () { //返回函数
      source.apply(this.arguments);
    }
  }

  //日期
  if (source instanceof Date) return new Date(source);

  /**正则对象 */
  if (source instanceof RegExp) return new RegExp(source.source, source.flags);

  const res = Array.isArray(source) ? [] : {};

  cache.set(source, res);
  Object.keys(source).forEach(key => {
    if (source[key] instanceof Object) {
      res[key] = deepCopy(source[key], cache);
    } else {
      res[key] = source[key];
    }
  })
  return res;
 }


 /**
  * Promise 的并行调度器
  */
 class Scheduler {
   constructor () {
     this.queue = [];
     this.maxCount = 2;
     this.runCounts = 0; //运行的条数
   }

   add (promiseCreator) {
    this.queue.push(promiseCreator);
   }

   taskStart () {
     for (let i = 0; i < this.maxCount; ++i) {
       this.request();
     }
   }
   request () {
     if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
       return;
     }
     this.runCounts++;
     this.queue.shift()().then(() => {
       this.runCounts--;
       this.request();
     })
   }
 }

 const timeoutFunc = time => new Promise(resolve => {
   setTimeout(resolve, time);
 });

 const scheduler = new Scheduler();

 const addTask = (time, order) => {
  scheduler.add(() => timeoutFunc(time).then(() => console.log(order)));
 }

 addTask(1000, '1');
 addTask(5000, '2');
 addTask(3000, '3');
 addTask(4000, '4');
 scheduler.taskStart(); //并行就是不确定执行顺序，因此每一次的执行结果都不同

 /**渲染几万条数据 */
 function renderBigTable () {
  setTimeout(() => {
    const total = 100000;

    const once = 20;

    const loopCount = Math.ceil(total / once);
    let countOfRender = 0;
    const ul = document.querySelector('ul');
    function add () {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < once; ++i) {
        const li = document.createElement('li');
        li.innerText = Math.floor(Math.random() * total);
        fragment.appendChild(li);
      }
      ul.appendChild(fragment);
      countOfRender += 1;
      loop();
    }
    function loop () {
      if (countOfRender < loopCount) {
        window.requestAnimationFrame(add);
      }
    }

    loop();
  }, 0);
 }


 /**将虚拟dom转化为DOM */
//  function render (vnode, container) {
//     container.appendChild(_render(vnode));
//  }

 function _render (vnode) {
   /**数字类型就转化为string */
    if (typeof vnode === 'number') {
      vnode = String(vnode);
    }

    /**创建节点 */
    if (typeof vnode === 'string') {
      return document.createTextNode(vnode);
    }

    const dom = document.createElement(vnode.tag);
    if (vnode.attrs) { //节点属性
      Object.keys(vnode.attrs).forEach(key => {
        const value = vnode.attrs[key];
        dom.setAttribute(key, value);
      })
    }

    /**递归遍历 */
    vnode.children.forEach(child => render(child, dom));
    return dom;
 }

 const templateStr = (str, obj) => {
    let res = '';
    let flag = false;
    let start;
    for (let i = 0; i < str.length; ++i) {
      if (str[i] === '{') { //将{} 包含的内容取出
        flag = true;
        start = i + 1;
        continue;
      }
      if (!flag) res += str[i];
      else {
        if (str[i] === '}') {
          flag = false;
          res += matchStr(str.slice(start, i), obj);
        }
      }
    }
 }

 /**对象匹配 若对象没有的key，则返回原始字符，否则返回对象的值 */
 const matchStr = (str, obj) => {
    const keys = str.split('.').slice(1);
    let index = 0;
    let o = obj;
    while (index < keys.length) {
      const key = keys[index];
      if (!o[key]) {
        return `{${str}}`;
      } else {
        o = o[key];
      }
      index++;
    }
    return o;
 }

 /**计算前K 个出现次数最多的 */
 const topKRequest = (words, k) => {
    let maptemp = new Map();
    words.forEach(item => {
      maptemp.has(item) ? maptemp.set(item, maptemp.get(item) + 1) : maptemp.set(item, 1);
    })
    let ansList = [...maptemp].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    ansList = ansList.map(v => v[0]);
    return ansList.slice(0, k);
 }

 /**首字母转大写 */
 const toUpper =  (tar) => {
   console.log('res' ,tar)
   let upper = tar[0].toLocaleUpperCase();
   return upper + tar.substr(1);
 }

 function toNonExponential(num) {
  var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}

/**数组扁平化的多种实现及优化
 * 基本是利用 循环 + 递归 或 reduce + 递归 加判空或判数组条件
 */
class FlatClass {
  constructor (target) {
    this.target = target;
  }

  /**最基本且元素顺序一致的数组嵌套情况 */
  flat (array) {
    let arrResult = [];
    for (let i = 0; i < array.length; ++i) {
      if (Array.isArray(array[i])) {
        arrResult.push(...this.flat(array[i]));
      } else {
        arrResult.push(array[i]);
      }
    }
    return arrResult;
  }

  /**使用map  */
  mapFlat (array) {
    let arrResult = [];
    array.map(v => {
      if (Array.isArray(v)) {
        arrResult.push(...this.mapFlat(v));
      } else {
        arrResult.push(v)
      }
    })
    return arrResult;
  }

  /**使用reduce 归并 */
  reduceFlat (array) {
    return array.reduce((prev, cur) => {
      return prev.concat(Array.isArray(cur) ? this.reduceFlat(cur) : cur);
    }, [])
  }
  /**迭代器 generate */
  // generateFlat (array, num) {
  //   if (num === undefined) num = 1;
  //   for (const item of array) {
  //     if (Array.isArray(item) && num > 0) {
  //       yield* this.generateFlat(item, num - 1);
  //     } else {
  //       yield item;
  //     }
  //   }
  // }

  /**使用栈的思想实现flat  */
  stackFlat (array) {
    const result = [];
    const stack = [].concat(array); //将数组元素拷贝到栈，而不是直接复制(即深拷贝)
    while (stack.length !== 0) {
      const val = stack.pop(); //先从数组中去除，再判断是否该弹出该元素还是递归
      if (Array.isArray(val)) {
        stack.push(...val);
      } else {
        result.unshift(val)
      }
    }
    return result;
  }

  /**使用reduce + 递归 */
  numberFlat (array, num = 1) {
    return num > 0 ?
        array.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? this.numberFlat(cur, num - 1) : cur), [])
        : array.slice();
  }
}

/**原型链重写 flat */
Array.prototype.fakeFlat = function (num = 1) {
  if (!Number(num) || Number(num) < 0) {
    return this;
  }
  let arr = this.concat(); //获取调用这个方法的数组
  while (num > 0) {
    if (arr.some(x => Array.isArray(x))) {
      arr = [].concat.apply([], arr);
    } else {
      break;
    }
    num --;
  }
  return arr;
}

/**
 * 荷兰三色排序问题
 * @param {Array} array
 */
const holland = (array) => {
  /**
   * i, j, k 表示三个区间, 若有更多的须分割的数据，则继续加区间
   */
  let i = 0, j = 0, k = array.length - 1;
  let indexItem = null;
  for (let m = 0; m < array.length; ++m) {
    if (j === k) { //指针重合，结束
      break;
    }
    if (!indexItem) {
      indexItem = array[m];
      i ++;
      j ++;
      continue;
    }
    if (indexItem === array[m] && i === j) { //相等，则继续往前
      i ++;
      j ++;
      continue;
    }
    if (indexItem !== array[m] && i === j) { //第二种情况
      indexItem = array[m];
      j++;
      continue;
    }
    if (indexItem !== array[m] && i !== j) { //第三种情况 [交换元素,指针移动]
      let middle = array[k];
      array[k] = array[m];
      array[m] = middle;
      k--;
      j++;
      if (array[i] !== array[j]) { //交换之后，比对元素
        middle = array[j];
        array[j] = array[i];
        array[i] = middle;
      }
      continue;
    }
  }
  return array;
}

// console.log('=========>>>>000', holland([1,2,3,2,3,1,2])); // 1122233

/** 贪心算法
 * 动态规划问题，找局部最优解 换酒瓶问题
 */
class GreedyAlgorithm {
  constructor (bottles, exchange) {
    this.bottles = bottles; // 最大酒瓶数
    this.exchange = exchange; // 每次能换的酒瓶数
  }

  calc () {
    let sum = this.bottles;
    let index = 0;
    while (this.bottles >= this.exchange) { // 只要总数还大于需兑换的数，就能换
      /** 每一轮消耗 都换得一瓶酒 同时也会产生一个酒瓶 */
      this.bottles -= this.exchange;
      /** 总共能喝到的酒就是 num + 多喝到的酒 */
      ++sum;
      ++index;

      ++this.bottles;
    }
    return index;
  }

  reCalc () { //改进 贪心算法
    let sum = this.bottles;
    while (this.bottles >= this.exchange) {
      let mode = this.bottles / this.exchange; //取模
      sum += mode;

      // 剩余的酒瓶 为兑换 + 已兑换喝掉的
      this.bottles = this.bottles % this.exchange + mode;
    }
    return sum;
  }
}

let il = new GreedyAlgorithm(9, 3);
// console.log('========>>>能多喝到的酒瓶il:', il.calc());
// console.log('========>>>总共喝到的酒瓶il:', (il.calc() + 9));
// console.log('========>>>改进贪心 能多喝到的酒瓶il:', il.reCalc());

function extend (source) {
  let res = {};
  for (let key in source) {
    if (Object.prototype.toString.call(source[key]) === '[object Array]') {
      res[key] = source[key].slice();
      continue;
    }
    if (Object.prototype.toString.call(source[key]) === '[object Object]') {
      res[key] = this.extend(source[key]);
      continue;
    }
    res[key] = source[key];
  }
  return res;
}

function concat (origin, target, index) {
  if (index === origin.length - 1) { // 直接在最后插入数据
    return origin.concat(target);
  }
  let oLen = origin.length;
  let tLen = target.length;
  let res = new Array(oLen + tLen); // 初始化
  for (let i = 0; i < (oLen + tLen); ++i) {
    if (i <= index) {
      res[i] = origin[i];
      continue;
    }
    if (i > index + tLen) {
      res[i] = origin[i - tLen];
      continue;
    }
    res[i] = target[i - index - 1];
  }
  return res;
}

function reduceWrapperMap (array, cb) {
  return array.reduce((acc, cur, index, array) => {
    const item = cb(cur, index, array);
    acc.push(item);
    return acc;
  }, [])
}

class VueProxy {
  constructor (target, handle = {
    set(target, key, value, recevier) {
      return Reflect.set(target, key, value, recevier);
    }
  }) {
    if (!this.isArray(target) && !this.isObject(target)) {
      throw new Error('不是数组或对象');
    }
    this._target = target;
    this._handler = handle;

    return new Proxy(this.observe(this._target), this._handler);
  }

  isArray (target) {
    return Object.prototype.toString.call(target) === '[object Array]';
  }

  isObject (target) {
    return Object.prototype.toString.call(target) === '[object Object]'
  }

  observe () {
    for (let key in target) {
      if (this.isObject(target[key]) || this.isArray(target[key])) {
        this.observe(target[key]);
        target[key] = new Proxy(target[key], this._handler);
      }
    }
    return target;
  }
}

/**
 * 解码当前参数字符数字可能存在的组合，统计组合的数量
 * 思路：拆解字符数字，算组合，若存在组合大于26，则拆分(最大不超过26，即 Z)，0无法拆解，因为所有的数字都需要映射，0开头的字符无法拆解。
 * 例如 10345609
 * @param {String}} strNum
 */
function decodeNumberCnt (strNum) {
    if (!strNum || !strNum.length || strNum.startsWith('0')) return 0;
}


function deepCloneFP(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const isArray = Array.isArray(target);
    let cloneTarget = isArray ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);

    const keys = isArray ? target : Object.keys(target);
    console.log('keys', keys);
    let idx = -1;
    const len = keys.length;

    while (++idx < len) {
      let tmpKey = idx;
      if (keys) {
        tmpKey = keys[idx];
      }
      console.log('000', tmpKey);
      cloneTarget[idx] = deepCloneFP(keys[tmpKey], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}

/** 封装promise 具有限流、执行队列 */
class AxiosCover {
  constructor (n) {
    this.limit = n;
    this.count = 0;
    this.queue = [];
  }

  /** 入列 */
  enqueue (fn, promise = null, resolve = null, reject = null) {
    if (promise) {
      this.queue.push({fn, resolve, reject});
      this.queue.push(promise);
      return promise;
    }
    let p = new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject })
    })
    this.queue.push(p);
    return p;
  }

  //出列
  dequeue () {
    if (this.count < this.limit && this.queue.length) {
      const { fn, resolve, reject } = this.queue.shift();
      const p = this.queue.shift();
      this.run(p, fn, resolve, reject);
    }
  }
  /** 执行fn */
  async run (p, fn, resolve, reject) {
    try {
      this.count ++;
      const value = await fn(p, resolve, reject);
      this.count --;
      /** 释放主promise */
      this.dequeue();
      resolve(value);
    } catch (e) {
      this.count --;
      this.dequeue();
    }
  }

  build (fn, promise) {
    let p = this.enqueue(fn, ...promise);
    this.dequeue();
    return p;
  }

  post (url) {
    let fns = [], len = arguments.length - 1, parentPromise = [], hasRetry = false;
    if (arguments.length > 1) {
      url = arguments[0];
      if (len > 2 && arguments[len - 2] instanceof Promise) {
        parentPromise = [].slice().call(arguments, len - 2);
        fns = [].slice().call(arguments, 0, len - 2);
      } else {
        fns = [].slice().call(arguments, 0);
      }
    }

    /** 队列里面的promise 执行真正请求的地方 */
    let request = (...parentP) => {
      let res, rej, promise;
      promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
        setTimeout(() => {
          resolve(url + '执行成功');
        }, Math.random() * 500);
        setTimeout(() => {
          reject(url + '执行失败');
        }, Math.random() * 500);
      })
      for (const fn of fns) {
        if (typeof fn === 'function') {
          fn.bind(this)(promise, res, rej, fns, parentP);
          if (fn.name === AxiosCover.retry.name) {
            hasRetry = true; //已重试
          }
        }
      }
      if (!hasRetry) {
        AxiosCover.retry[0].bind(this)(promise, res, rej, fns, parentP);
      }
      return promise;
    };
    return this.build(request, parentPromise);
  }

  /** 重试策略 */
  static retry (times) {
    return function retry (promise, resolve, reject, args, parentP) {
      /** promise 的错误回调 */
      promise.catch(v => {
        if (this instanceof AxiosCover && times > 0) { //当前实例中，且重试次数大于1
          for (let a of args) {
            if (typeof a === 'function' && a.name === AxiosCover.retry.name) {
              times --;
              a = AxiosCover.retry[times];
            }
          }
          console.log(args[0] + '重试');
          this.post(...args, ...parentP);
        } else {
          parentP[parentP.length - 1](new Error('重试失败' + v));
        }
      })
    }
  }

  /** time 限制 超时策略 */
  static timeout (time) {
    return function timeout (promise, resolve, reject, args) {
      let t = setTimeout(() => {
        reject(args[0] + '超时')
      }, time);
      promise.then(() => {
        clearTimeout(t);
        t = null;
      }).catch(() => {
        clearTimeout(t);
        t = null;
      })
    }
  }
}

// let testRow = [1,2,3,4,5];
// let arr1 = testRow.slice(0, 1);
// let arr2 = testRow.slice(1);

function transform (data, fields) {
  const res = []
  fields.forEach((item, index) => {
    res.concat(data.map(v => { v.name === item; return v; }));
  })
  console.log('res', res);
  return res;
}

const getKeyByValue = (source, target) => {
  let value = '';
  for (let key in source) {
    if (source[key] === target) {
      value = key;
      break;
    }
  }
  return value;
}

const arithSerialize = {
  1: '∩',
  2: '∪',
  3: '-',
}

let rts = getKeyByValue(arithSerialize, '∪');
console.log('>>>rt', rts);
