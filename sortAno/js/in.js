window.boxArr = [];

function render(data, direction, way) {
	oBox = document.querySelector('#box');
	len = oBox.length;
	if (direction === 'right') {
		if (way === 'in') {
			oItem = document.createElement('div');
			oItem.className = 'item';
			oItem.style.height = data[data.length - 1] + 'px';
			oItem.innerHTML = data[data.length - 1];
			oBox.appendChild(oItem);
		} else {
			oBox.removeChild(oBox.lastElementChild);
		}
	} else {
		if (way === 'in') {
			oItem = document.createElement('div');
			oItem.className = 'item';
			oItem.style.height = data[0] + 'px';
			oItem.innerHTML = data[0];
			oBox.insertBefore(oItem, oBox.firstChild);
		} else {
			oBox.removeChild(oBox.firstElementChild);
		}
	}
}

function getData() {
	var input = document.querySelector('#input');
	var data = input.value;
	input.value = '';
	if (Number(data) > 100 || Number(data) < 10) {
		return '输入错误'; // 检查输入，是否合法
	}
	return data;
}

function handle(event) {
	var data = getData();
	if (data === '输入错误') {
		alert('请输入10——100之间的数');
		return; //根据返回的信息，确定输入是否合法，并进行处理
	}

	var direction = event.target.dataset.direction;
	var way = event.target.dataset.way;
	if (way === 'in') {
		// 在这判断数组中存储个数，超过60就限制输入，并且提示
		if (boxArr.length >= 60) {
			alert('已经60个了，不能再加了');
			return;
		}

		if (direction === 'left') {
			boxArr.unshift(data);
		} else if (direction === 'right') {
			boxArr.push(data);
		} else {
			console.log('direction接口参数错误');
			return;
		}
	} else if (way === 'out') {
		if (boxArr.length === 0) {
			console.log('已经为空，无法移出');
			return;
		} else if (direction === 'left') {
			boxArr.shift();
		} else if (direction === 'right') {
			boxArr.pop();
		} else {
			console.log('direction接口参数错误');
			return;
		}
	} else {
		console.log('way接口错误');
		return;
	}

	render(boxArr, direction, way);
}

function init() {
	document.querySelector('#buttons').addEventListener('click', handle);
}

init();
