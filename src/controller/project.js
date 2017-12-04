const Base = require('./base.js');
const generateString = require('crypto-random-string');

module.exports = class extends Base {
  async getAction(){
    const name = this.get('name');
    const data = await this.model('project').getByName(name);
    this.success(data);
  }

  async postAction(){
    let data = this.post();
    data.token = generateString(32);
    const insertId = await this.model('project').addItem(data);
    if (insertId.type === 'exist') {
      return this.fail('duplicated project name');
    }
    global.registerWs(data.name,data.domain);
    return this.success({token:data.token});
  }

};
