
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

// let rts = getKeyByValue(arithSerialize, '∩');
// console.log('>>>rt', rts);

const promiseAll = (promises) => {
  const index = 0;
  const data = [];
  return new Promise((resolve, reject) => { // promise.all 返回的是一个Promise
    for (let i = 0; i < Array.from(promises).length; ++i) {
      const promise = Promise.resolve(promises[i]); // 这里要将每个元素用Promise.resolve 包裹，防止元素中不是Promise类型。Array.from() 也是为了兜底，防止类型报错
      promise.then(res => {
        if (++index === promises.length) { // 所有的元素都处理完之后就返回结果
          resolve(data);
        } else {
          data[i] = res;
        }
      }).catch(err => {
        reject(err);
      })
    }
  })
}

/** 去重flat */
const flat_unique = (source, res = []) => {
  return Array.from(source).reduce((prev, current, index) => {
    return Array.isArray(current) ? flat_unique(current, prev) : prev.includes(current) ? prev : [...prev, current];
  }, res)
}

// const rt = flat_unique([1, 2, 2, [3, 4, 5, 6, 3]]);
// console.log('rt', rt);

/** 
 * 求最大得分
 * 条件一：每时刻会有一张得分牌，获得得分牌就能活到对应的分数
 * 条件二：每时刻随机出现狂暴状态的怪兽，狂暴状态无法得分，
 * 条件三：随机出现一张睡眠卡，卡上的数组表示可以让怪兽[连续]睡眠多久，从而可以得分
 * 结果：算出每一轮最大的得分
 */
const score = (scoreborad, anger, sleepTime) => {
  const filterAngerData = scoreborad.filter((v, idx) => { return anger[idx] });
  const sliceData = filterAngerData.reduce((prev, current, index) => { return prev += current }, 0);
  if (sleepTime >= filterAngerData.length) return sliceData // 睡眠时间超过狂暴时间，直接对所有的元素求和，就是最大值
  const sliceFilterData = scoreborad.map((item, idx) => { return {
    idx: idx,
    data: item
  } }).filter(v => anger[v.idx]);
  console.log('sliceFilterData', sliceFilterData);
  let tempData = 0
  for (let i = 0; i < sliceFilterData.length; ++i) {
    tempData = sliceFilterData[i].data;
    if (sliceFilterData.find(v => v.idx === (sliceFilterData[i].idx + sleepTime - 1))) {
      tempData += sliceFilterData.find(v => v.idx === sliceFilterData[i].idx + sleepTime - 1).data;
    } else {
      continue;
    }
  }
  return [...scoreborad.filter((v, idx) => { return !anger[idx] })].reduce((prev, current, index) => { return prev += current }, 0) + tempData;
}
// const rt = score([1, 0, 1, 2, 6, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 2);
// console.log('>>rt', rt);

/** 算出两个数组中绝对值最小的两个数，并返回这两个数的集合（不一定只有一对数）和这个最小值，注意，不一定是两个数组中分别取最小的数，而是绝对值最小的数
 *  [20, 31, 2, 0, 18]
 *  [3, 21, 17]
 */
const abs = (arr1, arr2) => {
  const res = {};
  for (let i = 0; i < arr1.length; ++i) {
    for (let j = 0; j < arr2.length; ++j) {
      const t = arr1[i] > arr2[j] ? arr1[i] - arr2[j] : arr2[j] - arr1[i];
      if (Reflect.ownKeys(res).find(v => Number(v) < t)) continue;
      if (res[t]) {
       res[t] = [...res[t], [arr1[i], arr2[j]]]; 
      } else {
        res[t] = [[arr1[i], arr2[j]]];
      }
    }
  }
  const keys = Object.keys(res).map(Number).sort((a, b) => a - b);
  return {
    absData: keys[0],
    absPair: res[keys[0]],
  };
}

// const rt = abs([20, 31, 2, 0, 18], [3, 21, 17]);
// console.log('>rt', rt);

class LazyManClass {
  constructor (name) {
    this.name = name;
    this.deps = [];
    this.deps.push(() => {console.log('Hi! This is!' + name); this.next();});
    Promise.resolve().then(() => this.next());
    return this;
  }

  __sleep (s) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null)
      }, s * 1000)
    })
  }

  next() {
    const fn = this.deps.shift();
    fn && fn();
  }

  sleep (s) {
    this.deps.push(() => {
      this.__sleep(s).then(() => {
        console.log('Wake up after ' + s);
        this.next();
      })
    })
    return this;
  }

  eat (food) {
    this.deps.push(() => {console.log('Eat ' + food); this.next();})
    return this;
  }

  sleepFirst (s) {
    this.deps.unshift(() => {
      this.__sleep(s).then(() => {
        console.log('Wake up after ' + s);
        this.next();
      })
    })
    return this;
  }
}
function LazyMan (name) {
  return new LazyManClass(name);
}

// LazyMan('Hank').sleepFirst(5).eat('supper');

/** 反转链表
 *  两种方式, 返回一个链表
 *  如 [1, 2, 3, 4, 5] => [5, 4, 3, 2, 1]
 *  1.循环，非递归
 *  2.递归
 *  @param { ListNode } head
 *  @returns { ListNode }
 *  循环解法
 */

const reverseLinkLoop = (head) => {
  let pre = null; // 上一个节点
  let curr = head; // 当前节点
  while (curr !== null) {
    let nxt = curr.next; // 当前节点的下一个节点
    curr.next = pre; // 这一步做替换，当前节点的下一个节点替换成上一个节点
    pre = curr; // 上一个节点就变成了当前节点
    curr = nxt; // 当前节点就变成了下一个节点
  }
  return pre;
}

const reverseListCallee = (head) => {
  if (head === null || head.next === null) {
    return head; // 临界情况，只有一个节点反转就是当前节点
  }
  let curr = reverseListCallee(head.next);
  head.next.next = head;
  head.next = null;
  return curr;
}

/** 二叉树最底层最左边的值
 *  例如：[2, 1, 3] => 1
 *  [1, 2, 3, 4, null, 5, 6, null, null, 7] => 7
 *  二叉树的取值规律：每一层数量：2^(n - 1); 第一层顶点 = 1, 第二层 = 2, 第三层 = 4, 第四层 = 8, 即第一层下标(0), 第二层下标(1, 2)
 *  第三层下标(3, 6), 第四层下标(7, 14)
 * 
 *  1. 深度优先
 *  2. 广度优先
 */

const findLeftBottomDFS = (data) => {
  let maxDeepth = 0; // 最大层数 | 深度
  let deep = 0; // 当前深度
  let res = null;
  const DFS = (root) => {
    if (root === null) return null; // 不存在根节点
    deep ++;
    if (deep > maxDeepth) {
      maxDeepth = deep;
      res = root;
    }
    DFS(root.left);
    DFS(root.right);
    deep --; // 这里为什么要将深度减1，因为deep是一个循环外变量, 如果左子树遍历完之后就不必再去比较右子树，直接进入下一层即可，属于优化时间复杂度的操作
  }
  DFS(data);
  return res; // 这个res 是一个节点，取值 = res.left
}

/** 广度优先遍历 */
const findLeftBottomBFS = (data) => {
  let queue = []; // 使用队列，将同一层级的节点放到一起进行比较
  if (data) queue.push(data);
  let val = null;
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; ++i) {
      const curr = queue.shift();
      if (i === 0) val = curr.val; // i == 0 表示是最左边的节点，
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
  }
}

/** 贪心算法
 *  最大值交换
 *  交换数字中的任意两位数字, 获得最大值
 *  2736 => 7236
 */

const greedy = (data) => {
  const arr = data.toString().split(',').map(Number);
  let last = -1, lastMax = -1, index = arr[0];
  for (let i = arr.length - 1; i >= 0; i --) {
    
  }
}

