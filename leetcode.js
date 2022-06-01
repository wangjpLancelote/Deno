/** 有序数组去重 [1, 1, 2, 2, 2, 4, 5, 7, 8, 9, 9] */
const uniqueWithSequence = (source = []) => {
  let i = 0;
  while (i < source.length) {
    let j = i + 1;
    while (source[j] === source[i]) {
      source[j] = 0;
      ++j
    }
    if (i !== j) i = j;
  }
  return source.filter(v => v);
}
// console.log('>>>>>>>>>unique', uniqueWithSequence([1, 1, 2, 2, 2, 4, 5, 7, 8, 9, 9]));

function transform (data, fields) {
  
  let res = [];
  for (let i = 0; i < fields.length; ++i) {
    const rt = (function (field) {
      const parseData = JSON.parse(JSON.stringify(data))
      parseData.forEach(item => {
        item.name = field;
      })
      return parseData;
    })(fields[i])
    res = [...res, ...rt];
  }
}

transform([{ a: 1, b: 2 }, {a: 1, b: 2}, { a: 1, b: 2 }], ['c', 'd']);


const datas = [{ time: 1, b: 2, c: 3 }, {time: 2, b: 2, c: 3}, { time: 3, b: 2, c: 3 }, { time: 4, b: 2, c: 3 }, {time: 5, b: 2, c: 3}, { time: 6, b: 2, c: 3 }, { time: 1, b: 6, c: 7 }];

function thisMap (v, now) {
  const item = {...now};
  item.name = v;
  item.value = item[v];
  v = item;
  return v; 
}

const sortRt = datas.sort((a, b) => {
  if (a.time > b.time) return 1;
  if (a.time === b.time) return 0;
  return -1
})

function transsort () {

}

function  transformT (data, fields) {
  let res = [];
  for (let i = 0; i < data.length; ++i) {
    const fieldsIndexData = fields.map((item) => thisMap(item, data[i]));
    res = [...res, ...fieldsIndexData];
  }
  return res;
}

let rt = transformT(datas, ['b', 'c']);
console.log('>>>rt', sortRt);