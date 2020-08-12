

/**字典 */
class Dictionary {
    constructor () {
        this.item = {};
    }

    has (key) {
        return key in this.item;
    }

    set (key, value) {
        this.item[key] = value;
    }

    remove (key) {
        if (this.has(key)) {
            delete this.item[key];
            return true;
        } else {
            return false;
        }
    }

    get (key) {
        return this.has(key) ? this.item[key] : undefined
    }

    values () {
        let res = [];
        for (let k in this.item) {
            if (this.has(k)) {
                res.push(this.item[k]);
            }
        }
        return res;
    }

    keys () {
        let res = [];
        for (let k in this.item) {
            if (this.has(k)) {
                res.push(k);
            }
        }
        return res;
    }

    getAll () {
        return this.item;
    }
}

class Queue {
    constructor () {
        this.queue = [];
    }

    enqueue (ele) {
        this.queue.push(ele);
    }

    /**弹出第一个队列对象 */
    dequeue () {
        return this.queue.shift();
    }

    front () {
        return this.queue[0];
    }

    isEmpty () {
        return !this.queue.length;
    }

    size () {
        return this.isEmpty.length;
    }

    toString () {
        let resultStr = '';
        for (let i = 0; i < this.queue.length; ++i) {
            resultStr += this.queue[i];
        }
        return resultStr;
    }
}

/**
 * 图的遍历
 * 广度优先搜索
 * 深度优先搜索
 * 都需要明确指定第一个被访问的顶点
 * 
 * 记录状态：
 *  白色： 表示顶点没有被访问过
 *  灰色： 表示顶点被访问过，但未被探索过
 *  黑色： 表示该顶点被访问过且完全探索过
 */

class Graph {
    constructor () {
        this.vertices = [];

        this.edges = new Dictionary();
    }

    /**添加顶点 */
    addVertex (v) {
        this.vertices.push(v);
        this.edges.set(v, []);
    }

    /**添加边 */
    addEdge (v1, v2) {
        this.edges.get(v1).push(v2);
        this.edges.get(v2).push(v1);
    }

    /**initV 初始化顶点 */
    bfs (initV, handler) {
        let color = this.initiallizeColor();
        let queue = new Queue();
        queue.enqueue(initV);

        while (!queue.isEmpty()) {
            /**从队列取出一个顶点 */
            let v = queue.dequeue();

            let vList = this.edges.get(v);

            /**设为灰色 */
            color[v] = 'gray';
            /**遍历所有顶点，并且加入到队列中 */
            for (let i = 0; i < vList.length; ++i) {
                let e = vList[i];
                if (color[e] == 'white') {
                    color[e] = 'gray';
                    queue.enqueue(e);
                }
            }

            /**已被探测，并且返回 */
            handler(v);

            color[v] = 'black';
        }
    }

    dfs (initV, handler) {
        /**初始化颜色 */
        let color = this.initiallizeColor();
        /**从某个顶点开始依次递归访问 */
        this.dfsVisit(initV, color, handler);
    }

    dfsVisit (v, color, handler) {
        color[v] = 'gray';
        handler(v);

        let vList = this.edges.get(v);
        for (let i = 0; i < vList.length; ++i) {
            let e = vList[i];
            if (color[e] == 'white') {
                this.dfsVisit(e, color, handler);
            }
        }
        /**设为黑色 */
        color[v] = 'black';
    }

    initiallizeColor () {
        let colors = [];
        for (let i = 0; i < this.vertices.length; ++i) {
            colors[this.vertices[i]] = 'white';
        }
        return colors;
    }

    toString () {
        let resultStr = '';
        for (let i = 0; i < this.vertices.length; ++i) {
            resultStr += this.vertices[i] + '->'
            let vEdges = this.edges.get(this.vertices[i]);
            for (let j = 0;j < vEdges.length; ++j) {
                resultStr += vEdges[j] + ' ';
            }
            resultStr += '\n';
        }
        return resultStr;
    }
}

var g = new Graph();
let myV = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for (let i = 0; i < myV.length; ++i) {
    g.addVertex(myV[i]);
}

g.addEdge('A', 'B'); //添加A -> B的边
g.addEdge('A', 'C');
g.addEdge('A', 'D');
g.addEdge('C', 'D');
g.addEdge('C', 'G');
g.addEdge('D', 'G');
g.addEdge('D', 'H');
g.addEdge('B', 'E');
g.addEdge('B', 'F');
g.addEdge('E', 'I');

console.log(g.edges.item);

var result = '';
g.bfs(g.vertices[0], function (v) {
    result += v + ' ';
})

console.log(result);


var result = '';
g.dfs(g.vertices[0], function (v) {
    result += v + ' ';
})

console.log(result);