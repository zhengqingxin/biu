module.exports = class extends think.Controller {
  constructor(...arg) {
    super(...arg);
  }

  openAction() {
    // this.emit('connected', 'This client opened successfully!');
    // this.broadcast('joined', 'There is a new client joined successfully!')
    console.log('user coming')
  }

  async messageAction() {
    if (!this.isWebsocket) {
      return this.fail();
    }
    const address = this.websocket.handshake.address;
    this.broadcast('push', this.wsData);
    const project = this.websocket.nsp.name.substring(1);
    const ret = await this.model('project').getByName(project);
    if (ret.length > 0) {
      this.model('message').addItem(this.wsData, project, address);
    }
  }

  closeAction() {
    // this.emit('connected', 'This client opened successfully!');
    console.log('a client close')
  }

}