
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
  let wsDomains = domain.split(',');
  const domains = await think.model('project').field('domain').select();
  for (let i = 0; i < domains.length; i++) {
    let d = domains[i].domain.split(',');
    wsDomains = wsDomains.concat(d);
  }
  websocket.io.origins(wsDomains);
}

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