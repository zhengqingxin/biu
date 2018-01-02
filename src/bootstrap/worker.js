
// add project
global.registerWs = async (nsp, domain) => {
  const message = {
    open: '/websocket/open',
    message: '/websocket/message',
  }
  const websocket = think.app.websocket;
  const sc = websocket.io.of(nsp);
  websocket.registerSocket(sc, message);

  // register domains
  // let wsDomains = domain.split(',');
  // const domains = await think.model('project').field('domain').select();
  // for (let i = 0; i < domains.length; i++) {
  //   let d = domains[i].domain.split(',');
  //   wsDomains = wsDomains.concat(d);
  // }
  // websocket.io.origins(wsDomains);
}

global.encodeForHTML = (string) => {
  var htmlEscapeMap = {
    '&': '&amp;',  // & in escaped code
    '<': '&lt;',   // DEC=> &#60; HEX=> &#x3c; Entity=> &lt;
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;', // &apos; 不推荐，因为它不在HTML规范中
    '/': '&#x2F;'  // 闭合标签
  };
  var htmlEscapeChars = /[&<>"'\/]/g;
  return ('' + string).replace(htmlEscapeChars, function(match) {
    return htmlEscapeMap[match];
  });
};


think.beforeStartServer(async () => {
  const websocket = think.app.websocket;
  const project = await think.model('project').select();
  // let domains = [];
  // project.forEach(item => {
  //   domains = domains.concat(item.domain.split(','));
  // });
  const messages = project.map(item=>{
    return {
      namespace:item.name,
      open:'/websocket/open',
      message: '/websocket/message',
    }
  })
  // think.config('websocket.socketio.allowOrigin', domains);
  think.config('websocket.socketio.messages', messages);  
})


