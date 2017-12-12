module.exports = class extends think.Model {
  async addItem(data = {}, project_name, address) {
    const create_time = think.datetime();
    return this.add({
      data: JSON.stringify(data),
      create_time,
      project_name,
      address
    });
  }

  async get({ projectName, startTime = '', endTime = '', query, page, pageSize = 10 }) {
    let where = {
      project_name:projectName
    };
    if (startTime) {
      where.create_time = where.create_time ? where.create_time : {};
      where.create_time['>='] = startTime;
    }
    if (endTime) {
      where.create_time = where.create_time ? where.create_time : {};
      where.create_time['<='] = endTime;
    }
    if (query) {
      where.data = where.data ? where.data : {};
      where.data = ['like', `%${query}%`];
    }
    if(!page){
      return this.where(where).order('create_time DESC').select();
    }
    return this.where(where).order('create_time DESC').page(page, pageSize).countSelect();
  }
};
