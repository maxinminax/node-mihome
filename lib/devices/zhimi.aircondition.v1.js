const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'zhimi.aircondition.v1';
  static name = 'Smartmi Smart Air Conditioner';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1551943901u5fhbldk.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'power',
      'mode',
      'st_temp_dec',
      'temp_dec',
      'humidity',
      'volume_level',
      'lcd_level',
      'idle_timer',
      'open_timer',
      'speed_level',
      'vertical_end',
      'vertical_swing',
      'horizon_swing',
      'silent',
      'ele_quantity'];
  }

  setPower(v) {
    return this.miioCall('set_power', [v ? 'on' : 'off']);
  }

  setMode(v) { // cooling, heat, wind, arefaction
    return this.miioCall('set_mode', [v]);
  }

  setTargetTemperature(v) {
    return this.miioCall('set_temperature', [v]);
  }

  setFanLevel(v) { // 0-5
    return this.miioCall('set_spd_level', [v]);
  }

  setVerticalSwing(v) {
    return this.miioCall('set_spd_level', [v ? 'on' : 'off']);
  }

  setHorizontalSwing(v) {
    return this.miioCall('set_horizon', [v ? 'on' : 'off']);
  }

  setVolume(v) { // 1-7
    return this.miioCall('set_horizon', [v]);
  }

  setLcdBrightness(v) {
    return this.miioCall('set_lcd_level', [v]);
  }

  setSleepMode(v) {
    return this.miioCall('set_silent', [v]);
  }

};
