function quickSort(arrDom) {
	// 传递进来一个Dom类数组，对其进行排序
	var arr = [],
		animationArr = []; // 这个数组中，存储每一次动画的数据

	for (let i = 0, len = arrDom.length; i < len; i++) {
		arr.push(Number(arrDom[i].innerHTML));
	}

	sort(0, arr.length - 1);
	return animationArr;

	function sort(left, right) {
		let i = left, //左游标 右游标
			j = right,
			animationArrStep = [],
			stardard = arr[left];
		animationArrStep.push({
			currentArrStart: left,
			currentArrEnd: right
		});
		animationArrStep.push({
			target: left
		});
		if (right - left > 0) {
			while (i < j) {
				for (; i < j; j--) {
					animationArrStep.push({
						checked: j
					});
					if (arr[j] < stardard) {
						animationArrStep.push({
							target: i,
							selected: j
						});
						animationArrStep.push({
							removeSelected: i
						});
						arr[i++] = arr[j];

						break;
					}
				}
				for (; i < j; i++) {
					animationArrStep.push({
						checked: i
					});
					if (arr[i] > stardard) {
						animationArrStep.push({
							target: j,
							selected: i
						});
						animationArrStep.push({
							removeSelected: j
						});
						arr[j--] = arr[i];
						break;
					}
				}
			}
			arr[i] = stardard;
			animationArr.push(animationArrStep);
			sort(left, i - 1);
			sort(i + 1, right);
		}
	}
}

function quickSortAnimationDom(
	arrDom,
	{
		currentArrStart = undefined,
		currentArrEnd = undefined,
		target = undefined,
		selected = undefined,
		checked = undefined,
		removeSelected = undefined
	}
) {
	// arrDom 是包裹柱状图的盒子
	if (checked !== undefined) {
		arrDom.children[checked].classList.add('item--checked');
	} else if (target !== undefined) {
		arrDom.children[target].classList.add('item--target');
		if (selected !== undefined) {
			arrDom.children[selected].classList.add('item--selected');

			let a = arrDom.children[target].cloneNode(true),
				b = arrDom.children[selected].cloneNode(true);
			arrDom.replaceChild(b, arrDom.children[target]);
			arrDom.replaceChild(a, arrDom.children[selected]);
		}
	} else if (removeSelected !== undefined) {
		arrDom.children[removeSelected].classList.remove('item--selected');
	} else if (currentArrStart !== undefined && currentArrEnd !== undefined) {
		for (let i = currentArrStart; i <= currentArrEnd; i++) {
			arrDom.children[i].classList.add('item--current');
		}
	}
}
