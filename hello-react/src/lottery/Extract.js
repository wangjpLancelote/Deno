import React from 'react';

const DATA = 'data';

class Extract {
    /**初始化配置 */
    data = [];
    isStart = true;
    isError = false;
    isSpeedUp = false;
    endId = undefined;
    idx = -1;
    speed = 500;
    maxSpeed = 100;
    minSpeed = 1000;
    duration = 4000;
    maxIdx = this.data.length - 1;

    subscribers = []; //订阅数组

    init (config) { //初始化
        this.setStates(config);
    }

    asyncApi (config) {
        this.setStates(config);
        setTimeout(() => {
            this.setStates({isStart: false});
        }, this.duration);
    }

    start (fn) {
        setTimeout(() => {
            fn(args => this.asyncApi(args));
        }, this.duration);
        this.setStates({isStart: true, isSpeedUp: true});
        this.loop();
    }

    end (fn) {
        if (this.isError) return;
        this._subscribe(vals => vals.isEnd && fn(vals.isEnd));
    }

    /**初始化数据 */
    setStates (config) {
        Object.keys(config).forEach(key => {
            this[key] = config[key];
            if (key === DATA) this.maxIdx = config[key].length - 1;
        })
    }

    /**贝塞尔公式计算缓动速度 t: 缓动系数 返回坐标点 */
    PointOnCubicBezier (cp, t) {
        var tPos = {};
        tPos.x = Math.pow((1 - t), 2) * cp[0].x + 2 * t * (1 - t) * cp[1].x + Math.pow(t, 2) * cp[2].x;
        tPos.y = Math.pow((1 - t), 2) * cp[0].y + 2 * t * (1 - t) * cp[1].y + Math.pow(t, 2) * cp[2].y;
        return tPos;
    }

    loop () {
        const { endId } = this;
        setTimeout(() => {
            const overing = !!(!this.isStart && (endId || endId === 0));
            this._publish({
                idx: this.idx,
                isEnd: false
            })
            if (this.idx < this.maxIdx) {
                this.idx++;
            } else {
                this.idx = 0;
            }
            if (!(overing && this.idx === endId) && !this.isError) {
                if (this.isSpeedUp) { //加速
                    const point = this.PointOnCubicBezier([{x: 500, y: 500}, { x: 50, y: 50 }, { x: 100, y: 100 }], this.maxSpeed / this.speed);
                    this.speed = point.x;
                    if (this.speed < this.maxSpeed) this.speed = this.maxSpeed;
                }
                if (!this.isSpeedUp) { //减速
                    const point = this.PointOnCubicBezier([{x: 100, y: 100}, { x: 700, y: 700 }, { x: 1000, y: 1000 }], this.speed / this.maxSpeed);
                    this.speed = point.x;
                    if (this.speed > this.minSpeed) this.speed = this.minSpeed;
                }
                this.loop();
            } else {
                if (this.isError) return;
                this.idx --;
                this._publish({
                    idx: this.idx,
                    isEnd: true
                })
            }
        }, this.speed);
    }

    /**发布 */
    _publish (args) {
        this.subscribers.forEach(fn => fn(args));
    }
    /**订阅 */
    _subscribe = (reback) => {
        this.subscribers.push(reback);
    }

    /**高阶组件 */
    hoc = () => WrapperComponent => {
        const _this = this;
        return class extends React.Component {
            state = {
                idx: undefined
            }

            componentDidMount() {
                _this._subscribe(args => this.setState({idx: args.idx}));
            }

            render () {
                return <WrapperComponent { ...this.props } extract={{idx: this.state.idx}} />
            }
        }
    }
}

export default new Extract();