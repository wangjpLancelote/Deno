/**
 * Promise 实现
 * promise 的状态只能改变一次，一旦resolve或reject，则会一直保留这种状态
 */

 class PromiseRefact {
     constructor (executor) {
        this.self = this;
        this.status = "pending"; //初始化，默认状态是pending
        this.data = null; //存储结果的data

        this.executor = executor; //执行器

        this.callbacks = []; //存储回调函数，用于链式调用
     }

     /** 调用then方法返回的promise的结果状态，
      * 分为 3种
      * 返回非promise的任意值，新的promise变为resolved，value为返回的值
      * 返回新的promise ，则新的promise为promise的结果
      * 抛出异常，新promise变为rejected, error为抛出的异常。
      */
     then (onResolved, onRejected) {
         onResolved = typeof onResolved === 'function' ? onResolved : value => value; //值穿透，若传入的是一个常量，则第一个调用then()方法时传入的值会覆盖后续调用then方法时传入的值。then()只接收第一个非方法参数。
         onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
         /** then 返回promise 的实例 */
         return new PromiseRefact((resolve, reject) => {
            if (this.status === 'pending') {
                /**状态为pendding时，保存回调函数 */
                this.callbacks.push({
                    onResolved () {this.handle(onResolved)},
                    onRejected () {this.handle(onRejected)}
                })
            } else if (this.status === 'resolved') { //resolved,
               //异步执行，使用setTimeout
               setTimeout(() => {
                   this.handle(onResolved)
               })
            } else { //rejeced
               setTimeout(() => {
                   this.handle(onRejected)
               })
            }
         })
     }

     catch (onRejected) {
         /**catch 只是then的其中一种情况，resolve 参数为undefined的情况 */
        return this.then(undefined, onRejected);
     }

     /**判断状态并决定返回Promsie和value */
     handle (callback) {
        try {
            const result = callback(this.data); // onResolved执行的就是 then((value) => return value )方法中 的回调 (value) => return value
            /**then 返回的是Promise实例或value */
            if (result instanceof PromiseRefact) {
                /** 若返回的是promise return 的promise结果就是这个promise的结果 */
                result.then(value => {resolve(value)}, reason => {reject(reason)})
            } else {
                /** 否则直接返回resolve 执行的对象，即传入的值 */
                resolve(value);
            }
       } catch (e) {
           //若抛错 则返回promise的状态为rejected
            reject(e)
       }
     }

     /**执行callbacks里的函数，保存data的值，如有待执行的callbacks的函数，执行回调函数的onResolved
      * resolve 可以传三种值，非promise(常量) 成功状态的promise，失败状态的promise
      * 用于返回一个成功的promise的对象
      */
     resolve (value) {
         if (this.status !== 'pending') return; //状态只能改变一次。
         this.status = 'resolved';
         this.data = value;
         if (this.callbacks.length) {
             this.callbacks.forEach(callback => {
                 callback.onResolved(value);
             })
         }
        return new PromiseRefact((resolve, reject) => {
            if (value instanceof PromiseRefact) {
                value.then(
                    value => {resolve(value)},
                    reason => {reject(reason)}
                )
            } else {
                resolve(value);
            }
        });
     }

     /** 用于返回一个失败的promise 对象 */
     reject (value) {
         if (this.status !== 'pending') {
             return;
         }
         this.status = 'rejected';
         this.data = value;

         if (this.callbacks.length) {
             this.callbacks.forEach(callback => {
                 callback.onRejected(value);
             })
         }
        return new PromiseRefact((resolve, reject) => {
            /**返回一个reject方法就好了 */
            reject(value);
        });
     }

     /**promise.all 返回一个promise, 且所有的promise的状态都要成功 才返回resolved状态的promise */
     all (promises = []) {
         const values = new Array(promises.length);
         let resolvedCount = 0; //状态为resolved的promise的数量
        return new PromiseRefact((resolve, reject) => {
            /**控制所有的 p 都是promise */
            promises.forEach((p, index) => {
                PromiseRefact.resolve(p).then(
                    value => {
                        values[index] = value;
                        resolvedCount ++;
                        if (resolvedCount === promises.length) { //所有都为resolved状态，才返回resolve
                            resolve(values);
                        }
                    },
                    reason => { //有一个失败，返回的promise状态为rejected
                        reject(reason)
                    }
                )
            })
        });
     }

     /**返回一个promise对象，状态由第一个promise决定
      * 有一个成功，就返回resolved结果
      */
     race (promises = []) {
        return new PromiseRefact((resolve, reject) => {
            promises.forEach((p, index) => {
                PromiseRefact.resolve(p).then(
                    value => {
                        /**一个成功，就返回resolved */
                        resolve(value)
                    },
                    reason => {
                        reject(reason);
                    }
                )
            })
        });
     }
 }