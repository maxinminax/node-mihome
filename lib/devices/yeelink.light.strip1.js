const Device = require('../device-miio');
const { withLightEffect } = require('../utils');

module.exports = class extends Device {

  static model = 'yeelink.light.strip1';
  static name = 'Yeelight Lightstrip';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1551948702kcy7aei4.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = ['power', 'bright', 'ct', 'hue', 'saturation'];
  }

  setPower(v) {
    return this.miioCall('set_power', withLightEffect(v ? 'on' : 'off'));
  }

  setBrightness(v) {
    return this.miioCall('set_ct_abx', withLightEffect(v));
  }

  setColorTemperature(v) {
    return this.miioCall('set_ct_abx', withLightEffect(v));
  }

  setColorHSV(v) {
    this._miioCall('set_hsv', withLightEffect([v.hue, v.saturation]));
  }

};
