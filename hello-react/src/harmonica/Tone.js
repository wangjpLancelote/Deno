import { musicalDistance, musical, musicMap } from './index';
/**音 基类 */
class Tone {
    constructor (toneString = '0') {
        this.toneString = toneString;
    }

    getStatus () {
        return this.toneString.includes('0') ? '空' : musical.get(this.toneString);
    }

    getPosition () {
        return this.toneString.includes('0') ? '空' : musicalDistance.get(this.toneString);
    }

    getOriginMusic () {
        return this.toneString.replace(/[^0-9#]/ig, '');
    }
}

export default Tone;