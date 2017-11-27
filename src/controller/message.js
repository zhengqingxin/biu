const Base = require('./base.js');

module.exports = class extends Base {
  async getAction(){
    const project_name = this.get('projectName');
    const data = await this.model('message').get({project_name});
    this.success(data);
  }
};
