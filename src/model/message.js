module.exports = class extends think.Model {
  async addItem(data = {},project_name,address) {
    const create_time = think.datetime();
    return this.add({
      data: JSON.stringify(data),
      create_time,
      project_name,
      address
    });
  }

  async get(filter){
    return this.where(filter).select();
  }
};
