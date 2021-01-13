const Device = require('../device-miio');
const { withLightEffect } = require('../utils');

module.exports = class extends Device {

  static model = 'yeelink.light.ceiling1';
  static name = 'Yeelight ShaoHua Celing Light';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1554860387dukxd6cf.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = ['power', 'night_mode', 'bright', 'ct', 'nl_br'];
  }

  getPower() {
    const { power } = this.properties;
    if (power === 'on') return true;
    if (power === 'off') return false;
    return undefined;
  }

  getBrightness() {
    const brightness = parseInt(this.properties.bright, 10);
    const nightLightBrightness = parseInt(this.properties.nl_br, 10);
    if (nightLightBrightness > 0) return nightLightBrightness;
    if (brightness > 0) return brightness;
    return undefined;
  }

  getColorTemperature() {
    const colorTemperature = parseInt(this.properties.ct, 10);
    if (colorTemperature > 0) return colorTemperature;
    return undefined;
  }

  getSleepMode() {
    const nightLightBrightness = parseInt(this.properties.nl_br, 10);
    if (nightLightBrightness > 0) return true;
    if (nightLightBrightness === 0) return false;
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

  setSleepMode(v) {
    return this.miioCall('set_ps', ['nightlight', v ? 'on' : 'off']);
  }

};
