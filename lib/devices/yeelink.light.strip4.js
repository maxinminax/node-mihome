const Device = require('../device-miio');
const { withLightEffect } = require('../utils');

module.exports = class extends Device {

  static model = 'yeelink.light.strip4';
  static name = 'Yeelight Willow LED Lightstrip';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_155263926836bw2kvq.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = ['power', 'bright', 'ct'];
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

};
