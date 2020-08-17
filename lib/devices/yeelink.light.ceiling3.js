const Device = require('../device-miio');
const { withLightEffect } = require('../utils');

module.exports = class extends Device {

  static model = 'yeelink.light.ceiling3';
  static name = 'Yeelight LED Ceiling Light';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1500887836qfgbqwws.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = ['power', 'night_mode', 'bright', 'ct', 'nl_br'];
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

  setSleepMode(v) {
    return this.miioCall('set_ps', ['nightlight', v ? 'on' : 'off']);
  }

};
