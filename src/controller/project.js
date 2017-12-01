const Base = require('./base.js');

module.exports = class extends Base {
  async getAction(){
    const name = this.get('name');
    const data = await this.model('project').getByName(name);
    this.success(data);
  }

  async postAction(){
    const data = this.post();
    const insertId = await this.model('project').addItem(data);
    if (insertId.type === 'exist') {
      return this.fail('duplicated project name');
    }
    global.registerWs(data.name,data.domain);
    return this.success({id: insertId});
  }

  testAction(){
    const namespace = 'biubiu';
    const message = {
      open: '/websocket/open',
      message: '/websocket/message',
    }
    const websocket = think.app.websocket;
    const sc = websocket.io.of(namespace);
    websocket.registerSocket(sc,message);
  }
};
