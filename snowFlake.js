/**
 * snowFlake 算法
 * 生成一个long类型的ID, 核心思想是 : 最高位是符号位，生成的Id是正整数，因此固定为 0 + 41位的时间戳 + 10位的机器ID + 12位的序列号 = 总共是64位的ID
 * long 类型精度超过了js Number的最大安全值域
 * js 实现使用了 bigInt
 */

const moment = require('moment');
class SnowFlake {
	constructor(wokerId, dataCenterId, sequence) {
		this.twepoch = 1288834974657n; //默认生成的时间戳 Date.now()

		this.workerIdBits = 5n; //节点ID长度

		this.dataCenterIdBits = 5n; //数据中心ID长度

		this.maxWorkerId = -1n ^ (-1n << this.workerIdBits); //31  最大支持机器节点数0-31 一共32个 默认最大
		this.maxDataCenterId = -1n ^ (-1n << this.dataCenterIdBits); //31  最大支持数据中心节点数0-31 一共32个  默认最大
		this.sequenceBits = 12n; //序列号12位

		this.workerIdShift = this.sequenceBits; //12  机器节点左移12位
		this.dataCenterIdShift = this.sequenceBits + this.workerIdBits; //17 数据中心节点左移17位
		this.timestampLeftShift = this.sequenceBits + this.workerIdBits + this.dataCenterIdBits; //22  时间毫秒数左移22位
		this.sequenceMask = -1n ^ (-1n << this.sequenceBits); //4095
		this.lastTimestamp = -1n;

		this.workerId = 1n;
		this.dataCenterId = 1n;
		this.sequence = 0n;

		if (this.workerId > this.maxWorkerId || this.workerId < 0) {
			throw new Error(`wokerId must max than 0 and small than maxWorkerID ${this.maxWorkerId}`);
		}
		if (this.dataCenterId > this.dataCenterId || this.dataCenterId < 0) {
			throw new Error(`dataCenterId must max than 0 and small than maxDataCenterId ${this.dataCenterId}`);
		}

		/**机器ID */
		this.workerId = wokerId;
		this.dataCenterId = dataCenterId;
		this.sequence = sequence;
	}

	/**自旋刷新时间戳 */
	keepAlive() {
		let timestamp = this.timeGen();
		if (timestamp <= this.lastTimestamp) {
			timestamp = this.timeGen();
		}
		return BigInt(timestamp);
	}

	/**生成当前时间戳 */
	timeGen() {
		return BigInt(Date.now());
	}

	nextId(tradeNo = false) {
		/**获取当前毫秒数 */
		let tm = this.timeGen();
		/**如果服务器时间不对，报错(无法使用正确时间戳生成唯一ID) */
		if (tm < this.lastTimestamp) {
			throw new Error(`Refusing to generate id for ${this.lastTimestamp - tm}`);
		}
		/**上次生成的时间和当前时间相同 */
		if (this.lastTimestamp === tm) {
			/**序列号自增 因为只有12位，所以和sequenceMask 相与 去掉高位 */
			this.sequence = (this.sequence + 1n) & this.sequenceMask;

			/**判断是否溢出，每毫秒内超过4095，为4096时 与sequenceMask 相与时 === 0 */
			if (this.sequence === 0n) {
				/**自旋等待下一毫秒 */
				tm = this.keepAlive();
			}
		} else {
			/**如果和上次的生成时间不同，重置sequence 下一毫秒开始，sequence 计数从0开始累加 */
			this.sequence = 0n;
		}
		this.lastTimestamp = tm;
		/**按照规则拼出ID
		 * 0 + 41位时间戳 + 5位数据中心ID + 5位机器ID + 12位序列号
		 * 符号位是默认加上的
		 */
		// if (tradeNo) {
		// 	// let trade = moment(((tm - this.twepoch) << this.timestampLeftShift).toString()).format();
		// 	let t = (tm - this.twepoch) << this.timestampLeftShift;
		// 	console.log('trade', moment.unix(tm.toString()).format('YYYY-MM-DD HH:mm:ss'));
		// }
		return ((tm - this.twepoch) << this.timestampLeftShift) | (this.dataCenterId << this.dataCenterIdShift) | (this.workerId << this.workerIdShift) | this.sequence;
	}
}

let r = new SnowFlake(1n, 1n, 0n);
console.log('snowFlakeId', r.nextId());
