const Base = require('./base.js');

module.exports = class extends Base {
  async getAction(){
    // const project_name = this.get('projectName');
    // const start_time = this.get('startTime');
    // const end_time = this.get('endTime');
    // const query = this.get('query');
    const filter = this.get();
    const data = await this.model('message').get(filter);
    this.success(data);
  }
};
