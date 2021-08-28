const Device = require('../device-miio');
const { withLightEffect } = require('../utils');

module.exports = class extends Device {

  static model = 'yeelink.light.strip2';
  static name = 'Yeelight Lightstrip Plus';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1551948225adgd7h86.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = ['power', 'bright', 'ct', 'hue', 'sat','rgb','color_mode'];
  }

  getPower() {
    const { power } = this.properties;
    if (power === 'on') return true;
    if (power === 'off') return false;
    return undefined;
  }

  getBrightness() {
    const brightness = parseInt(this.properties.bright, 10);
    if (brightness > 0) return brightness;
    return undefined;
  }

  getColorTemperature() {
    const colorTemperature = parseInt(this.properties.ct, 10);
    if (colorTemperature > 0) return colorTemperature;
    return undefined;
  }

  getColorRgb() {
    const colorRgb = parseInt(this.properties.rgb, 10);
    if (colorRgb >= 1) return colorRgb;
    return undefined;
  }

  getColorHue() {
    const colorHue = parseInt(this.properties.hue, 10);
    if (colorHue >= 0) return colorHue;
    return undefined;
  }

  getColorSaturation() {
    const colorSaturation = parseInt(this.properties.sat, 10);
    if (colorSaturation >= 0) return colorSaturation;
    return undefined;
  }

  getMode() {
    const mode = parseInt(this.properties.color_mode,10);
    if (mode >= 1) return mode;
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

  setColorHSV(v) {
    this._miioCall('set_hsv', withLightEffect([v.hue, v.saturation]));
  }

};

