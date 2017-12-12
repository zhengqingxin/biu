module.exports = class extends think.Logic {
  postAction() {
    let rules = {
      name: {
        string: true,       // 字段类型为 String 类型
        required: true,     // 字段必填
        trim: true,         // 字段需要trim处理
      },
      // domain:{
      //   string:true,
      //   required:true,
      //   trim:true
      // }
    }
    let flag = this.validate(rules);
    if(!flag){
      return this.fail('validate error', this.validateErrors);
    }
  }
 }