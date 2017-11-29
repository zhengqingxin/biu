const nunjucks = require('think-view-nunjucks');
const { Console, File, DateFile } = require('think-logger3');
const socketio = require('think-websocket-socket.io');
const mysql = require('think-model-mysql');
const isDev = think.env === 'development';
const path = require('path');
/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks
  }
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? 'console' : 'dateFile',
  console: {
    handle: Console
  },
  file: {
    handle: File,
    backups: 10, // max chunk number
    absolute: true,
    maxLogSize: 50 * 1024, // 50M
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  },
  dateFile: {
    handle: DateFile,
    level: 'ALL',
    absolute: true,
    pattern: '-yyyy-MM-dd',
    alwaysIncludePattern: true,
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  }
};

exports.websocket = {
  type: 'socketio',
  common: {
    // common config
  },
  socketio: {
    handle: socketio,
    // allowOrigin: '127.0.0.1:8360',  // 默认所有的域名都允许访问
    // path: '/socket.io',             // 默认 '/socket.io'
    // adapter: null,                  // 默认无 adapter
    // allowOrigin: [],
    messages: [
      {
        namespace: 'index',
        open: '/websocket/open',
        message: '/websocket/message',
      },
      {
        namespace: 'test',
        open: '/websocket/open',
        message: '/websocket/message',
      },
    ]
  }
}

/**
 * model adapter config
 * @type {Object}
 */
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