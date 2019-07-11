/**
 * javaScript 版本的mapReduce
 * mapReduce 是一种算法模型，用于处理超大规模的数据集，策略是通过map函数将输入的数据集处理成有规律的数据集，再通过reduce合并。
 */
class MapReduce {
    constructor () {
        this.data = [
            "We are glad to see you here. This site is dedicated to",
            "poetry and to the people who make poetry possible",
            "poets and their readers. FamousPoetsAndPoems.com is",
            "a free poetry site. On our site you can find a large",
            "collection of poems and quotes from over 631 poets",
            "Read and Enjoy Poetry",
            "I, too, sing America",
            "I am the darker brother",
            "They send me to eat in the kitchen",
            "When company comes",
            "But I laugh",
            "And eat well",
            "And grow strong",
            "Tomorrow",
            "Ill be at the table",
            "When company comes",
            "Say to me",
            "Eat in the kitchen",
            "Then",
            "Besides",
            "Theyll see how beautiful I am",
            "And be ashamed",
            "I, too, am America"
        ]
    }

    map (line) {
        let res = line.split(' ');
        let temp = [];
        for (let i = 0; i < res.length; ++i) {
            temp.push({key: res[i], value: 1});
        }
        return temp;
    }

    reduce (word) {
        let res = {};
        for (let i = 0; i < word.length; ++i) {
            res[word[i].key] = res[word[i].key] ? res[word[i].key] + 1 : 1;
        }
        return res;
    }

    init () {
        let res = [];
        for (let i = 0; i < this.data.length; ++i) {
            res = [...res, ...this.map(this.data[i])];
        }
        let data = this.reduce(res);
        console.log('data', data);
    }
}
let r = new MapReduce();
r.init();