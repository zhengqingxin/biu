module.exports = class extends think.Controller {
    constructor(...arg) {
      super(...arg);
    }
  
    openAction() {
      // this.emit('connected', 'This client opened successfully!');
      // this.broadcast('joined', 'There is a new client joined successfully!')
    }
  
    messageAction() {
      if(!this.isWebsocket){
        return this.fail();
      }
      this.broadcast('push', this.wsData);
      const project = this.websocket.nsp.name.substring(1);
      this.model('message').addItem(this.wsData,project);
    }

    closeAction(){
      // this.emit('connected', 'This client opened successfully!');
      console.log('a client close')
    }

  }