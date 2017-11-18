const view = require('think-view');
const websocket = require('think-websocket');

module.exports = [
  view, // make application support view
  websocket(think.app)
];
