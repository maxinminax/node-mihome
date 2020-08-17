const Device = require('../device-aqara');

module.exports = class extends Device {

  static model = 'lumi.ctrl_neutral2.v1';
  static name = 'Aqara Wall Switch (No Neutral, Double Rocker)';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_155194623082wls1kr.png';

  setPower(v) {
    return this.write({ channel_0: v ? 'on' : 'off' });
  }

  setPower1(v) {
    return this.write({ channel_1: v ? 'on' : 'off' });
  }

};
