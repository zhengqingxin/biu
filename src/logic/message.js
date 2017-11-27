module.exports = class extends think.Logic {
  getAction() {
    let rules = {
      projectName: {
        string: true,  
        required: true,
        trim: true,
      }
    }
    let flag = this.validate(rules);
    if(!flag){
      return this.fail('validate error', this.validateErrors);
    }
  }
 }