const Device = require('../device-miio');

module.exports = class extends Device {

  static model = 'leshow.fan.ss4';
  static name = 'Leshow Fan';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_15560239775peeloic.png';

  constructor(opts) {
    super(opts);

    this._propertiesToMonitor = [
      'power',
      'mode',
      'blow',
      'yaw',
      'sound',
      'timer',
      'fault',
    ];
  }

  getPower() {
    const { power } = this.properties;
    if (power === 1) return true;
    if (power === 0) return false;
    return undefined;
  }

  getFanLevel() {
    const fanLevel = parseInt(this.properties.blow, 10);
    if (fanLevel > 0) return fanLevel;
    return undefined;
  }

  getFanSwing() {
    const fanSwing = this.properties.yaw;
    if (fanSwing === 1) return true;
    if (fanSwing === 0) return false;
    return undefined;
  }

  getSleepMode() {
    const sleepMode = this.properties.mode;
    if (sleepMode === 1) return true;
    if (sleepMode === 0) return false;
    return undefined;
  }

  getBuzzer() {
    const buzzer = this.properties.sound;
    if (buzzer === 1) return true;
    if (buzzer === 0) return false;
    return undefined;
  }

  getTimer() {
    return this.properties.timer;
  }

  setPower(v) {
    return this.miioCall('set_power', [v ? 1 : 0]);
  }

  setFanLevel(v) {
    return this.miioCall('set_blow', [v]);
  }

  setFanSwing(v) {
    return this.miioCall('set_yaw', [v ? 1 : 0]);
  }

  setSleepMode(v) {
    return this.miioCall('set_mode', [v ? 1 : 0]);
  }

  setBuzzer(v) {
    return this.miioCall('set_sound', [v ? 1 : 0]);
  }

  setTimer(v) {
    // in minutes
    return this.miioCall('set_timer', [v]);
  }

};
