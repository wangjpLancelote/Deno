export const musicMap = { //音符类型
    a: {
        title: '全音符',
        step: 4
    },
    b: {
        title: '二分音符',
        step: 2
    },
    c: {
        title: '四分音符',
        step: 1
    },
    d: {
        title: '八分音符',
        step: 0.5
    },
    e: {
        title: '十六分音符',
        step: 0.25
    }
}

 export const musicalDistance = new Map(); //音符的位置
 musicalDistance.set('1#', { x: 305 });
 musicalDistance.set('1', { x: 185 });
 musicalDistance.set('2', { x: 205 });
 musicalDistance.set('3', { x: 225 });
 musicalDistance.set('4', { x: 245 });
 musicalDistance.set('#1', { x: 65 });

 export const musical = new Map(); //音符的吹吸
 musical.set('#1', { action: 'blow' });
 musical.set('1', { action: 'blow' });
 musical.set('2', { action: 'absorb' });
 musical.set('3', { action: 'blow' });
 musical.set('4', { action: 'absorb' });
 musical.set('1#', { action: 'blow' });


 /**拍子对应的强弱节奏 */
 export const tipMap = new Map();
 tipMap.set(2, ['strong', 'weak']);
 tipMap.set(3, ['strong', 'weak', 'weak']);
 tipMap.set(4, ['strong', 'weak', 'middle', 'weak']);
 tipMap.set(6, ['strong', 'weak', 'weak', 'middle', 'weak', 'weak']);

 /**根据音时及谱子的类型生成强弱信号 */
 export function getStrongOrWright () {
    const { pai } = this;
    let flag = 0;
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