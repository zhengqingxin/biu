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
    return this.success({id: insertId});
  }

};
