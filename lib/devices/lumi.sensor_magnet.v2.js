const Device = require('../device-aqara');
const utils = require('../utils');

module.exports = class extends Device {

  static model = 'lumi.sensor_magnet.v2';
  static name = 'Mi Door & window sensor';
  static image = 'http://static.home.mi.com/app/image/get/file/developer_1551946067z8jchf67.png';

  getBattery() {
    return utils.getBatteryFromVoltage(this.properties.voltage);
  }

  getStatus() {
    // TODO check this.properties.no_close
    return this.properties.status;
  }

};
