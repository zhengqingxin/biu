module.exports = class extends think.Controller {
  constructor(...arg) {
    super(...arg);
  }

  openAction() {
    console.log("user coming");
  }

  async messageAction() {
    if (!this.isWebsocket) {
      return this.fail();
    }
    const address = this.websocket.handshake.address;
    if (!address) {
      return this.fail();
    }
    // 限制频率1秒
    const accessLog = (await this.cache("access")) || {};
    const now = Date.now();
    accessLog[address] = accessLog[address] || 0;
    if (now - accessLog[address] > 1000) {
      accessLog[address] = now;
      await this.cache("access", accessLog);
    } else {
      return this.fail();
    }
    // xss
    if (this.wsData.text) {
      this.wsData.text = global.encodeForHTML(this.wsData.text);
    } else if (typeof this.wsData === "string") {
      this.wsData = global.encodeForHTML(this.wsData.text);
    }
    // 广播
    this.broadcast("push", this.wsData);
    // 入库
    const project = this.websocket.nsp.name.substring(1);
    const ret = await this.model("project").getByName(project);
    if (ret.length > 0) {
      this.model("message").addItem(this.wsData, project, address);
    }
  }

  closeAction() {
    // this.emit('connected', 'This client opened successfully!');
    console.log("a client close");
  }
};
