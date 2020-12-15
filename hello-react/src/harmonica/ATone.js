let flag = 0;
import Tone from './Tone';
import {tipMap, musicMap } from './index';

class ATong extends Tone {
    constructor (toneString, idx, pai, count, map) {
        super()
        this.toneString = toneString;
        this.musicMap = map;
        this.pai = pai; //拍子
        this.count = count;
        this.idx = idx;
    }

    getStrongOrWeight () {
        const { pai } = this;
        if (flag < 1) {
            flag = flag + this.getDuringTime();
            return tipMap.get(pai)[0];
        }
        if (2 > flag && flag <= 1) {
            flag = flag + this.getDuringTime();
            return tipMap.get(pai)[1];
        }
        if (flag === 2) {
            flag = this.getDuringTime();
        }
        return tipMap.get(pai)[0];
    }

    /**获取该音时长短 */
    getDuringTime () {
        const { toneString } = this;
         let arr = toneString.split('');
         let dot = 0;
         let doubleDot = 0;
         const totalTime = arr.reduce((pre, cur, index, arr) => {
            if (!isNaN(+cur)) {
                return pre + 1 /4;
            }
            if (musicMap[cur]) {
                return pre + musicMap[cur].step / 4;
            }
            if (cur === '.' && index === 1) {
                dot = pre / 2;
                return pre + dot;
            }
            if (cur === '.' && index === 2) {
                doubleDot = dot / 2;
                return pre + doubleDot;
            }
            return pre;
         }, 0);
         return totalTime;
    }
}