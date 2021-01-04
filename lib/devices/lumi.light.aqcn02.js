const Device = require('../device-miio');

module.exports = class extends Device {
  static model = 'lumi.light.aqcn02';
  static name = 'Aqara LED Light Bulb (Tunable White)';
  static image = 'https://cdn.cnbj2.fds.api.mi-img.com/cdn/lumi/deviceImg/lumi.light.aqcn02.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [];
  }

  getPower() {
    return this.miioCall('get_device_prop_exp', [[this.id, 'power_status']]);
  }

  getBrightness() {
    return this.miioCall('get_device_prop_exp', [[this.id, 'light_level']]);
  }

  getColorTemperature() {
    return this.miioCall('get_device_prop_exp', [[this.id, 'colour_temperature']]);
  }

  setPower(v) {
    return this.miioCall('set_power', [v ? 'on' : 'off'], { sid: this.id });
  }

  setBrightness(v) {
    return this.miioCall('set_bright', [v], { sid: this.id });
  }

  setColorTemperature(v) {
    return this.miioCall('set_ct', [v], { sid: this.id });
  }
};
