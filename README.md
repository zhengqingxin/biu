
# Biu

> Biu 是一套基于 [ThinkJS](http://www.thinkjs.org) 的弹幕服务。本仓库为服务端代码，客户端查看 [这里](https://github.com/zhengqingxin/biu.js)。

## 如何使用
测试可以直接使用[https://biu.zhengqingxin.com](https://biu.zhengqingxin.com)
### 填写相应配置
项目首页为系统配置以及预览页面。配置如下：
* 项目名称：不可重复，每个项目对应 `socket.io` 中的一个 `namespace`
* 项目负责人
* 允许访问的域名：客户端域名白名单

### 在客户端使用
配置成功后，即可在页面中使用，例如：
``` js
// 引入js，实际项目里需自己管理或者从 cdn 获取
<script src="https://biu.zhengqingxin.com/static/biu.js/dist/biu.min.js"></script>

<script>
  var biu = new Biu({
    name: 'test',          // 申请项目时填写的项目名
    socket: 'https://biu.zhengqingxin.com', // 项目部署地址
    defaultQueue: [
      { text: '我是一个弹幕' },
      { text: '这是申请项目页面' },
    ],
  });
  biu.start();
  setInterval(function(){
    biu.send({text:'这是一条客户端消息'});
  },2000)
</script>

```
ps：关于 biu.js 如何使用，参见 [biu.js](https://github.com/zhengqingxin/biu.js)


## 安装

1. git clone https://github.com/zhengqingxin/biu.git
2. git submodule update --init --recursive
3. cd biu && npm install
4. 导入数据库
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
5. pm2 start pm2.json
