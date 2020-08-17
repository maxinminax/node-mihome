const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'zhimi.fan.za4';
  static name = 'Smartmi Standing Fan 2S';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1541408255kg3xtr1j.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'power',
      'angle',
      'angle_enable',
      'speed_level',
      'natural_level',
      'child_lock',
      'poweroff_time',
      'buzzer',
      'led_b'];
  }

  setPower(v) {
    return this.miioCall('set_power', [v ? 'on' : 'off']);
  }

  setFanLevel(v) {
    return this.miioCall('set_speed_level', [v]);
  }

  setNaturalLevel(v) {
    return this.miioCall('set_natural_level', [v]);
  }

  setSwing(v) {
    return this.miotSetProperty('set_angle_enable', [v ? 'on' : 'off']);
  }

  setSwingAngle(v) {
    return this.miotSetProperty('set_angle', [v]);
  }

  setBuzzer(v) {
    return this.miioCall('set_buzzer', [v]);
  }

  setLcdBrightness(v) {
    return this.miioCall('set_led_b', [v]);
  }

  setTimer(v) {
    return this.call('set_poweroff_time', [v]);
  }

};
