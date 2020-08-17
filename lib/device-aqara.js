const EventEmitter = require('events');
const aqaraProtocol = require('./protocol-aqara');

module.exports = class MiioDevice extends EventEmitter {

  constructor({
    sid, smodel, parent, refresh,
  }) {
    super();
    this.sid = sid;
    this.smodel = smodel;
    this.parent = parent;
    this.refresh = refresh >= 0 || 30000;

    this._onData = this._onData.bind(this);

    aqaraProtocol.setSubDevice(sid, {
      smodel,
      parent,
    });
    aqaraProtocol.on(sid, this._onData.bind(this));
  }

  async init() {
    await this.loadProperties();
    // await this.poll();
  }

  destroy() {
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
    }
    aqaraProtocol.off(this.sid, this._onData);
  }

  _onData(data) {
    this.emit('available', true);
    this.emit('properties', data);
  }

  async poll() {
    if (this.refresh > 0) {
      this._refreshInterval = setInterval(async () => {
        await this.loadProperties();
      }, this.refresh);
    }
  }

  async loadProperties() {
    try {
      const data = await this.read();
      this._onData(data);
      return data;
    } catch (e) {
      return null;
    }
  }

  read() {
    return aqaraProtocol.read(this.sid);
  }

  write(data) {
    return aqaraProtocol.write(this.sid, data);
  }

};
