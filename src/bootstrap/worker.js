
// get ws domain white list
// global.getWhiteDomains = async () => {
//   think.wsDomains = [];
//   const domains = await think.model('project').field('domain').select();
//   for (let i = 0; i < domains.length; i++) {
//     let d = domains[i].domain.split(',');
//     think.wsDomains = think.wsDomains.concat(d);
//   }
//   think.logger.info('ws domain list:', think.wsDomains.join())
// }


think.beforeStartServer(async () => {
  let wsDomains = [];
  const domains = await think.model('project').field('domain').select();
  for (let i = 0; i < domains.length; i++) {
    let d = domains[i].domain.split(',');
    wsDomains = wsDomains.concat(d);
  }
  think.config('websocket.socketio.allowOrigin', wsDomains);  
  // think.app.websocket.origins(wsDomains);
  
})