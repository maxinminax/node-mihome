const Device = require('../device-aqara');
const utils = require('../utils');

module.exports = class extends Device {

  static model = 'lumi.remote.b286acn01';
  static name = 'Aqara Wireless Remote Switch (Double Rocker)';
  static image = 'https://static.home.mi.com/app/image/get/file/developer_15393507473oz26oec.png';

  getBattery() {
    return utils.getBatteryFromVoltage(this.properties.voltage);
  }

};
