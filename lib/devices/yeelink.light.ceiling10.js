const Device = require('../device-miio');
const { withLightEffect } = require('../utils');

module.exports = class extends Device {

  static model = 'yeelink.light.ceiling10';
  static name = 'Yeelight Meteorite Light';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1500887836qfgbqwws.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = ['power', 'main_power', 'bg_power','moon_mode','color_mode', 'active_bright', 'bg_bright', 'ct','bg_ct', 'bg_hue', 'bg_rgb', 'bg_sat'];
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

  setMainPower(v) {
    return this.miioCall('set_main_power', withLightEffect(v ? 'on' : 'off'));
  }
  setBgPower(v) {
    return this.miioCall('set_bg_power', withLightEffect(v ? 'on' : 'off'));
  }

  setBgBrightness(v) {
    return this.miioCall('set_bg_bright', withLightEffect(v));
  }

  setActiveBrightness(v) {
    return this.miioCall('set_active_bright', withLightEffect(v));
  }

  setColorMode(v) {
    return this.miioCall('set_color_mode', withLightEffect(v));
  }

  setMoonMode(v) {
    return this.miioCall('set_moon_mode', withLightEffect(v));
  }


  setColorTemperature(v) {
    return this.miioCall('set_color-temperature', withLightEffect(v));
  }

  setBgColorTemperature(v) {
    return this.miioCall('set_bg_color-temperature', withLightEffect(v));
  }

  setBgColorRgb(v) {
    this._miioCall('set_bg_rgb', withLightEffect(v.rgb));
  }

  setBgColorHSV(v) {
    this._miioCall('set_bg_hsv', withLightEffect([v.hue, v.saturation]));
  }
};
