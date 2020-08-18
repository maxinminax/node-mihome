const randomstring = require('randomstring');
const Device = require('../device-aqara');
const aqaraProtocol = require('../protocol-aqara');
const miioProtocol = require('../protocol-miio');

module.exports = class extends Device {

  static model = 'lumi.gateway.v2';
  static name = 'Mi Control Hub';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1551946107fwwh1e9d.png';

  constructor(opts) {
    super(opts);

    const { id, address, token } = opts;
    this.address = address;
    this.token = token;

    miioProtocol.updateDevice(address, {
      id,
      token,
    });
  }

  async init() {
    this.developerKey = await this.findDeveloperKey();
    aqaraProtocol.updateGatewayAddress(this.address, {
      password: this.developerKey,
    });
  }

  async findDeveloperKey() {
    // We already have a developer key
    if (this._developerKey) return Promise.resolve(this._developerKey);

    // Call and fetch the key or set a new key
    const result = await miioProtocol.send(this.address, 'get_lumi_dpf_aes_key');
    let key = result[0];
    if (key && key.length === 16) {
      // This is a valid key, store it
      return key;
    }

    key = randomstring.generate({
      length: 16,
      charset: 'alphabetic',
      capitalization: 'lowercase',
    });
    await miioProtocol.send(this.address, 'set_lumi_dpf_aes_key', [key]);
    return key;
  }

};
