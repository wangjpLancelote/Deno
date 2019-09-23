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
// const appSecret = 'DE89AE71DDC74E639D1B70AC022D68C8';
// const appKey = '338f8ee1c88d36f69812cbd299de2677';
const Bluebird = require("bluebird");

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
  if (!arr1.length && !arr2.length)
    return new Error("can not both empty array");

  let item1 = arr1.length ? arr1[0] : Infinity;
  let item2 = arr2.length ? arr2[0] : Infinity;

  if ([Infinity].includes(item1, item2)) {
    return item1 === Infinity
      ? arr2.length & 1
        ? (arr2[Math.floor(arr2.length / 2)] +
            arr2[Math.ceil(arr2.length / 2)]) /
          2
        : arr2[arr2.length / 2]
      : arr1.length & 1
      ? (arr1[Math.floor(arr1.length / 2)] + arr1[Math.ceil(arr1.length / 2)]) /
        2
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
        tmp.value =
          tmp.value > this.maxLen - this.target[i]
            ? this.maxLen - this.target[i]
            : tmp.value;
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
    this.next = [[0, -1], [0, 1], [1, 0], [-1, 0]];

    /**
     * 迷宫
     * 三维数组组成，第三位表示能否通过
     */
    this.palace = [];

    this.wall = [[0, 1], [1, 3], [3, 3]];

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
      let tmpPos =
        (pos[0] + this.next[i][0]) * this.len + pos[1] + this.next[i][1]; //下一步的坐标
      if (
        pos[0] + this.next[i][0] < 0 ||
        pos[0] + this.next[i][0] >= this.len ||
        pos[1] + this.next[i][1] < 0 ||
        pos[1] + this.next[i][1] >= this.len
      ) {
        continue; //下一步越界了
      } else if (this.palace[tmpPos] && this.palace[tmpPos][2] === 1) {
        //下一步不是墙
        this.palace[tmpPos][2] = 0;
        result.push(pos[0] + this.next[i][0], pos[1] + this.next[i][1]);
        this.search(
          [pos[0] + this.next[i][0], pos[1] + this.next[i][1]],
          step + 1,
          result
        );
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
  let str_num =
    CONSTANT_STD_STR[Math.floor(Math.random() * (len - 1))] +
    Math.floor(Math.random() * 10);

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
    return await Promise.resolve("123");
  } else {
    p++;
    return tt(p);
  }
}
async function dd() {
  let data = await tt(1);
}
dd();
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

let redisService = new RedisService();
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
      if (
        i + 1 < this.target.length &&
        Number(this.target[i] + this.target[i + 1]) < 27
      ) {
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

    console.log(
      "prime: %j, generator: %j",
      prime.toString("hex"),
      generator.toString("hex")
    );

    let tower = crypto.createDiffieHellman(prime, generator);
    let towerKeys = tower.generateKeys();

    console.log(
      "tower: %j, towerKeys: %j",
      tower.toString("hex"),
      towerKeys.toString("hex")
    );

    let base_secret = base.computeSecret(towerKeys);
    let tower_secret = base.computeSecret(base_keys);

    console.log(
      "base_secret: %j, tower_secret: %j",
      base_secret.toString("hex"),
      tower_secret.toString("hex")
    );
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
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
      'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
      'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
      'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
    ];
  }

  /**编码 */
  encode (bin) {
    let codes = [];
    let remain = bin % 3; //若不能除尽3，则会剩下的几个数
    if (remain === 1) {  //补全两个
      bin.push(0, 0);
    } else if (remain === 2) {
      bin.push(0);
    }

    for (let i = 2; i < bin.length; i += 3) { //高位开始操作
      let c = bin[i - 2] << 16;
      c |= bin[i - 1] << 8;
      c |= bin[i];
      this.codes.push(this.base[c >> 18 & 0x3f]);
      this.codes.push(this.base[c >> 12 & 0x3f]);
      this.codes.push(this.base[c >> 6 & 0x3f]);
      this.codes.push(this.base[c & 0x3f]);
    }
    if (remain >= 1) {
      this.codes[this.codes.length - 1] = '=';
      bin.pop();
    }
    if (remain == 1) {
      this.codes[this.codes.length - 2] = '=';
      bin.pop();
    }
    return this.codes.join('');
  }

  /**解码 */
  decode (base64Str) {
    let i = 0;
    let bin = [];
    let x = 0, code = 0, eq = 0;
    while (i < base64Str.length) {
      let c = base64Str.charAt(i++);  //字符在base里的位置，获取该子字符
      let idx = this.base.indexOf(c);
      if (!~idx) {
        switch (i) {
          case '=':
            idx = 0; eq ++; break;
          case ' ':
          case '\n':
          case '\r':
          case '\t':
            continue;
          default:
            throw {'message': '\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u65E0\u6548\u7F16\u7801\uFF1A' + c}
        }
      }
      if (eq > 0 && idx != 0) {
        throw {'message': '\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u683C\u5F0F\u9519\u8BEF\uFF01'}
      }
      code = code << 6 | idx;
      if (++x !== 4) {
        continue;
      }
      bin.push(code >> 16);
      bin.push(code >> 8 & 0xff);
      bin.push(code & 0xff);
      code = x = 0;
    }
    if (code != 0) {
      throw {'message': '\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u6570\u636E\u957F\u5EA6\u9519\u8BEF'}
    }
    if (eq === 1) { //取消高位补的0
      bin.pop();
    } else if (eq === 2) {
      bin.pop();
      bin.pop();
    } else if (eq > 2) { //若超过两位还没有被组成3个8位二进制数，说明数据长度报错了
      throw {'message': '\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u683C\u5F0F\u9519\u8BEF\uFF01'}
    }
    return bin;
  }
}

/**防抖函数
 * 强制让函数在规定时间内段只执行一次
 * @param {Function} fn
 * @param {Time} delay
 * @param {Boolean} immediate 是否是在时间区间内最开始时候执行
 * 返回一个用于执行的函数
 */
const debounce = (fn, delay, immediate = false) => {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay)
  }
}


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
  return function () {
    let context = this;
    let args = arguments;
    let now = +new Date();
    if (last && now < last + threshold) {
      clearTimeout(timer);
      setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshold)
    } else {
      last = now;
      fn.apply(context, args);
    }
  }
}
