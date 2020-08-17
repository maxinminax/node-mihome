const Device = require('../device-aqara');

module.exports = class extends Device {

  static model = 'lumi.ctrl_86plug.aq1';
  static name = 'Aqara Wall Outlet';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1551947140bbugrsl6.png';

  setPower(v) {
    return this.write({ channel_0: v ? 'on' : 'off' });
  }

};
