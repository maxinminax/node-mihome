const Device = require('../device-miio');
const { withLightEffect } = require('../utils');

module.exports = class extends Device {

  static model = 'yeelink.light.ct2';
  static name = 'Yeelight LED Bulb (Tunable)';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_15233531497uxs6o06.png';

  constructor(opts) {
    super(opts);

    // this._miotSpecType = 'urn:miot-spec-v2:device:light:0000A001:yeelink-ct2:1';
    this._propertiesToMonitor = [
      'power',
      'bright',
      'ct'];
  }

  getPower() {
    const { power } = this.properties;
    if (power === 'on') return true;
    if (power === 'off') return false;
    return undefined;
  }

  getBrightness() {
    const brightness = parseInt(this.properties.bright, 10);
    if (brightness >= 0) return brightness;
    return undefined;
  }

  getCt() {
    const ct = parseInt(this.properties['color-temperature'], 10);
    if (ct >= 1700) return ct;
    return undefined;
  }

  setPower(v) {
    return this.miioCall('set_power', withLightEffect(v ? 'on' : 'off'));
  }

  setBrightness(v) {
    return this.miioCall('set_bright', withLightEffect(v));
  }

  setColorTemperature(v) {
    return this.miioCall('set_ct_abx', withLightEffect(v));
  }
  
};

