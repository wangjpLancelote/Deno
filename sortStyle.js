const base = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const _ = require('lodash');
let charts = {
	0: '⬆️',
	1: '⬆️⬆️'
};

let test = _.shuffle(base);
console.log('test', test);

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
		console.log('============>>>第一步', res);
		while (left.length && right.length) {
			if (left[0] <= right[0]) {
				res.push(left.shift());
			} else {
				res.push(right.shift());
			}
		}
		console.log('============>>>第二步', res);
		while (left.length) {
			res.push(left.shift());
		}
		console.log('============>>>第三步', res);
		while (right.length) {
			res.push(right.shift());
		}
		console.log('============>>>第四步', res);
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
 * 子节点下标分别是根结点的[2i+1, 2i+2]，根结点从0开始
 */
class HeapSort {
	constructor(target) {
		this.target = target;
	}
}
