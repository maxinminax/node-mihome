const Device = require('../device-aqara');

module.exports = class extends Device {

  static model = 'lumi.ctrl_ln1.aq1';
  static name = 'Aqara Wall Switch (With Neutral, Single Rocker)';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1551947119hpbe1ocz.pnghttp://static.home.mi.com/app/image/get/file/developer_1551947140bbugrsl6.png';

  setPower(v) {
    return this.write({ channel_0: v ? 'on' : 'off' });
  }

  setPower1(v) {
    return this.write({ channel_1: v ? 'on' : 'off' });
  }

};
