/**
 * 
 * 环形数组
 * 最后一个元素指向第一个数组
 * 指定长度（不可扩展）
 * 初始化元素为 0
 */

 class RoundArray extends Array {
     constructor (index) {
        super();
        this.length = index;
        this.unExtensionAble = true; //不可扩展元素
     }

     /**
      * 初始化为 0
      * 维护一个缓冲的量，当某个元素 === 1时，说明是首尾重合元素
      */
     init () {
         for (let i = 0; i < this.length; ++i) {
             if (this.find(i) === 0) {
                this.find(i) += 1;
                continue;
             } else {
                this.find(i) = 0;
             }
             
         }
     }

     static isRoundArray () {

     }
     /**
      * 通过下标找到元素
      * @param {*} index 
      * 解决首尾相连问题
      */
     find (index) {
        if (index === 0) return this[this.length - 1];
        if (index === this.length) return this[0];
        return this[index];
     }
 }