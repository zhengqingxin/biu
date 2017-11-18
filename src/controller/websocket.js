module.exports = class extends think.Controller {
    constructor(...arg) {
      super(...arg);
    }
  
    openAction() {
      this.emit('connected', 'This client opened successfully!');
      // this.broadcast('joined', 'There is a new client joined successfully!')
    }
  
    messageAction() {
      if(!this.isWebsocket){
        return this.fail();
      }
      this.broadcast('push', this.wsData)
      
      // console.log('获取客户端 addUser 事件发送的数据', this.wsData);
      // console.log('获取当前 WebSocket 对象', this.websocket);
      // console.log('判断当前请求是否是 WebSocket 请求', this.isWebsocket);
    }
    closeAction(){
      // this.emit('connected', 'This client opened successfully!');
      console.log('a client close')
    }
  }