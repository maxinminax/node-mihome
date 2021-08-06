const Device = require('../device-miio');
const { withLightEffect } = require('../utils');

module.exports = class extends Device {

  static model = 'yeelink.light.color1';
  static name = 'Yeelight LED Bulb (Color)';
  static image = 'https://ik.imagekit.io/kit/products/47/6e/yeelight-yldp03yl-s-476e61ac1f11b3246e760488732fe63e.png?tr=dpr-1,cm-pad_resize,bg-FFFFFF,q-80,w-270,h-270';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = ['power', 'bright', 'ct', 'rgb', 'hue', 'sat', 'flowing', 'flow_params', 'color_mode'];
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

  toggle() {
    return this.miioCall('toggle');
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

  startColorFlow(v) {
    return this.miioCall('start_cf', v);
  }

  stopColorFlow() {
    return this.miioCall('stop_cf');
  }

};
