const view = require('think-view');
const websocket = require('think-websocket');
const model = require('think-model');
const cache = require('think-cache');

module.exports = [
  view, // make application support view
  websocket(think.app),
  model(think.app),  
  cache
];
