/**
 * snowFlake 算法
 * 生成一个long类型的ID, 核心思想是 : 最高位是符号位，生成的Id是正整数，因此固定为 0 + 41位的时间戳 + 10位的机器ID + 12位的序列号 = 总共是64位的ID
 */
class SnowFlake {
	constructor(wokerId, dataCenterId, sequence) {
		this.workerId = wokerId;
		this.dataCenterId = dataCenterId;
		this.sequence = sequence;
	}
}
