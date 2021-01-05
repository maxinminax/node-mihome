const randomstring = require('randomstring');
const Device = require('../device-miio');
const aqaraProtocol = require('../protocol-aqara');

module.exports = class extends Device {

  static model = 'lumi.gateway.v2';
  static name = 'Mi Control Hub';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1551946107fwwh1e9d.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'rgb',
      'illumination',
      'mute',
      'arming',
      'gateway_volume',
      'alarming_volume',
      'doorbell_volume',
      'corridor_light',
      'corridor_on_time',
      'night_light_rgb',
      'arming_time',
      'doorbell_push',
    ];
  }

  async loadProperties(props) {
    super.loadProperties(props);

    try {
      this.developerKey = await this.findDeveloperKey();
      aqaraProtocol.updateGatewayAddress(this.address, {
        password: this.developerKey,
      });
    } catch (e) {
    }
  }

  async findDeveloperKey() {
    // We already have a developer key
    if (this._developerKey) return Promise.resolve(this._developerKey);

    // Call and fetch the key or set a new key
    const result = await this.send('get_lumi_dpf_aes_key');
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
    await this.send('set_lumi_dpf_aes_key', [key]);
    return key;
  }

  getLightPower() {
    const light = this.properties.rgb;
    if (light > 0) return true;
    if (light === 0) return false;
    return undefined;
  }

  getLuminance() {
    const luminance = parseInt(this.properties.illumination, 10);
    if (luminance >= 0) return luminance;
    return undefined;
  }

  getMute() {
    const { mute } = this.properties;
    if (mute === 'on') return true;
    if (mute === 'off') return false;
    return undefined;
  }

  getAlarmPower() {
    const alarm = this.properties.arming;
    if (alarm === 'on') return true;
    if (alarm === 'off') return false;
    return undefined;
  }

  setLightPower(v) {
    return this.miioCall('toggle_light', [v ? 'on' : 'off']);
  }

  setAlarmPower(v) {
    return this.miioCall('set_arming', [v ? 'on' : 'off']);
  }

};
