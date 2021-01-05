const Device = require('../device-aqara');
const utils = require('../utils');

module.exports = class extends Device {

  static model = 'lumi.sensor_switch.v2';
  static name = 'Mi Wireless Switch';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_1551946118lv9kacyq.png';

  getBattery() {
    return utils.getBatteryFromVoltage(this.properties.voltage);
  }

};
