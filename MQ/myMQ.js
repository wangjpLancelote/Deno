const amqplib = require('amqplib');

class MyMQ {
    constructor () {
        this.hosts = [];
        this.index = 0;
        this.length = this.hosts.length;
        this.open = amqplib.connect(this.hosts[this.index]);
    }

    /**
     * 发送队列消息
     * product
     * @template T
     * @returns
     * Promise<T>
     */
    sendQueueMessage (queueName, message, errCallBack) {
        let vm = this;
        vm.open
        .then((conn) => {
            return conn.createChannel();
        })
        .then((channel) => {
            return channel.assertQueue(queueName).then((ok) => {
                return channel.sendToQueue(queueName, new Buffer(msg), {persistent: true});
            })
            .then((data) => {
                if (data) {
                    errCallBack && errCallBack('successful');
                    channel.close();
                }
            })
            .catch(() => {
                setTimeout(() => {
                    if (!channel) return;
                    channel.close();
                }, 500)
            })
        })
        .catch(() => {
            let num = vm.index ++;
            if (num <= vm.length - 1) {
                vm.open = amqplib.connect(vm.hosts[num]);
            } else {
                vm.index = 0;
            }
        })
    }

    /**
     * 
     * @template T
     * consume
     * @returns
     * Promise<T>
     */
    reciveQueueMessage (queueName, reciveCallBack, errCallBack) {
        const vm = this;
        vm.open
            .then((conn) => {
                return conn.createChannel();
            })
            .then((channel) => {
                return channel.assertQueue(queueName)
                    .then((ok) => {
                        return channel.consume(queueName, msg => {
                            if (typeof msg === 'undefined' || typeof msg === null) return new Error('msg is unValiable');
                            let data = msg.content.toString();
                            channel.ack(msg);
                            reciveCallBack && reciveCallBack(data);
                        })
                    })
                    .finally(() => {
                        setTimeout(() => {
                            if (!channel) return new Error('no channel');
                            channel.close(); //信道任何情况都关闭
                        }, 500)
                    })
            })
            .catch(() => {
                let num = vm.index ++;
                if (num <= vm.length - 1) {
                    vm.open = amqplib.connect(vm.hosts[num]);

                } else {
                    vm.index = 0;
                    vm.open = amqplib.connect(vm.hosts[0]);
                }
            })
    }
}