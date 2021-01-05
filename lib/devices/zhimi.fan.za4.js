const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'zhimi.fan.za4';
  static name = 'Smartmi Standing Fan 2S';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1541408255kg3xtr1j.png';

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

  getPower() {
    const { power } = this.properties;
    if (power === 'on') return true;
    if (power === 'off') return false;
    return undefined;
  }

  getFanLevel() {
    const fanLevel = parseInt(this.properties.speed_level, 10);
    const naturalLevel = parseInt(this.properties.natural_level, 10);
    if (naturalLevel > 0) return naturalLevel;
    if (fanLevel > 0) return fanLevel;
    return undefined;
  }

  getFanSwing() {
    const fanSwing = this.properties.angle_enable;
    if (fanSwing === 'on') return true;
    if (fanSwing === 'off') return false;
    return undefined;
  }

  getSleepMode() {
    const naturalLevel = parseInt(this.properties.natural_level, 10);
    if (naturalLevel > 0) return true;
    if (naturalLevel === 0) return false;
    return undefined;
  }

  getBuzzer() {
    const { buzzer } = this.properties;
    if (buzzer === 'on') return true;
    if (buzzer === 'off') return false;
    return undefined;
  }

  getTimer() {
    return this.properties.poweroff_time;
  }

  setPower(v) {
    return this.miioCall('set_power', [v ? 'on' : 'off']);
  }

  setFanLevel(v) {
    const method = this.getSleepMode() ? 'set_natural_level' : 'set_speed_level';
    return this.miioCall(method, [v]);
  }

  setSleepMode(v) {
    const method = v ? 'set_natural_level' : 'set_speed_level';
    const fanSpeed = this.getFanLevel();
    return this.miioCall(method, [fanSpeed]);
  }

  setSwing(v) {
    return this.miioCall('set_angle_enable', [v ? 'on' : 'off']);
  }

  setSwingAngle(v) {
    return this.miioCall('set_angle', [v]);
  }

  setBuzzer(v) {
    return this.miioCall('set_buzzer', [v]);
  }

  setLcdBrightness(v) {
    return this.miioCall('set_led_b', [v]);
  }

  setTimer(v) {
    return this.miioCall('set_poweroff_time', [v]);
  }

};
