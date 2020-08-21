const EventEmitter = require('events');
const crypto = require('crypto');
const dgram = require('dgram');
const os = require('os');
const debug = require('debug')('mihome:aqara');

const MULTICAST_ADDRESS = '224.0.0.50';
const MULTICAST_PORT = 4321;
const SERVER_PORT = 9898;

// eslint-disable-next-line max-len
const AQARA_IV = Buffer.from([0x17, 0x99, 0x6d, 0x09, 0x3d, 0x28, 0xdd, 0xb3, 0xba, 0x69, 0x5a, 0x2e, 0x6f, 0x58, 0x56, 0x2e]);

class AqaraProtocol extends EventEmitter {

  constructor() {
    super();

    this._gateways = new Map();
    this._gatewaysByAddress = new Map();
    this._subDevices = new Map();

    this.timeout = 2000;
  }

  init() {
    this.createSocket();
    this.whois();
  }

  destroy() {
    this.destroySocket();
  }

  createSocket() {
    this._socket = dgram.createSocket({
      type: 'udp4',
      reuseAddr: true,
    });

    this._socket.on('listening', () => {
      // Add membership to the multicast addresss for all network interfaces
      const networkInterfaces = os.networkInterfaces();
      Object.keys(networkInterfaces).forEach(key => {
        const networkInterface = networkInterfaces[key];
        networkInterface.forEach(connection => {
          if (connection.family === 'IPv4') {
            this._socket.addMembership(MULTICAST_ADDRESS, connection.address);
          }
        });
      });
    });
    this._socket.on('message', this._onMessage.bind(this));
    this._socket.bind({
      port: SERVER_PORT,
      exclusive: true,
    });
  }

  destroySocket() {
    this._socket.close();
  }

  getGatewayIdByAddress(address) {
    let sid = null;
    this._gateways.forEach((gateway, key) => {
      if (address === gateway.address) {
        sid = key;
      }
    });
    return sid;
  }

  getGatewayAddress(address) {
    return this.hasGatewayAddress(address) ? this._gatewaysByAddress.get(address) : {};
  }

  hasGatewayAddress(address) {
    return this._gatewaysByAddress.has(address);
  }

  setGatewayAddress(address, data) {
    this._gatewaysByAddress.set(address, data);
    const sid = this.getGatewayIdByAddress(address);
    if (sid) {
      this.updateGateway(sid, data);
    }
  }

  updateGatewayAddress(address, data) {
    const gatewayByAddress = Object.assign(this.getGatewayAddress(address), data);
    this.setGatewayAddress(address, gatewayByAddress);
  }

  getGateways() {
    return Array.from(this._gateways.keys()).map(sid => {
      return {
        sid,
        ...this.getGateway(sid),
      };
    });
  }

  hasGateway(sid) {
    return this._gateways.has(sid);
  }

  getGateway(sid) {
    return this.hasGateway(sid) ? this._gateways.get(sid) : {};
  }

  setGateway(sid, data) {
    const { password, token } = data;
    this._gateways.set(sid, {
      ...data,
      key: this.generateKey(password, token),
    });
  }

  generateKey(password, token) {
    let key = null;
    if (password && token) {
      const cipher = crypto.createCipheriv('aes-128-cbc', password, AQARA_IV);
      key = cipher.update(token, 'ascii', 'hex');
      cipher.final('hex'); // useless
    }
    return key;
  }

  updateGateway(sid, data) {
    const gateway = Object.assign(this.getGateway(sid), data);
    this.setGateway(sid, gateway);
  }

  getSubDevices() {
    return Array.from(this._subDevices.keys()).map(sid => {
      return {
        sid,
        ...this.getSubDevice(sid),
      };
    });
  }

  hasSubDevice(sid) {
    return this._subDevices.has(sid);
  }

  getSubDevice(sid) {
    if (!this._subDevices.has(sid)) {
      this._subDevices.set(sid, {});
    }
    const subDevice = this._subDevices.get(sid);
    if (!subDevice._promises) {
      subDevice._promises = new Map();
    }
    return subDevice;
  }

  setSubDevice(sid, data) {
    this._subDevices.set(sid, data);
  }

  updateSubDevice(sid, data) {
    const subDevice = Object.assign(this.getSubDevice(sid), data);
    this.setSubDevice(sid, subDevice);
  }

  async whois() {
    try {
      return await this._multicast({
        cmd: 'whois',
      });
    } catch (err) {
      debug('Send whois command error', err);
      return undefined;
    }
  }

  async send(msg) {
    const { sid, cmd, data = {} } = msg;
    if (!sid) {
      throw new Error(`Message ${msg} is missing sid`);
    }
    const subDevice = this.getSubDevice(sid);
    if (!subDevice.parent) {
      throw new Error(`Sub device ${sid} is missing gateway sid`);
    }
    const gateway = this.getGateway(subDevice.parent);
    const { address, port, key } = gateway;
    if (!address || !port) {
      throw new Error(`Gateway ${subDevice.parent} of subDevice ${sid} is missing address or port`);
    }
    if (cmd === 'write') {
      if (!key) {
        throw new Error(`Gateway ${subDevice.parent} is missing key when send write command`);
      }
      // msg.data = JSON.stringify({ ...data, key });
      msg.data = { ...data, key };
    }

    return new Promise((resolve, reject) => {
      if (!subDevice._promises.has(cmd)) {
        subDevice._promises.set(cmd, new Map());
      }
      const promises = subDevice._promises.get(cmd);
      const requestId = Date.now();
      const promise = {
        resolve: res => {
          promises.delete(requestId);
          resolve(res);
        },
        reject: err => {
          promises.delete(requestId);
          reject(err);
        },
      };

      this._send(msg, port, address)
        .then(() => {
          promises.set(requestId, promise);
          setTimeout(() => {
            const err = new Error('Call to device timed out');
            err.code = 'timeout';
            promise.reject(err);
          }, this.timeout);
        })
        .catch(reject);
    });
  }

  async read(sid) {
    const result = await this.send({
      cmd: 'read',
      sid,
    });
    return result;
  }

  async write(sid, data) {
    const result = this.send({
      cmd: 'write',
      sid,
      data,
    });
    return result;
  }

  _onMessage(buf) {
    let msg = {};
    try {
      debug(`<-- ${buf.toString('utf-8')}`);
      msg = JSON.parse(buf.toString());
      msg.data = msg.data ? JSON.parse(msg.data) : null;
    } catch (e) {
      debug('Parse message error', e);
      return;
    }

    const {
      cmd, sid, model, token, data,
    } = msg;

    if (sid && token) {
      this.updateGateway(sid, {
        token,
      });
    }

    switch (cmd) {
      case 'get_id_list_ack': {
        const listIds = [sid, ...data];

        listIds.forEach(_sid => {
          this.updateSubDevice(_sid, {
            parent: sid,
          });
          this.read(_sid)
            .then(_data => this.emit(_sid, _data))
            .catch(err => debug('Read sub device error', _sid, err));
        });

        this._onResponse('get_id_list', msg);
        break;
      }
      case 'iam': {
        const {
          ip, port,
        } = msg;
        this.updateGateway(sid, {
          ...this.getGatewayAddress(ip),
          address: ip,
          port,
        });
        this.updateSubDevice(sid, {
          parent: sid,
          smodel: model,
        });
        this.send({
          cmd: 'get_id_list',
          sid,
        }).catch(err => debug('Get id list error', sid, err));
        break;
      }
      case 'heartbeat': {
        if (model === 'gateway') {
          const { address, port } = this.getGateway(sid);
          if (!address || !port) {
            this.whois();
          }
        }
        this.updateSubDevice(sid, {
          smodel: model,
          data,
        });
        this.emit(sid, data);
        break;
      }
      case 'report': {
        this.updateSubDevice(sid, {
          smodel: model,
          data,
        });
        this.emit(sid, data);
        break;
      }
      case 'read_ack': {
        this.updateSubDevice(sid, {
          smodel: model,
          data,
        });
        this._onResponse('read', msg);
        break;
      }
      case 'write_ack': {
        this.updateSubDevice(sid, {
          smodel: model,
          data,
        });
        this._onResponse('write', msg);
        break;
      }
      default:
        debug(`Unhandle message ${buf.toString('utf-8')}`);
        this.emit('unhandle', msg);
        break;
    }
  }

  _onResponse(cmd, msg) {
    const { sid, data } = msg;
    const subDevice = this.getSubDevice(sid);
    if (!subDevice._promises.has(cmd)) {
      return this.emit('unhandle', msg);
    }
    const promises = subDevice._promises.get(cmd);
    const [requestId, promise] = promises.entries().next().value || [];
    if (requestId && promise) {
      return promise.resolve(data);
    }
    return this.emit('unhandle', msg);
  }

  _multicast(data) {
    return this._send(data, MULTICAST_PORT, MULTICAST_ADDRESS);
  }

  _send(data, port, address) {
    debug(`--> ${JSON.stringify(data)} to ${address}:${port}`);
    const msg = Buffer.from(JSON.stringify(data), 'utf-8');
    return new Promise((resolve, reject) => {
      this._socket.send(msg, 0, msg.length, port, address, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

}

module.exports = new AqaraProtocol();
