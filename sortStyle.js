const base = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const _ = require("lodash");
let charts = {
  0: "⬆️",
  1: "⬆️⬆️"
};

let test = _.shuffle(base);
console.log("test", test);

/**冒泡排序
 * 比较相邻的两个元素，若前一个元素比后一个元素大，则交换位置，每一轮结束后，最后一个元素都是当前轮最大的一个，因此每轮都可以跳过最后一个元素，
 * 最坏时间复杂度: O(n^2)
 * 最好时间复杂度: O(n)
 */
const bubbleSort = target => {
  let cnt = 0;
  for (let i = 0; i < target.length; ++i) {
    for (let j = 0; j < target.length - i; ++j) {
      // console.log(`================>>>第${i + 1}轮`);
      // console.log(`================>>第${j + 1}次比较, ${target[j]}, ${target[j + 1]}`);
      cnt += 1;
      if (j === target.length - 1) continue;
      if (target[j] > target[j + 1]) {
        [target[j], target[j + 1]] = [target[j + 1], target[j]];
      }
    }
  }
  // console.log('实际执行次数:', cnt);
  return target;
};

/**记录外层循环位置,可跳过无谓循环 */
const exchangeBubbleSort = target => {
  let l = target.length;
  let cnt = 0;
  while (l > 0) {
    let position = 0;
    for (let n = 0; n < l; ++n) {
      cnt += 1;
      if (n === target.length - 1) continue;
      if (target[n] > target[n + 1]) {
        [target[n], target[n + 1]] = [target[n + 1], target[n]];
        position = n;
      }
    }
    l = position;
  }
  // console.log('实际执行次数:', cnt);
  return target;
};

/**双边冒泡
 * 效率比普通高。比位置记录低
 */
const doubleSideBubbleSort = target => {
  let top = target.length - 1,
    bottom = 0,
    cnt = 0,
    j;
  while (bottom < top) {
    for (j = bottom; j < top; ++j) {
      cnt += 1;
      if (target[j] > target[j + 1]) {
        [target[j], target[j + 1]] = [target[j + 1], target[j]];
      }
    }
    top--;
    //倒序
    for (; j > bottom; --j) {
      cnt += 1;
      /**前一个比后一个大 */
      if (target[j] < target[j - 1]) {
        [target[j], target[j - 1]] = [target[j - 1], target[j]];
      }
    }
    bottom++;
  }
  // console.log('实际执行次数:', cnt);
  return target;
};

// let r1 = bubbleSort(test);
// let r2 = exchangeBubbleSort(test);
// let r3 = doubleSideBubbleSort(test);
// console.log('r1: %j, r2: %j, r3: %j', r1, r2, r3);

/**
 * 快速排序 --->>分治法的典型应用
 * 普通写法需要开辟新的内存空间,分区排序则不需要
 * 本质上都是递归实现
 * 定义左指针和右指针，左指针寻找比基准大的元素（放基准右边）右指针寻找比基准小的元素（放基准左边）
 * 移动左右指针，若左右指针相遇，将第一个元素和该指针元素交换，若左指针小于右指针，交换两个元素,第一轮找到之后，结束，递归进入下一轮
 * 最坏时间复杂度 O(n^2)
 * 最好时间复杂度 O(nlogn)
 */
const quickSort = target => {
  function swap(arr, a, b) {
    [arr[a], arr[b]] = [arr[b], arr[a]];
  }

  function partition(arr, left, right) {
    /**选择最右边的元素作为基准 */
    let pivot = arr[right];

    let storeIndex = left;
    for (let i = left; i < right; ++i) {
      if (arr[i] < pivot) {
        //小于基准的数,放到左边,并对之前已经放到左边排序的数交换,storeIndex加1，进入下一次循环,这里会跳过比基准更大的数
        swap(arr, storeIndex, i);
        storeIndex++;
      }
    }
    swap(arr, right, storeIndex);
    return storeIndex;
  }

  function sort(arr, left, right) {
    if (left > right) return;
    let storeIndex = partition(arr, left, right);
    sort(arr, left, storeIndex - 1);
    sort(arr, storeIndex + 1, right);
  }

  sort(target, 0, target.length - 1);
  return target;
};

// let r = quickSort(test);
// console.log('r', r);

/**选择排序
 * 确定第一个基准下标，从0开始，遍历数组，找到该轮最小的元素，将基准下标元素改成该最小元素，每次遍历时都会从基准下标 + 1开始
 * 时间复杂度恒定 O(n^2)
 * 稳定性很强
 */
const selectSort = target => {
  let len = target.length,
    miniIndex;
  for (let i = 0; i < len - 1; ++i) {
    miniIndex = i;
    for (let j = i + 1; j < len; ++j) {
      if (target[j] < target[miniIndex]) {
        miniIndex = j;
      }
    }
    [target[i], target[miniIndex]] = [target[miniIndex], target[i]];
  }
  return target;
};
// let r = selectSort(test);
// console.log('r', r);

/**插入排序
 * 从第二个元素开始遍历
 * 第一个元素默认是长度为1的有序数列
 * 从第二个元素开始与有序队列的元素比较，若较小，则在有序队列中开辟新的地址存放该元素，否则，将该元素放在有序队列的末尾
 * 最差时间复杂度 O(n^2)
 * 最好时间复杂度 O(n) 在队列是有序的情况下，只需遍历一次就可以完成排序
 * 稳定
 * 数列越接近排序状态效率越高
 */
const insertionSort = target => {
  let len = target.length;
  let current, preIndex;
  for (let i = 1; i < len; ++i) {
    current = target[i];
    preIndex = i - 1;
    while (preIndex > -1 && target[preIndex] > current) {
      /**将基准下标移向下一个 因为新增加了一个元素且该元素比基准小*/
      target[preIndex + 1] = target[preIndex];
      /**倒序，往前一位比较 */
      preIndex = preIndex - 1;
    }
    /**将current 补回到i下标 */
    target[preIndex + 1] = current;
  }
  return target;
};

/**插入排序核心部分
 * 倒序比较
 * 反向遍历，找到更大的数，同时新申请一个内存，如果前一个进行比较的数更大就交换位置，同时进行比较的数往前移一位
 */
const insertSortMicro = (preIndex, current, target) => {
  while (preIndex > -1 && target[preIndex] > current) {
    /**将基准下标移向下一个 因为新增加了一个元素且该元素比基准小*/
    target[preIndex + 1] = target[preIndex];
    /**倒序，往前一位比较 */
    preIndex = preIndex - 1;
  }
  /**将current 补回到i下标 */
  target[preIndex + 1] = current;
};

// let r = insertionSort(test);
// console.log('r', r);

/**希尔排序
 * 等间隔分组形式的插入排序
 * 适用于长度较大的数列，分组本质上是提高排序效率
 * 间隔一般取每次数列的一般长度，间隔循环减半，最后间隔只剩1的时候，做最后一次插入排序,结束
 */
const shellSort = target => {
  for (let gap = Math.floor(target.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < target.length; ++i) {
      let current = target[i];
      let preIndex = i - 1;

      /**插入排序 内循环 */
      // while (preIndex > -1 && target[preIndex] > current) {
      // 	target[preIndex + 1] = target[preIndex];
      // 	preIndex = preIndex - 1;
      // }
      // /**补回到i下标 */
      // target[preIndex + 1] = current;
      insertSortMicro(preIndex, current, target);
    }
  }
  return target;
};

// let r = shellSort(test);
// console.log('shellSort', r);

const getMaxList = target => {
  let tmp;
  for (let i of target) {
    if (tmp === undefined) {
      tmp = i;
    } else {
      tmp < i ? (tmp = i) : tmp;
    }
  }
  return tmp;
};
/**原因：当待排序中的值有较大差距时，会造成内存空间的浪费
 * 桶排序
 * 分成N + 1个桶
 */
const bucketSort = target => {
  let max = getMaxList(target);
  /**申请最大元素 + 1长度的数组 初始化为 0*/
  let bucket = new Int8Array(max + 1);
  for (let i = 0; i < target.length; ++i) {
    bucket[target[i]] += 1;
  }

  /**
   * 对桶排序元素，
   * 每个大于0的元素的下标就是target数列里面的值，
   * 且都是按顺序排列，
   * 所以从0开始，每次自增1，对应的target下标
   * 时间复杂度 : O(x * N) x 是数列最大的数
   * 稳定
   */
  for (let i = 0, j = 0; i < bucket.length; ++i) {
    if (bucket[i]) {
      /**i是target的值 */
      target[j++] = i;
    }
  }
  return target;
};
// test.push(15);
// let r = bucketSort(test);
// console.log('r', r);

/**基数排序
 * 为了进一步减少内存开销，将桶的大小固定为10
 * 将基数相同的数放在一个桶里
 * 第一步：通过对数取模求出数的低位模(0-9)，根据低位将数放在对应的桶里
 * 第二步：取高位模，将第一步的数排序，就完成了排序
 */
const radixSort = target => {
  let counter = [];
  for (let i = 0; i < 10; ++i) {
    counter[i] = [];
  }
  for (let i = 0; i < target.length; ++i) {
    let tmp = target[i] % 10;
    counter[tmp].push(target[i]);
  }
};
// test.push(14);
// radixSort(test);

/**
 * 归并排序
 * 先拆解后合并
 * 分治和递归的思想，
 * 将整个数列一次分成两段数列，直至分成两段有序数列，
 * 再将数列组合起来
 * 需要一个辅助数组
 * 先分(分成一段一段的小数组) 再治(合并成大数组)
 */

class MergeSort {
  constructor(target) {
    this.tmp = [];
    this.target = target;
  }

  /**自上而下的递归 */
  mergeSort(arr = this.target) {
    let len = arr.length;
    if (len < 2) return arr;
    let mid = Math.floor(len / 2),
      left = arr.slice(0, mid),
      right = arr.slice(mid);
    return (this.target = this.tmp = this.merge(this.mergeSort(left), this.mergeSort(right)));
  }

  /**合并 */
  merge(left, right) {
    let res = [];
    console.log("============>>>第一步", res);
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        res.push(left.shift());
      } else {
        res.push(right.shift());
      }
    }
    console.log("============>>>第二步", res);
    while (left.length) {
      res.push(left.shift());
    }
    console.log("============>>>第三步", res);
    while (right.length) {
      res.push(right.shift());
    }
    console.log("============>>>第四步", res);
    return res;
  }
}

// let r = new MergeSort(test);
// r.mergeSort();
// console.log('r', r);

/**堆排序
 * 大顶堆 - 每个节点的值都大于或等于其节点的值，在堆排序算法中用于生序排列
 * 小顶堆 - 每个节点的值都小于或等于其节点的值。 在堆排序算法中用于降序排列
 * 堆是一个完全二叉树，除了最后一层，其他层的结点数达到最大，最后一层的所有结点都集中在左边，左边结点排列满的情况，右边才能缺失结点
 * 堆的存储是靠数组来实现
 * 子节点下标分别是根结点的[2i+1, 2i+2]，根结点下标从0开始
 *
 * 复杂度分析
 * 每一层只遍历一个节点，具有n个节点的完全二叉树的深度为[log2n+1]，shiftDown的复杂度是O(logn) 而外层循环共有n次，最终复杂度是O(nlogn)
 * 堆主要用来实现优先队列，用堆可以使入队和出队的复杂度都很低
 */
class HeapSort {
  constructor(target) {
    this.target = target;
  }

  swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    // console.log('arr', arr);
    return arr;
  }

  /**这里的i是非叶子节点的下标 */
  shiftDown(arr, i, length) {
    let tmp = arr[i];

    /**对结点i一下的节点全部做顺序调整
     * i是第一个非叶子节点，j是i的两个子节点
     */
    for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
      /** */
      tmp = arr[i];
      if (j + 1 < length && arr[j] < arr[j + 1]) {
        //这里是找到两个同级孩子节点2 * j + 1 和2 * j + 2,比较出较大的一个,再与父节点比较
        j++;
      }
      if (tmp < arr[j]) {
        /**父节点小于最大的子节点，交换数组中位置
         * 交换完位置之后，将i换成j，进入下次循环
         * 因为是倒序，因此是从下往上构建大顶堆，所以可以保证最终的各个堆都是大顶堆，整个堆就是大顶堆
         */
        this.swap(arr, i, j);
        i = j;
      } else {
        break;
      }
    }
  }

  heapSort() {
    /**初始化大顶堆，从后往前。找到第一个非叶子节点，比较
     * 第一次构建大顶堆
     * 将最大的数，也就是根节点与数组最后一个数交换，完成第一个数的排序，此时，除根节点及其两个子节点之外，都是已经排好序的堆，因此，只需要找到第一个非叶子节点(2 * i + 1)，重复排序->数组交换的顺序 | 进行排序即可
     */
    for (let i = Math.floor(this.target.length / 2 - 1); i >= 0; i--) {
      this.shiftDown(this.target, i, this.target.length);
    }
    /**倒序遍历 */
    for (let i = Math.floor(this.target.length - 1); i > 0; i--) {
      /**根节点与最后节点交换
       * 交换之后继续构建大顶堆
       */
      this.swap(this.target, 0, i);
      /**
       * 每次从0开始，每次最后一位i排序好之后，就将i自减1
       */
      this.shiftDown(this.target, 0, i);
    }
  }
}

// let r = new HeapSort(test);
// r.heapSort();
// console.log('r', r);

/**
 * Binary Search Tree
 * BST [二叉搜索树]
 * 二叉树演变了许多其他的数据结构
 * 二叉树的遍历有两种: 深度优先遍历和广度优先遍历
 * 深度遍历有前序遍历，中序遍历，后序遍历，广度遍历有层次遍历
 * 树本身就是递归定义，因此采用递归的方法去实现树的三种遍历容易理解且代码简洁，广度遍历则需要其他的数据结构支撑，例如堆
 *
 * 二叉搜索树是一种完全二叉树，只允许左侧的节点小于父节点，右侧节点大于或等于父节点
 *
 * 节点属性: 节点的深度取决于其祖先的数量 （节点深度 = 节点数量 /2 -1）
 * 树的高度：为节点深度的最大值
 */
class BST {
  constructor() {
    /**模板节点 [父节点，左节点，右节点] */
    this.Node = {
      key: null,
      left: null,
      right: null
    };

    this.root = null; //根节点
  }

  insert(key) {
    this.Node.key = key;
    let node = this.deepClone(this.Node);
    // node.key = key;
    if (this.root === null) {
      /**设为根节点 */
      this.root = {
        key: key,
        left: null,
        right: null
      };
      return this;
    } else {
      /**插入新节点 */
      this.insertNode(this.root, node);
      return this;
    }
  }
  deepClone(target) {
    let res = {};
    if (_.isPlainObject(target)) {
      for (let i in target) {
        if (Array.isArray(target[i])) {
          res[i] = target[i].slice();
        } else {
          res[i] = target[i];
        }
      }
    }
    return res;
  }
  insertNode(root, newNode) {
    if (newNode.key < root.key) {
      //新插入的节点比根节点小,所以只能放在父节点的左边
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        /**当前位置有节点，递归处理 */
        this.insertNode(root.right, newNode);
      }
    }
    return this;
  }

  get getRoot() {
    return this.root;
  }

  search(key) {
    return this.searchNode(this.root, key);
  }

  /**查找节点 */
  searchNode(node, key) {
    if (node === null) return false;
    if (key < node.key) {
      /**比根节点的key小，从左边搜索 */
      return this.searchNode(node.left, key);
    } else if (key > node.key) {
      return this.searchNode(node.right, key);
    } else {
      /**found */
      return true;
    }
  }

  /**key 最小节点 */
  minNode(node) {
    if (this.root === null) return null;
    while (node && node.left !== null) {
      node = node.left;
    }
    return node.key;
  }

  /**key最大节点 */
  maxNode(node) {
    if (!this.root) return null;
    while (node && node.right !== null) {
      node = node.right;
    }
    return node.key;
  }

  findMinNode(node) {
    while (node && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  /**移除节点 */
  removeNode(node, element) {
    if (node === null) return null;

    if (element < node.key) {
      node.left = this.removeNode(node.left, element);
      return node;
    } else if (element > node.key) {
      node.right = this.removeNode(node.right, element);
      return node;
    } else {
      /**命中 该节点分3种情况，无叶子节点，单叶子节点， 满叶子节点*/
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null && node.right) {
        node = node.right;
        return node;
      } else if (node.left && node.right === null) {
        node = node.left;
        return node;
      }

      /**移除拥有完整叶子的节点 */
      let aux = this.findMinNode(node.right); // 找到右边子树的最小节点
      node.key = aux.key; //改变节点的键
      node.right = this.removeNode(node.right, aux.key);
      return node; //返回更新后的节点的引用
    }
  }
}
//二叉搜索树
// let r = new BST();
// r.insert(1);
// r.insert(2);
// r.insert(3);
// console.log('r', r);
// // console.log('right', r.root.right);
// let min = r.minNode(r.root);
// let max = r.maxNode(r.root);
// console.log('min', min, max);
/**
 * 二叉树的遍历
 * 前序遍历: 根节点->左子树->右子树
 * 中序遍历: 左子树->根节点->右子树
 * 后序遍历: 左子树->右子树->根节点
 * 层次遍历: 遍历每一次层
 */
