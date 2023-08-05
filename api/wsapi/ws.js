
class Ws {
    constructor(ws, data, ...args) { 
        this._ws = ws;
        this._data = data;
        this._msgs = []
        this.socket = this.doLink();
        this.doOpen();
        this._events = {};
        this._isLink = true;
        this.subs = []
        setInterval(() => {
            if (this._isLink) {
                if (this.socket.readyState == 2 || this.socket.readyState == 3) {
                    this.resetLink()
                }
            }
        }, 3000)
    }
    // 重连
    resetLink() {
        this.doOpen();
    }
    // 连接
    doLink(call) {
        let ws = uni.connectSocket({
            url: this._ws,
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            success: () => {
                call && call()
            }
        })
        return ws;
    }
    doOpen() {
		console.log(this.socket);
        this.socket.onOpen((ev) => {
            this.onOpen(ev)
        })
        this.socket.onMessage((ev) => {
            this.onMessage(ev)
        })
        this.socket.onClose((ev) => {
            this.onClose(ev)
        })
        this.socket.onError((ev) => {
            this.onError(ev)
        })

    }
    // 打开
    onOpen() {
        // 打开时重发未发出的消息
        let list = Object.assign([], this._msgs)
        list.forEach((item) => {
            if (this.send(item)) {
                let idx = this._msgs.indexOf(item)
                if (idx != -1) {
                    this._msgs.splice(idx, 1)
                }
            }
        })
    }
    // 手动关闭
    doClose() {
        this._isLink = false
        this._events = {}
        this._msgs = []
        this.socket.close({
            success: () => {
                console.log('socket close success')
            }
        })
    }
    // 添加监听
    on(name, handler) {
        this.subscribe(name, handler);
    }
    // 取消监听
    off(name, handler) {
        this.unsubscribe(name, handler);
    }
    // 关闭事件
    onClose() {
        // 是否重新连接
        if (this._isLink) {
            setTimeout(() => {
                this.resetLink()
            }, 3000)
        }
    }
    // 错误
    onError(evt) {
        this.Notify({
            Event: 'error',
            Data: evt
        });

    }
    // 接受数据
    onMessage(evt) {
        try {
            const data = evt
            this.Notify({
                Event: 'message',
                Data: data
            });

        } catch (err) {
            console.error(' >> Data parsing error:', err);
            this.Notify({
                Event: 'error',
                Data: err
            });
        }
    }
    // 订阅事件的方法
    subscribe(name, handler) {
        if (this._events.hasOwnProperty(name)) {
            this._events[name].push(handler);
        } else {
            this._events[name] = [handler];
        }
    }
    // 取消订阅事件
    unsubscribe(name, handler) {
        let start = this._events[name].findIndex(item => item === handler);
        this._events[name].splice(start, 1);
    }
    // 发布后通知订阅者
    Notify(entry) {
        // 检查是否有订阅者 返回队列
        const cbQueue = this._events[entry.Event];
        if (cbQueue && cbQueue.length) {
            for (let callback of cbQueue) {
                if (callback instanceof Function) callback(entry.Data);
            }
        }
    }
    // 发送消息
    send(data) {
        this.changeSubs(data)
        if (this.socket.readyState == 1) {
            this.socket.send({ data: JSON.stringify(data) })
            return true
        } else {
            // 保存到待发送信息
            if (!this._msgs.includes(data)) {
                this._msgs.push(data)
            };
            return false
        }

    }
    // 修改订阅列表
    changeSubs(data) {
        if (data.cmd == 'sub') {
            if (!this.subs.includes(data.msg)) {
                this.subs.push(data.msg)
            }
        } else if (data.cmd == 'unsub') {
            let idx = this.subs.indexOf(data.msg)
            if (idx != -1) {
                this.subs.splice(idx, 1)
            }
        }
    }
    // 重新订阅
    resetSub() {
        let list = Object.assign([], this.subs)
        list.forEach((item) => {
            this.send({
                cmd: 'sub',
                msg: item
            })
        })
    }
}
export default Ws