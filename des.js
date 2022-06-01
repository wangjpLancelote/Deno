
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
 *  两种方式
 *  1.循环，非递归
 *  2.递归
 */
