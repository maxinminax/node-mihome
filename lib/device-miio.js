const EventEmitter = require('events');
const fetch = require('node-fetch');
const miioProtocol = require('./protocol-miio');
const miCloudProtocol = require('./protocol-micloud');
const debug = require('debug')('mihome:miio');

const sleep = time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

module.exports = class MiioDevice extends EventEmitter {

  constructor({
    id, address, token, protocol, refresh, country,
  }) {
    super();
    this.id = String(id);
    this.address = address;
    this.token = token;
    this.protocol = protocol || 'local';
    this.refresh = refresh >= 0 ? refresh : 15000;

    this._properties = {};
    this._propertiesToMonitor = [];
    this._miotSpec = null;
    this._miotSpecType = null;

    miioProtocol.updateDevice(address, {
      id,
      token,
    });
    miCloudProtocol.setDefaultCountry(country);
  }

  get properties() {
    return { ...this._properties };
  }

  async init() {
    if (this._miotSpecType) {
      await this.miotFetchSpec(this._miotSpecType);
    }
    await this.loadProperties();
    await this.poll();
  }

  destroy() {
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
    }
  }

  async send(method, params, options = {}) {
    const result = this.protocol === 'cloud' ? await this.cloudSend(method, params, options) : this.localSend(method, params, options);
    return result;
  }

  async localSend(method, params, options = {}) {
    const result = await miioProtocol.send(this.address, method, params, options);
    return result;
  }

  async cloudSend(method, params, options) {
    const result = await miCloudProtocol.miioCall(this.id, method, params, options);
    return result;
  }

  async poll() {
    if (this.refresh > 0) {
      this._refreshInterval = setInterval(async () => {
        await this.loadProperties();
      }, this.refresh);
    }
  }

  async loadProperties(props) {
    try {
      if (typeof props === 'undefined') {
        props = this._propertiesToMonitor;
      }
      const data = {};
      const propsChunks = [];
      const chunkSize = 16;
      for (let i = 0; i < props.length; i += chunkSize) {
        propsChunks.push(props.slice(i, i + chunkSize));
      }

      for (const propChunk of propsChunks) {
        const resultChunk = await this.getProperties(propChunk);
        if (!resultChunk) {
          throw new Error('Properties is empty');
        }
        if (resultChunk.length !== propChunk.length) {
          debug(`Result ${JSON.stringify(resultChunk)} and props ${JSON.stringify(propChunk)} does not match length`);
        }
        propChunk.forEach((prop, i) => {
          data[prop] = resultChunk[i];
        });
      }
      this._properties = Object.assign(this._properties, data);
      this.emit('available', true);
      this.emit('properties', data);
    } catch (e) {
      this.emit('unavailable', e.message);
    }
  }

  async getProperties(props) {
    const result = this._miotSpec
      ? await this.miotGetProperties(props) : await this.miioGetProperties(props);
    return result;
  }

  async miioGetProperties(props) {
    const result = await this.send('get_prop', props, {
      retries: 1,
    });
    return result;
  }

  async miotGetProperties(props) {
    const did = this.id;
    const params = props.map(prop => {
      const { siid, piid } = this._miotSpec[prop];
      return { did, siid, piid };
    });
    const result = await this.send('get_properties', params, {
      retries: 1,
    });
    return result.map(({ code, value }) => {
      if (code === 0) {
        return value;
      }
      return undefined;
    });
  }

  async miioCall(method, params, options = {}) {
    const result = await this.send(method, params, options);

    if (options.refresh !== false) {
      await sleep(50);
      await this.loadProperties(options.refresh);
    }

    // TODO check OK

    return result;
  }

  async miotSetProperty(prop, value, options = {}) {
    if (!this._miotSpec) {
      throw new Error('This device don\'t config miot spec');
    }
    const def = this._miotSpec[prop];
    if (!def) {
      throw new Error(`Property ${prop} is not define`);
    }
    const { siid, piid } = def;
    const did = this.id;
    const result = await this.send('set_properties', [{
      did, siid, piid, value,
    }]);

    if (!result || !result[0] || result[0].code !== 0) {
      throw new Error('Could not perform operation');
    }

    if (options.refresh !== false) {
      await sleep(50);
      await this.loadProperties(options.refresh);
    }

    return result[0];
  }

  async miotFetchSpec(spec) {
    const url = `https://miot-spec.org/miot-spec-v2/instance?type=${spec}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Get spec error with status ${res.statusText}`);
    }
    const { services } = await res.json();
    const result = {};
    services.forEach(service => {
      const { properties } = service;
      properties.forEach(property => {
        const key = [service.type.split(':')[3], property.type.split(':')[3]].join(':');
        result[key] = {
          siid: service.iid,
          piid: property.iid,
          desc: `${service.description} - ${property.description}`,
        };
      });
    });
    this._miotSpec = result;
    return result;
  }

};
