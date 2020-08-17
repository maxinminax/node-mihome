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
      'fault'];
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

  setTimer(v) { // in minutes
    return this.miioCall('set_timer', [v]);
  }

};
