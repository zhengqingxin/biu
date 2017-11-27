module.exports = class extends think.Model {
  getByName(name = '') {
    return this.where({
      name,
    }).select();
  }

  async addItem(data = {}) {
    const create_time = think.datetime();
    return this.where({
      name: data.name,
    }).thenAdd({
      name: data.name,
      create_time,
      email:data.email,
      domain:data.domain
    });
  }
};
