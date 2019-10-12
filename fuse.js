const Fuse = require('fuse.js');

/**
 * 轻量级模糊搜索
 */

const all = [{ name: 'wang', key: 1 }, { name: 'wan', key: 2 }, { name: 'wnnn', key: 3 }, { name: 'waaa', key: 3 }, { name: 'wgg', key: 4 }];

const search = target => {
	let options = {
		keys: [
			{
				name: 'name',
				weight: 0.2
			},
			{
				name: 'key',
				weight: 0.8
			}
		]
	};
	let fuse = new Fuse(all, options);

	let r = fuse.search(target);
	console.log('r', r);
};

search('wnnn');
