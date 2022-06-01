/** 实现A+标准的Promise
 *  必须要有基本格式
 *  resolve() 和 reject() 两个方法
 *  state 为pending(初始状态) fullfilled(就绪) rejected(失败)，必须为这三种
 *  
 */
function Promise (excutor) {
  this.state = 'pending';
  this.onFullfillexCallback = [];
  this.onRejectedCallback = [];
  const self = this;
 
  function resolve () {

  }

  function reject () {

  }

  try {
    excutor(resolve, reject);
  } catch(reason) {
    reject(reason);
  }
}