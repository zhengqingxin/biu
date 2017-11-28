
# Biu

> Biu 是一套基于 [ThinkJS](http://www.thinkjs.org) 的弹幕服务。本仓库为服务端代码，客户端查看 [这里](https://github.com/zhengqingxin/biu.js)。

## 如何使用


## 安装

1. git clone https://github.com/zhengqingxin/biu.git
2. cd biu && npm install
3. 导入数据库
```
mysql> create database biu;
mysql> use biu;
mysql> source `/home/zhengqingxin/biu/db/biu.sql`;
```
4.修改 `src/config/adapter.js` 下的数据库配置，例如：
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
3. pm2 start pm2.json
