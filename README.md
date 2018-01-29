
# Biu
Biu 是一套弹幕服务，专注于 **页面作死** 领域，适用于各种周年庆，节日嗨皮或者各种日常作死等活动。服务分为服务端和[ 客户端 ](https://github.com/zhengqingxin/biu.js)两个项目，本仓库为服务端代码，基于
[ThinkJS](http://www.thinkjs.org)。

## 如何使用
测试可以直接使用[ https://biu.zhengqingxin.com](https://biu.zhengqingxin.com)
### 填写相应配置
项目首页为系统配置以及预览页面。
* 项目名称：不可重复，每个项目对应 `socket.io` 中的一个 `namespace`
* 项目负责人

### 在客户端使用
配置成功后，即可在页面中使用，例如：
``` js
// 引入js，实际项目里需自己管理或者从 cdn 获取
<script src="https://biu.zhengqingxin.com/static/biu.js/dist/biu.min.js"></script>

var anime = new Biu.anime();
var biu = new Biu({
  name: 'biubiu',
  socket: location.protocol + '//' + location.hostname + (location.port ? ':'+location.port : '') ,
  onMessage:(data)=>{
    anime.run(data)
  }
});

```
ps：具体 biu.js 如何使用，参见 [biu.js](https://github.com/zhengqingxin/biu.js)


## 部署

1. git clone https://github.com/zhengqingxin/biu.git
2. cd biu && git submodule update --init --recursive
3. npm install
4. 导入数据库
```
mysql> create database biu;
mysql> use biu;
mysql> source `/home/zhengqingxin/biu/db/biu.sql`;
```
5. 修改 `src/config/adapter.js` 下的数据库配置，例如：
```js
exports.model = {
  type: 'mysql',
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    handle: mysql,
    database: 'biu',
    prefix: '',
    encoding: 'utf8',
    host: '127.0.0.1',
    port: '',
    user: 'root',
    password: 'root',
    dateStrings: true
  }
};
```
5. pm2 start pm2.json
