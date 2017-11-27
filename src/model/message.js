module.exports = class extends think.Model {
  async addItem(data = {},project_name) {
    const create_time = think.datetime();
    // TODO: 校验 project
    return this.add({
      data: JSON.stringify(data),
      create_time,
      project_name
    });
  }

  async get(filter){
    return this.where(filter).select();
  }
};
