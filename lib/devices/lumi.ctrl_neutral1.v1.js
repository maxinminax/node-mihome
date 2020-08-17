const Device = require('../device-aqara');

module.exports = class extends Device {

  static model = 'lumi.ctrl_neutral1.v1';
  static name = 'Aqara Wall Switch (No Neutral, Single Rocker)';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1551946259jy9di8hy.png';

  setPower(v) {
    return this.write({ channel_0: v ? 'on' : 'off' });
  }

};
