const Device = require('../device-miio');
const { withLightEffect } = require('../utils');

module.exports = class extends Device {

  static model = 'yeelink.light.bslamp2';
  static name = 'MI Bedside Lamp 2';
  static image = 'https://xiaomi-mi.com/uploads/CatalogueImage/pvm_Mijia_bedside_%20(1)_17326_1548432100.jpg';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = ['power', 'bright', 'ct', 'rgb', 'hue', 'sat', 'flowing', 'flow_params', 'color_mode', 'nl_br'];
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

  getColor() {
    const rgb = parseInt(this.properties.rgb, 10);
    if (rgb > 0) return rgb;
    return undefined;
  }

  getColorHue() {
    const colorHue = parseInt(this.properties.hue, 10);
    if (colorHue >= 0) return colorHue;
    return undefined;
  }

  getColorSaturation() {
    const colorSaturation = parseInt(this.properties.saturation, 10);
    if (colorSaturation >= 0) return colorSaturation;
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

  setColor(v) {
    return this.miioCall('set_rgb', withLightEffect(v));
  }

  setColorHSV(v) {
    return this.miioCall('set_hsv', withLightEffect([v.hue, v.saturation]));
  }

  setSleepMode(v) {
    return this.miioCall('set_ps', ['nightlight', v ? 'on' : 'off']);
  }

  toggle() {
    return this.miioCall('toggle');
  }

  startColorFlow(v) {
    return this.miioCall('start_cf', v);
  }

  stopColorFlow() {
    return this.miioCall('stop_cf');
  }

};
