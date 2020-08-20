const EventEmitter = require('events');
const aqaraProtocol = require('./protocol-aqara');
const utils = require('./utils');

module.exports = class MiioDevice extends EventEmitter {

  constructor({
    id, model, parent, refresh,
  }) {
    super();

    const sid = utils.stripLumiFromId(id);

    this.id = id;
    this.model = model;
    this.sid = sid;
    this.parent = parent;
    this.refresh = refresh >= 0 || 30000;

    this._properties = {};
    this._onData = this._onData.bind(this);

    aqaraProtocol.updateSubDevice(sid, {
      parent,
    });
    aqaraProtocol.on(sid, this._onData.bind(this));
  }

  get properties() {
    return { ...this._properties };
  }

  async init() {
    if (aqaraProtocol.hasSubDevice(this.sid)) {
      const { data } = aqaraProtocol.getSubDevice(this.sid);
      if (data) {
        this._onData(data);
        return data;
      }
    }
    this.emit('unavailable', 'Not found');
    return undefined;
  }

  destroy() {
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
    }
    aqaraProtocol.off(this.sid, this._onData);
  }

  _onData(data) {
    this._properties = Object.assign(this._properties, data);
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
      this.emit('unavailable', e.message);
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
