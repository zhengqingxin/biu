const moment = require('moment');

module.exports = class extends think.Controller {
  constructor(...arg) {
    super(...arg);
  }

  openAction() {
    // this.emit('connected', 'This client opened successfully!');
    // this.broadcast('joined', 'There is a new client joined successfully!')
    console.log('user coming')
  }

  async messageAction() {
    if (!this.isWebsocket) {
      return this.fail();
    }
    const address = this.websocket.handshake.address;
    if(!address){
      return this.fail();
    }
    // const lastEmitTime = await this.model('message').field('create_time').order({create_time:'desc'}).where({address}).limit(1).select();
    // if(lastEmitTime.length > 0){
    //   const duration = moment().diff(moment(lastEmitTime[0].create_time),'second');
    //   if(duration < 1){
    //     return this.fail();
    //   }
    // }
    const accessLog = await this.cache('access') || {};
    const now = Date.now();
    console.log(now);
    if(accessLog[address] && now - accessLog[address] > 1000){
      accessLog[address] = now;
      await this.cache('access',accessLog);
    }else{
      return this.fail();
    }

    if(this.wsData.text){
      this.wsData.text = global.encodeForHTML(this.wsData.text);
    }else if(typeof this.wsData === 'string'){
      this.wsData = global.encodeForHTML(this.wsData.text);
    }
    
    this.broadcast('push', this.wsData);
    const project = this.websocket.nsp.name.substring(1);
    const ret = await this.model('project').getByName(project);
    if (ret.length > 0) {
      this.model('message').addItem(this.wsData, project, address);
    }
  }

  closeAction() {
    // this.emit('connected', 'This client opened successfully!');
    console.log('a client close')
  }

}